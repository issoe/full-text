import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import myPdf from '../../storage/sample.pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './style.css';
import axios from 'axios';

// Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';

function ViewPdf({ id }) {
  
  const [numPages, setNumPages] = useState(null);
  const [file, setPdfFile] = useState(null);
  const [fileName, setFileName] = useState('')

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const downloadFunction = () => {
    console.log("Download fileName: ", fileName)
    if(fileName) {
      const confirmDownload = window.confirm(`Bạn muốn download ${fileName} này?`);
      if (confirmDownload) {
        const fileUrl = `../../storage/${fileName}`; // Đường dẫn tới file pdf của bạn
        const anchorElement = document.createElement('a');
        anchorElement.href = fileUrl;
        anchorElement.setAttribute('download', `${fileName}`);
        anchorElement.click();
      }
    } else console.log("File is empty")
  }

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8082/download/${id}`)
      .then((response) => {
        console.log("Response:", response)
        setFileName(response.data.message)
        // const fileUrl = '../../storage/' + response.data.message;
        // console.log(fileUrl)
        // import(fileUrl)
        //   .then((importedFile) => {
        //     setPdfFile(importedFile.default || importedFile); // Lưu trữ tệp PDF vào state
        //   })
        //   .catch((error) => {
        //     console.error('Error importing PDF file:', error);
        //   });
      })
      .catch((error) => {
        console.error('Error fetching PDF:', error);
      });
    }

  }, [id])

  return (
    <div className="wrapper__view__pdf h-full">
      <div>
        <div className='font-bold text-lg mt-2'>Details</div>
        <div className="w-full h-[1px] bg-[#FFF]"></div>
        <ul className='list-disc relative'>
          {/* <li className='ml-4'>Keyword: xyz</li> */}
          <li className='ml-4'><div>You are viewing the file: <div className='font-bold inline-block'>{fileName}</div></div></li>
          <li className='ml-4'>Created: khanhpq@gmail.com, at 20-10-2023</li>
        </ul>
        <div className='w-full grid justify-items-center my-1 p-2'>
          <button className='bg-[#1D4ED8] text-white p-1 rounded-lg'
            onClick={downloadFunction}
            >
            Download
          </button>
        </div>
      </div>
      <div className="pdf-div">
        <Document file={myPdf} onLoadSuccess={onDocumentLoadSuccess} className="w-full">
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => {
              return <Page className="flex w-full" pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />;
            })}
        </Document>
    
      </div>
    </div>
  );
}

export default ViewPdf;

