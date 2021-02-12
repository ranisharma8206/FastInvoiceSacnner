import React from 'react';
import Grid from '@material-ui/core/Grid';
import Document from './Document.js';
import SideBar from './SideBar.js';
import '../App.css';


export default function CenteredGrid() {

  return (
    <Grid container style={{width: '100%'}}>
      <Grid item xs={12} lg={8}>
        <Document></Document>
      </Grid>
      <Grid item xs={12} lg={4} style={{backgroundColor: '#f5f5f5', height : '100vh'}}>
        <SideBar></SideBar>
      </Grid>
    </Grid>
  );
}
