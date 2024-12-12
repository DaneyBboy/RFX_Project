import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Grid2,
} from "@mui/material";

export default function Vendordash() {
  return (
    <div>
      <br />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Vendor Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "20px" }}>
        <Grid2 container spacing={20}>
          {/* Overview Card */}
          <Grid2 item xs={15} sm={6} md={4}>
            <Paper style={{ padding: "20px", textAlign: "center" }}>
              <Typography variant="h5">Active RFx</Typography>
              <Typography variant="h2">10</Typography>
            </Paper>
          </Grid2>
          <Grid2 item xs={15} sm={6} md={4}>
            <Paper style={{ padding: "20px", textAlign: "center" }}>
              <Typography variant="h5">Participate RFx</Typography>
              <Typography variant="h2">2</Typography>
            </Paper>
          </Grid2>

          <Grid2 item xs={15} sm={6} md={4}>
            <Paper style={{ padding: "20px", textAlign: "center" }}>
              <Typography variant="h5">Total Listings</Typography>
              <Typography variant="h2">80</Typography>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}
