import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Button } from "@mui/material";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Chart } from "src/components/chart";
import Selector from "../../components/selector";
import estadoOptions from "../../assets/options_estado.json";
import anoOptions from "../../assets/options_ano.json";

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: true,
      offsetY: 8,
    },
    plotOptions: {
      bar: {
        columnWidth: "30px",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: ["Assistência social", "Previdência social", "Saúde"],
      labels: {
        offsetY: 1,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value.toFixed(2)}%` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};

export const Metrics = (props) => {
  const { data = [], sx } = props;

  const chartOptions = useChartOptions();
  function convertToNumber(value) {
    value = String(value);
    const cleanedValue = value.replace(/\./g, "").replace(",", ".");
    return parseFloat(cleanedValue);
  }

  const initFilters = {
    ano: "",
    estado: "",
  };
  const [filters, setFilters] = useState(initFilters);

  const clearFilters = () => {
    setFilters(initFilters);
  };

  const handleFiltersChange = (filter) => (value) => {
    setFilters((prevState) => ({ ...prevState, [filter]: value }));
  };

  const applyFilters = (data, filters) => {
    return data.filter((row) => {
      if (filters.ano && row.ano !== filters.ano) {
        return false;
      }
      if (filters.estado && row.estado !== filters.estado) {
        return false;
      }
      if (filters.tipo && row.tipo !== filters.tipo) {
        return false;
      }
      return true;
    });
  };

  const filteredData = useMemo(() => {
    return applyFilters(data, filters);
  }, [data, filters]);

  const getRunRate = (account) => {
    const filteredByAccount = filteredData.filter((row) => row.cod_conta === account);
    const committedExpenses = filteredByAccount
      .filter((row) => row.tipo === "Despesas Empenhadas")
      .map((row) => convertToNumber(row.valor))
      .reduce((acc, c) => acc + c, 0);
    const liquidatedExpenses = filteredByAccount
      .filter((row) => row.tipo === "Despesas Liquidadas")
      .map((row) => convertToNumber(row.valor))
      .reduce((acc, c) => acc + c, 0);
    return (liquidatedExpenses / committedExpenses) * 100;
  };

  const getPaidRate = (account) => {
    const filteredByAccount = filteredData.filter((row) => row.cod_conta === account);
    const paidExpenses = filteredByAccount
      .filter((row) => row.tipo === "Despesas Pagas")
      .map((row) => convertToNumber(row.valor))
      .reduce((acc, c) => acc + c, 0);
    const liquidatedExpenses = filteredByAccount
      .filter((row) => row.tipo === "Despesas Liquidadas")
      .map((row) => convertToNumber(row.valor))
      .reduce((acc, c) => acc + c, 0);
    return (paidExpenses / liquidatedExpenses) * 100;
  };

  const execution = [
    {
      name: "Taxa de execução",
      data: [getRunRate("08"), getRunRate("09"), getRunRate("10")],
    },
  ];
  const paid = [
    {
      name: "Taxa de pagamento",
      data: [getPaidRate("08"), getPaidRate("09"), getPaidRate("10")],
    },
  ];

  return (
    <>
      <Typography variant="h3" mb={3}>
        {"Despesas por Estado".toUpperCase()}
      </Typography>
      <Card sx={{ mb: 3, p: 1, borderRadius: 1 }}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Selector
            placeholder="Ano"
            options={anoOptions}
            onChange={handleFiltersChange("ano")}
            value={filters.ano}
          />
          <Selector
            placeholder="Estado"
            options={estadoOptions}
            onChange={handleFiltersChange("estado")}
            value={filters.estado}
          />
          <Button variant="text" onClick={clearFilters} sx={{ height: 38, m: 1 }} color="inherit">
            Limpar
          </Button>
        </Box>
      </Card>
      <Card sx={{ ...sx, mb: 5 }}>
        <CardHeader
          title={"Taxa de execução"}
          subheader="Compara as despesas empenhadas com as liquidadas"
        />

        <CardContent>
          <Chart height={350} options={chartOptions} series={execution} type="bar" width="100%" />
        </CardContent>
        <Divider />
      </Card>
      <Card sx={{ ...sx, mb: 5 }}>
        <CardHeader
          title="Taxa de Pagamento"
          subheader="Compara as despesas liquidadas com as liquidadas pagas"
        />
        <CardContent>
          <Chart height={350} options={chartOptions} series={paid} type="bar" width="100%" />
        </CardContent>
        <Divider />
      </Card>
    </>
  );
};

Metrics.propTypes = {
  data: PropTypes.array,
  sx: PropTypes.object,
};
