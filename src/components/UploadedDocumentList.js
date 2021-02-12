import React from 'react';
import List from '@material-ui/core/List';
import SingleList from './UploadedDocumentItem.js'

export default function UploadedDocumentList() {

  return (
    <List>
        <SingleList></SingleList>
        <SingleList></SingleList>
        <SingleList></SingleList>
        <SingleList></SingleList>
        <SingleList></SingleList>
    </List>
  );
}
