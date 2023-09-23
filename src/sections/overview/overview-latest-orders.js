import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import PlusSmallIcon from "@heroicons/react/24/solid/PlusSmallIcon";
import anoOptions from "../../assets/options_ano.json";
import estadoOptions from "../../assets/options_estado.json";
import tipoOptions from "../../assets/options_tipo.json";
import Selector from "../../components/selector";

export const OverviewLatestOrders = (props) => {
  const { data = [], sx } = props;
  const initFilters = {
    ano: "",
    estado: "",
    tipo: "",
    categoria: "",
    perPage: 25,
  };
  const [filters, setFilters] = useState(initFilters);

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

  const filteredData = React.useMemo(() => {
    return applyFilters(data, filters);
  }, [data, filters]);

  const handleFiltersChange = (filter) => (value) => {
    setFilters((prevState) => ({ ...prevState, [filter]: value }));
  };

  const handleLoadMore = () => {
    setFilters((prevState) => ({ ...prevState, perPage: prevState.perPage + 25 }));
  };

  const clearFilters = () => {
    setFilters(initFilters);
  };

  const formatCurrency = (value) => {
    if (value !== "-") {
      const floatValue = parseFloat(value.replace(/\./g, "").replace(",", "."));
      return floatValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    return value;
  };

  return (
    <Card sx={sx}>
      <Typography variant="h3" mt={3} ml={1} mb={3}>
        {"Tabela de despesas".toUpperCase()}
      </Typography>
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
        <Selector
          placeholder="Tipo de despesa"
          options={tipoOptions}
          onChange={handleFiltersChange("tipo")}
          value={filters.tipo}
        />
        <Button variant="text" onClick={clearFilters} sx={{ height: 38, m: 1 }} color="inherit">
          Limpar
        </Button>
      </Box>
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800, width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ano</TableCell>
                <TableCell>Instituição</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>População</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(0, filters.perPage).map((row, index) => {
                const categoria = `${row.cod_conta ?? ""} ${row.nome_conta ?? ""}`;
                return (
                  <TableRow hover key={index}>
                    <TableCell>{row.ano}</TableCell>
                    <TableCell>{row.instituicao}</TableCell>
                    <TableCell>{row.estado}</TableCell>
                    <TableCell>{row.populacao_total}</TableCell>
                    <TableCell>{row.tipo}</TableCell>
                    <TableCell>{categoria}</TableCell>
                    <TableCell>{formatCurrency(String(row.valor))}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Box sx={{ textAlign: "center", margin: 2 }}>
            {filters.perPage < filteredData.length && (
              <Button variant="contained" color="primary" onClick={handleLoadMore}>
                <PlusSmallIcon />
              </Button>
            )}
          </Box>
        </Box>
      </Scrollbar>
      <Divider />
    </Card>
  );
};

OverviewLatestOrders.propTypes = {
  data: PropTypes.array,
  sx: PropTypes.object,
};
