import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Rfx() {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/rfx/list`);
        const results = await response.json();

        if (Array.isArray(results)) {
          const formattedResults = results.map(item => ({
            ...item,
            dateIssued: new Date(item.dateIssued).toISOString().split('T')[0],
            submissionDate: new Date(item.submissionDate).toISOString().split('T')[0],
          }));

          setItemData(formattedResults);
        } else {
          console.error('Fetched data is not an array:', results);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <br />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Listing of RFx</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        {itemData.map((item) => (
          <Paper key={item.rfxNumber} style={{ padding: '20px', marginBottom: '20px' }}>
            <Link to={`/number/${item.rfxNumber}`}> {/* Use Link component for navigation */}
              <Typography variant="h3">{item.rfxNumber}</Typography>
            </Link>
            <Typography variant="h4">{item.title}</Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              {item.purpose}
            </Typography>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Created Date:</Typography>
                <Typography variant="body1">{item.dateIssued}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Due Date:</Typography>
                <Typography variant="body1">{item.submissionDate}</Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Container>
    </div>
  );
}
