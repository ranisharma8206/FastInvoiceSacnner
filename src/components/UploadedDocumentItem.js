import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  deleteDocumentIcon : {
    '&:hover':
    {
      color : 'red'
    }
  }
}));

export default function UploadedDocumentItem() {
  const classes = useStyles();
  return (
    <ListItem>
        <ListItemAvatar>
        <Avatar>
            <FolderIcon />
        </Avatar>
        </ListItemAvatar>
        <InputBase
        defaultValue="Document"
        inputProps={{ 'aria-label': 'naked' }}
      />
        <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" className={classes.deleteDocumentIcon} >
            <DeleteIcon />
        </IconButton>
        </ListItemSecondaryAction>
  </ListItem>
  );
}
