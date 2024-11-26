import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const generateReactAppFiles = () => {
  return {
    'package.json': JSON.stringify({
      name: 'login-form',
      version: '1.0.0',
      scripts: {
        start: 'react-scripts start',
        build: 'react-scripts build',
        test: 'react-scripts test',
        eject: 'react-scripts eject',
      },
      dependencies: {
        react: '^18.0.0',
        'react-dom': '^18.0.0',
        'react-scripts': '5.0.1',
      },
    }, null, 2),
    'src/index.js': `
      import React from 'react';
      import ReactDOM from 'react-dom/client';
      import App from './App';
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<React.StrictMode><App /></React.StrictMode>);
    `,
    'src/App.js': `
      import React from 'react';
      import LoginForm from './LoginForm';
      const App = () => <LoginForm />;
      export default App;
    `,
    'src/LoginForm.js': `
      import React, { useState } from 'react';
      const LoginForm = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const handleSubmit = (e) => {
          e.preventDefault();
          console.log('Username:', username);
          console.log('Password:', password);
        };
        return (
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username" 
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
            />
            <button type="submit">Login</button>
          </form>
        );
      };
      export default LoginForm;
    `,
    'public/index.html': `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Form</title>
      </head>
      <body>
        <div id="root"></div>
      </body>
      </html>
    `,
  };
};


const exportAsZip = () => {
  const zip = new JSZip();
  const files = generateReactAppFiles();

  for (const [path, content] of Object.entries(files)) {
    zip.file(path, content);
  }

  zip.generateAsync({ type: 'blob' }).then((blob) => {
    saveAs(blob, 'login-form.zip');
  });
};



const ExportButton = () => (
  <button onClick={exportAsZip}>Export Login Form</button>
);

export default ExportButton;
