import React, { useContext } from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import{ DashboardContext} from '../context/gadgetcontext'

const Dashboard = () => {
  const { dashboardGadgets } = useContext(DashboardContext);

  return (
    <Container>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {dashboardGadgets.length === 0 ? (
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: 20, textAlign: 'center' }}>
              No gadgets added to the dashboard yet.
            </Paper>
          </Grid>
        ) : (
          dashboardGadgets.map((gadget, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} style={{ padding: 20 }}>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
