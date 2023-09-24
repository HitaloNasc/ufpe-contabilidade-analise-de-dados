import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Typography,
  Divider,
  Unstable_Grid2 as Grid,
  Table as TableMUI,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import Image from "next/image";

export const Presentation = (props) => {
  return (
    <>
      <Card sx={{ mb: 3, p: 5, borderRadius: 3 }}>
        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid xs={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Image src="/assets/ufpe.png" alt="ufpe_logo" width={300} height={150} />
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Image src="/assets/cin.png" alt="cin_logo" width={300} height={100} />
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Universidade Federal de Pernambuco
        </Typography>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Centro de informática - CIn
        </Typography>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Contabilidade de Custos e Gerencial
        </Typography>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Prof. Marcelo J. Gomes
        </Typography>
        <Typography variant="h2" sx={{ textAlign: "center", p: 5 }}>
          Análise das despesas da seguridade social entre 2018 e 2021
        </Typography>
        <Divider />
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Equipe
            </Typography>
          </Grid>
          <Grid xs={2.4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Image src="/assets/avatars/carol.jpeg" width={100} height={100} />
              <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                Caroline Almeida de Freitas
              </Typography>
            </Box>
          </Grid>
          <Grid xs={2.4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Image src="/assets/avatars/douglas.png" width={100} height={100} />
              <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                Douglas Araujo Silva
              </Typography>
            </Box>
          </Grid>
          <Grid xs={2.4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Image src="/assets/avatars/hitalo.jpeg" width={100} height={100} />
              <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                Hítalo Bruno de Azevedo Nascimento
              </Typography>
            </Box>
          </Grid>
          <Grid xs={2.4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Image src="/assets/avatars/ingrid.jpeg" width={100} height={100} />
              <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                Ingrid Adriana Freire Soares Lima
              </Typography>
            </Box>
          </Grid>
          <Grid xs={2.4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Image src="/assets/avatars/otavio.jpeg" width={100} height={100} />
              <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                Otávio Algusto Cavalcanti Neto
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

Presentation.propTypes = {
  data: PropTypes.array,
  sx: PropTypes.object,
};
