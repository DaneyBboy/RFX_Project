import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Grid2,
} from "@mui/material";

export default function Admindash() {
  return (
    <div>
      <br />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Rfx Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "20px" }}>
        <Grid2 container spacing={20}>
          {/* Overview Card */}
          <Grid2 item xs={15} sm={6} md={4}>
            <Paper style={{ padding: "20px", textAlign: "center" }}>
              <Typography variant="h5">Total Users</Typography>
              <Typography variant="h2">150</Typography>
            </Paper>
          </Grid2>
          <Grid2 item xs={15} sm={6} md={4}>
            <Paper style={{ padding: "20px", textAlign: "center" }}>
              <Typography variant="h5">Pending Evaluations</Typography>
              <Typography variant="h2">25</Typography>
            </Paper>
          </Grid2>

          {/* Listings Card */}
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
