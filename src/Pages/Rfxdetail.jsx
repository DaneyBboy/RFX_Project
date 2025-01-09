import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Use useParams to get the rfxNumber from URL
import { Container, Paper, Typography, Grid, Button, Box} from '@mui/material';


export default function RfxDetail() {


  const { rfxNumber } = useParams(); // Extract rfxNumber from URL using useParams
  const [rfxData, setRfxData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:4000/rfx/number/${rfxNumber}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const results = await response.json();
        setRfxData(results); // Set the fetched data to state
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Error fetching data'); // Handle error if fetch fails
        setLoading(false); // Set loading to false if there's an error
      }
    }

    fetchData();

    // Cleanup function to avoid memory leaks if component unmounts
    return () => {
      setRfxData(null); // Reset data on unmount
      setLoading(true); // Reset loading state
      setError(null); // Reset error state
    };
  }, [rfxNumber]); // Dependency on rfxNumber so the effect runs when it changes

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>{error}</div>;
  }

  // Render the fetched RFX data
  if (rfxData) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          RFX Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">RFX Number: {rfxData.rfxNumber}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Proposal Criteria:
            </Typography>
            <Typography variant="body1">{rfxData.proposalCriteria}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Contact Person:
            </Typography>
            <Typography variant="body1">{rfxData.contactPerson}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Date Issued:
            </Typography>
            <Typography variant="body1">
              {new Date(rfxData.dateIssued).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Submission Date:
            </Typography>
            <Typography variant="body1">
              {new Date(rfxData.submissionDate).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Purpose:
            </Typography>
            <Typography variant="body1">{rfxData.purpose}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Project Goals:
            </Typography>
            <Typography variant="body1">{rfxData.projectGoals}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Scope of Work:
            </Typography>
            <Typography variant="body1">{rfxData.scopeOfWork}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              File Upload:
            </Typography>
            <Box>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: 'primary.main',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
                href={rfxData.fileUrl}
                download
              >
                Download File
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    );
  }

  return null; // Return nothing if rfxData is not yet fetched
}
