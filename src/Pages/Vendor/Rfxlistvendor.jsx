import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, Grid2 } from '@mui/material';

export default function Rfxlistvendor() {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:4000/rfx/list');
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
  }, []); // Empty dependency array to fetch data only once on component mount

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
            <Typography variant="h3">{item.rfxNumber}</Typography>
            <Typography variant="h4">{item.title}</Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              {item.purpose}
            </Typography>
            <Grid2 container spacing={2} style={{ marginTop: '20px' }}>
              <Grid2 item xs={12} sm={6}>
                <Typography variant="h6">Created Date:</Typography>
                <Typography variant="body1">{item.dateIssued}</Typography>
              </Grid2>
              <Grid2 item xs={12} sm={6}>
                <Typography variant="h6">Submission Date:</Typography>
                <Typography variant="body1">{item.submissionDate}</Typography>
              </Grid2>
            </Grid2>
          </Paper>
        ))}
      </Container>
    </div>
  );
}
