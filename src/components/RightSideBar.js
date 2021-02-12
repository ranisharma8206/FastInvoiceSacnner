import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button';
import UploadedDocumentList from './UploadedDocumentList.js'

const useStyles = makeStyles((theme) => ({
  root : {
    height:'100vh', 
    backgroundColor: '#f5f5f5'
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  uploadedDocumentlist : {
    paddingTop : '2vh'
  },
  button: {
    margin : 'auto',
    position: 'absolute',
    bottom:   '4vh'
  },
}));

export default function InteractiveList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" className={classes.uploadedDocumentlist}>
        <Grid item xs={12} md={ 11}>
          <div className={classes.demo}>
            <UploadedDocumentList></UploadedDocumentList>
          </div>
        </Grid>
        <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<CloudDownloadIcon />}
        >
            Download All
        </Button>
      </Grid>
    </div>
  );
}
