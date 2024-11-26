import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import generateReactAppFiles from '../../generateReactAppFiles';
import LoginForm from '../LoginForm/LoginForm';

const ExportButton = () => {
  const exportAsZip = async () => {
    const zip = new JSZip();
    const files = await generateReactAppFiles();
    console.log("files",files,JSON.stringify(LoginForm));
    

    // Add files to the zip
    for (const [path, content] of Object.entries(files)) {
      zip.file(path, content);
    }
    //  zip.file(path, content);
    // Generate and save the zip file
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      saveAs(blob, 'login-form.zip');
    });
  };

  return <button onClick={exportAsZip}>Export Login Form</button>;
};

export default ExportButton;
