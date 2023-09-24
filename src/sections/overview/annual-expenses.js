import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Button } from "@mui/material";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Chart } from "src/components/chart";
import Selector from "../../components/selector";
import estadoOptions from "../../assets/options_estado.json";

const formatCurrency = (value) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

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
      categories: ["2018", "2019", "2020", "2021"],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${formatCurrency(value)}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};

export const AnnualExpenses = (props) => {
  const { data = [], sx } = props;

  const chartOptions = useChartOptions();
  function convertToNumber(value) {
    value = String(value);
    const cleanedValue = value.replace(/\./g, "").replace(",", ".");
    return parseFloat(cleanedValue);
  }

  const initFilters = {
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

  const filterData = (year, type, account) => {
    return filteredData
      .filter((row) => row.ano === year && row.tipo === type && row.cod_conta === account)
      .map((row) => convertToNumber(row.valor))
      .reduce((acc, c) => acc + c, 0);
  };

  const assistenciaSocial = [
    {
      name: "Despesas empenhadas",
      data: [
        filterData(2018, "Despesas Empenhadas", "08"),
        filterData(2019, "Despesas Empenhadas", "08"),
        filterData(2020, "Despesas Empenhadas", "08"),
        filterData(2021, "Despesas Empenhadas", "08"),
      ],
    },
    {
      name: "Despesas liquidadas",
      data: [
        filterData(2018, "Despesas Liquidadas", "08"),
        filterData(2019, "Despesas Liquidadas", "08"),
        filterData(2020, "Despesas Liquidadas", "08"),
        filterData(2021, "Despesas Liquidadas", "08"),
      ],
    },
    {
      name: "Despesas pagas",
      data: [
        filterData(2018, "Despesas Pagas", "08"),
        filterData(2019, "Despesas Pagas", "08"),
        filterData(2020, "Despesas Pagas", "08"),
        filterData(2021, "Despesas Pagas", "08"),
      ],
    },
  ];
  const previdenciaSocial = [
    {
      name: "Despesas empenhadas",
      data: [
        filterData(2018, "Despesas Empenhadas", "09"),
        filterData(2019, "Despesas Empenhadas", "09"),
        filterData(2020, "Despesas Empenhadas", "09"),
        filterData(2021, "Despesas Empenhadas", "09"),
      ],
    },
    {
      name: "Despesas liquidadas",
      data: [
        filterData(2018, "Despesas Liquidadas", "09"),
        filterData(2019, "Despesas Liquidadas", "09"),
        filterData(2020, "Despesas Liquidadas", "09"),
        filterData(2021, "Despesas Liquidadas", "09"),
      ],
    },
    {
      name: "Despesas pagas",
      data: [
        filterData(2018, "Despesas Pagas", "09"),
        filterData(2019, "Despesas Pagas", "09"),
        filterData(2020, "Despesas Pagas", "09"),
        filterData(2021, "Despesas Pagas", "09"),
      ],
    },
  ];
  const saude = [
    {
      name: "Despesas empenhadas",
      data: [
        filterData(2018, "Despesas Empenhadas", "10"),
        filterData(2019, "Despesas Empenhadas", "10"),
        filterData(2020, "Despesas Empenhadas", "10"),
        filterData(2021, "Despesas Empenhadas", "10"),
      ],
    },
    {
      name: "Despesas liquidadas",
      data: [
        filterData(2018, "Despesas Liquidadas", "10"),
        filterData(2019, "Despesas Liquidadas", "10"),
        filterData(2020, "Despesas Liquidadas", "10"),
        filterData(2021, "Despesas Liquidadas", "10"),
      ],
    },
    {
      name: "Despesas pagas",
      data: [
        filterData(2018, "Despesas Pagas", "10"),
        filterData(2019, "Despesas Pagas", "10"),
        filterData(2020, "Despesas Pagas", "10"),
        filterData(2021, "Despesas Pagas", "10"),
      ],
    },
  ];

  return (
    <>
      <Typography variant="h3" mb={3}>
        {"Despesas por categoria".toUpperCase()}
      </Typography>
      <Card sx={{ mb: 3, p: 1, borderRadius: 1 }}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
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
        <CardHeader title="Assistência Social" />
        <CardContent>
          <Chart
            height={350}
            options={chartOptions}
            series={assistenciaSocial}
            type="bar"
            width="100%"
          />
        </CardContent>
        <Divider />
      </Card>
      <Card sx={{ ...sx, mb: 5 }}>
        <CardHeader title="Previdência Social" />
        <CardContent>
          <Chart
            height={350}
            options={chartOptions}
            series={previdenciaSocial}
            type="bar"
            width="100%"
          />
        </CardContent>
        <Divider />
      </Card>
      <Card sx={{ ...sx, mb: 5 }}>
        <CardHeader title="Saúde" />
        <CardContent>
          <Chart height={350} options={chartOptions} series={saude} type="bar" width="100%" />
        </CardContent>
        <Divider />
      </Card>
    </>
  );
};

AnnualExpenses.propTypes = {
  data: PropTypes.array,
  sx: PropTypes.object,
};
