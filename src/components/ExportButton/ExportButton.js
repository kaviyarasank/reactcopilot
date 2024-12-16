import React, { useContext } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import generateReactAppFiles from '../../generateReactAppFiles';
import { appContext } from '../../App';

const ExportButton = ({layout}) => {
  const context = useContext(appContext);
  
  const exportAsZip = () => {
    console.log("kjjjjjjjjjjjjjjjoooo",context);
    const zip = new JSZip();
    const files=  generateReactAppFiles(context);

    // Add files to the zip
    for (const [path, content] of Object.entries(files)) {
      zip.file(path, content);
    }
    //  zip.file(path, content);
    // Generate and save the zip file
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      saveAs(blob, 'copilot.zip');
    });
  };

  return <button onClick={exportAsZip}>Export Project </button>
};

export default ExportButton;
