import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import TableCellsIcon from "@heroicons/react/24/solid/TableCellsIcon";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Apresentação",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Despesas por ano",
    path: "/annual-expenses",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Despesas por estado",
    path: "/expenses-by-state",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Métricas",
    path: "/metrics",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Tabela",
    path: "/table",
    icon: (
      <SvgIcon fontSize="small">
        <TableCellsIcon />
      </SvgIcon>
    ),
  },
];
