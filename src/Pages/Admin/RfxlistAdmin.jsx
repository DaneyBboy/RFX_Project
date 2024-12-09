import React from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, Grid2 } from '@mui/material';

export default function RfxlistAdmin() {

  const itemData = [ 
    {
      id: "123",
      title: "Sample Item Title 1",
      description: "This is a detailed description of the item. It provides insights and information relevant to the item.",
      createdDate: "2024-01-01",
      status: "Active"
    },
    {
      id: "1234",
      title: "Sample Item Title 2",
      description: "This is another detailed description of the item. It provides insights and information relevant to the item.",
      createdDate: "2024-01-02",
      status: "Inactive"
    }
  ];

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
          <Paper key={item.id} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h4">{item.title}</Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              {item.description}
            </Typography>
            <Grid2 container spacing={2} style={{ marginTop: '20px' }}>
              <Grid2 item xs={12} sm={6}>
                <Typography variant="h6">Created Date:</Typography>
                <Typography variant="body1">{item.createdDate}</Typography>
              </Grid2>
              <Grid2 item xs={12} sm={6}>
                <Typography variant="h6">Status:</Typography>
                <Typography variant="body1">{item.status}</Typography>
              </Grid2>
            </Grid2>
          </Paper>
        ))}
      </Container>
    </div>
  );
}
