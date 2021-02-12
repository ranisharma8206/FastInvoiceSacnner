import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Doc from '../assests/images/file1.jpg';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles({
  root: {
      maxWidth : '700px',
      margin : 'auto',
      marginTop : '1vh',
      height : 'auto',
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
  },
  media: {
    width : 'auto',
    height : '90vh'
  },
  button: {
    marginLeft: "auto"
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={Doc}
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <CardActions>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      </CardActions>
    </Card>
  );
}

