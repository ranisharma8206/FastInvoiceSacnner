import { useState, useEffect } from 'react';
import CustomGrid from './components/CustomGrid.js';
import io from "socket.io-client";


let endPoint = "http://10.3.0.104:5000";
let socket = io.connect(`${endPoint}`);



const testData = [{id : 1, documentUrl : "https://4.imimg.com/data4/DN/JW/MY-938683/a4-size-document-scanning-services-500x500.jpg", documentName : "document1"},
{id : 2, documentUrl : "https://img.yumpu.com/43438720/1/500x640/a4-size-paper-open-library-society-inc.jpg", documentName : "document2"}];

function App() {
  const [uploadedDocumentsArray, setUploadedDocumentsArray] = useState(testData);
  const [selectedDocument, setSelectedDocument] = useState(testData[0]);
  const [uid, setUid] = useState(0);



  useEffect(() => {
    getUploadedDocuments();
    getUid();
  }, [uploadedDocumentsArray.length]);

  const getUploadedDocuments = () => {
    socket.on("documentUpload", document => {
      //   let allMessages = messages;
      //   allMessages.push(msg);
      //   setMessages(allMessages);
      console.log(document)
      let doc = JSON.parse(document);
      let docNew = {id:doc.id, documentUrl : `${endPoint}/${doc.url}`, documentName : doc.name}
      let uda = [...uploadedDocumentsArray]
      console.log(uda)
      uda.push(docNew)
      console.log(uda)
      setUploadedDocumentsArray(uda);
    });
  };

  const getUid = () => {
    socket.on("uid", u => {
      //   let allMessages = messages;
      //   allMessages.push(msg);
      //   setMessages(allMessages);
      setUid(u);
      console.log(u);
    });
  };












  return (
    <CustomGrid uda={uploadedDocumentsArray} selDoc={selectedDocument} setSelDoc={setSelectedDocument}></CustomGrid>
  );
}

export default App;