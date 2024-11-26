// Generate the React app files including the component code as strings
const generateReactAppFiles = () => {
    // Store the LoginForm component code as a string
    const loginFormCode = `
      import React, { useState } from 'react';
      import './LoginForm.css';
  
      const LoginForm = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
  
        const handleSubmit = (e) => {
          e.preventDefault();
          console.log('Username:', username);
          console.log('Password:', password);
        };
  
        return (
          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button type="submit">Login</button>
          </form>
        );
      };
  
      export default LoginForm;
    `;
  
    // Store the LoginForm.css code as a string
    const loginFormCSS = `
      .login-form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #f9f9f9;
      }
  
      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
  
      input {
        width: 100%;
        padding: 8px;
        margin-bottom: 15px;
      }
  
      button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
      }
    `;
  
    return {
      'package.json': JSON.stringify(
        {
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
        },
        null,
        2
      ),
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
      'src/LoginForm.js': loginFormCode,  // Include LoginForm code as string
      'src/LoginForm.css': loginFormCSS,  // Include LoginForm CSS as string
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
  
  export default generateReactAppFiles;
  