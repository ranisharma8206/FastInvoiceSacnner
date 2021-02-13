import { useState } from 'react';
import CustomGrid from './components/CustomGrid.js';

const testData = [{id : 1, documentUrl : "https://4.imimg.com/data4/DN/JW/MY-938683/a4-size-document-scanning-services-500x500.jpg", documentName : "document1"},
{id : 2, documentUrl : "https://img.yumpu.com/43438720/1/500x640/a4-size-paper-open-library-society-inc.jpg", documentName : "document2"}];

function App() {
  const [uploadedDocumentsArray, setUploadedDocumentsArray] = useState(testData);
  const [selectedDocument, setSelectedDocument] = useState(testData[0]);
  return (
    <CustomGrid uda={uploadedDocumentsArray} selDoc={selectedDocument} setSelDoc={setSelectedDocument}></CustomGrid>
  );
}

export default App;