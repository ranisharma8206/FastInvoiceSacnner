import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import SingleList from './SingleList.js'

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function InteractiveList() {
  const classes = useStyles();

  return (
    <div>
      <Grid container justify="center" style={{marginTop : '2vh'}}>
        <Grid item xs={12} md={ 11}>
          <div className={classes.demo}>
            <List>
              <SingleList></SingleList>
              <SingleList></SingleList>
              <SingleList></SingleList>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
