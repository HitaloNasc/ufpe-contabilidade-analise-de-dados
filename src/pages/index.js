import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import data from "../assets/data.json";

const now = new Date();
const cardsData = {
  socialAssistence: {
    title: "Assistência social",
    subtitle: "Despesas empenhadas",
    value: "R$ 19.253.801,21",
  },
  socialPrevidence: {
    title: "Previdência social",
    subtitle: "Despesas empenhadas",
    value: "R$ 3.781.807.532,04",
  },
  health: {
    title: "Saúde",
    subtitle: "Despesas empenhadas",
    value: "R$ 1.823.144.611,55",
  },
};

const Page = () => (
  <>
    <Head>
      <title>Contabilidade de custos e gerencial</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        backgroundColor: "#f3f3f4",
      }}
    >
      {/* <Grid container spacing={3}>
        <Grid xs={12}>
          <Container maxWidth="xl">
            <Typography variant="h2">Projeto de análise de dados</Typography>
          </Container>
        </Grid>
         <Grid xs={12}>
          <Container maxWidth="xl">
            <Typography variant="h3">Distribuição por categoria</Typography>
          </Container>
        </Grid> 
      </Grid> */}
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* <Grid xs={12} sm={6} lg={4}>
            <OverviewBudget
              title={cardsData.socialAssistence.title}
              value={cardsData.socialAssistence.value}
              subtitle={cardsData.socialAssistence.subtitle}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} sm={6} lg={4}>
            <OverviewBudget
              title={cardsData.socialPrevidence.title}
              value={cardsData.socialPrevidence.value}
              subtitle={cardsData.socialPrevidence.subtitle}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} sm={6} lg={4}>
            <OverviewBudget
              title={cardsData.health.title}
              value={cardsData.health.value}
              subtitle={cardsData.health.subtitle}
              sx={{ height: "100%" }}
            />
          </Grid>

          <Grid xs={12} lg={8}>
            <OverviewSales
              chartSeries={[
                {
                  name: "This year",
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                },
                {
                  name: "Last year",
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={["Desktop", "Tablet", "Phone"]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewLatestProducts
              products={[
                {
                  id: "5ece2c077e39da27658aa8a9",
                  image: "/assets/products/product-1.png",
                  name: "Healthcare Erbology",
                  updatedAt: subHours(now, 6).getTime(),
                },
                {
                  id: "5ece2c0d16f70bff2cf86cd8",
                  image: "/assets/products/product-2.png",
                  name: "Makeup Lancome Rouge",
                  updatedAt: subDays(subHours(now, 8), 2).getTime(),
                },
                {
                  id: "b393ce1b09c1254c3a92c827",
                  image: "/assets/products/product-5.png",
                  name: "Skincare Soja CO",
                  updatedAt: subDays(subHours(now, 1), 1).getTime(),
                },
                {
                  id: "a6ede15670da63f49f752c89",
                  image: "/assets/products/product-6.png",
                  name: "Makeup Lipstick",
                  updatedAt: subDays(subHours(now, 3), 3).getTime(),
                },
                {
                  id: "bcad5524fe3a2f8f8620ceda",
                  image: "/assets/products/product-7.png",
                  name: "Healthcare Ritual",
                  updatedAt: subDays(subHours(now, 5), 6).getTime(),
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid> */}
          <Grid xs={12} md={12} lg={12}>
            <OverviewLatestOrders data={data} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
