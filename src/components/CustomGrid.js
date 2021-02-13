import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DocumentPreview from './DocumentPreview.js';
import RightSideBar from './RightSideBar.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  }
}));

export default function CenteredGrid(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} lg={8}>
        <DocumentPreview selDoc={props.selDoc}></DocumentPreview>
      </Grid>
      <Grid item xs={12} lg={4}>
        <RightSideBar uda={props.uda} setSelDoc={props.setSelDoc}></RightSideBar>
      </Grid>
    </Grid>
  );
}
