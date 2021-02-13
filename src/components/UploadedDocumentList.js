import React from 'react';
import List from '@material-ui/core/List';
import UploadedDocumentItem from './UploadedDocumentItem.js'

export default function UploadedDocumentList(props) {

  return (
    <List>
       {props.uda.map((item,index)=>{
         return (<UploadedDocumentItem name={item.documentName} doc={item} setSelDoc={props.setSelDoc}></UploadedDocumentItem>)
       })}
    </List>
  );
}
