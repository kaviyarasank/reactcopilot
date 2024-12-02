// Generate the React app files including the component code as strings
const generateReactAppFiles = (props: any) => {
  const layout = JSON.stringify(props?.layout)
  // Store the LoginForm component code as a string
  const loginFormCode = `
import React, { useContext, useState } from "react"
import Chart from "react-google-charts";
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);

const UserPreview = () => {
   const [layout, setLayout] = useState(${layout})

  return (
    <div>
           <ReactGridLayout
              className="layout mx-auto bg-white border"
              layout={layout}
              cols={12}
              rowHeight={50}
              isResizable={true}
              isDraggable={true}
              allowOverlap={true}
            >
              {layout?.map((item) => (
                <div
                  key={item.i}
                  data-grid={item}
                  className="gridDIv position-ralative"
                >
                  <Chart
                    chartType={item?.type}
                    data={[
                      ["Task", "Hours per Day"],
                      ["Work", 9],
                      ["Eat", 2],
                      ["Commute", 2],
                      ["Watch TV", 2],
                      ["Sleep", 7],
                    ]}
                    options={{
                      title: "My Daily Activities",
                    }}
                    width={"100%"}
                    // height={"400px"}
                  />
                </div>
              ))}
            </ReactGridLayout>
    </div>
  )
};

export default UserPreview;
`;

  // Store the LoginForm.css code as a string
  const loginFormCSS = ` `;

  return {
    "package.json": JSON.stringify(
      {
        name: "login-form",
        version: "1.0.0",
        scripts: {
          start: "react-scripts start",
          build: "react-scripts build",
          test: "react-scripts test",
          eject: "react-scripts eject",
        },
        dependencies: {
          "react": "^18.3.1",
          "react-dom": "^18.3.1",
          "react-scripts": "5.0.1",
          "react-google-charts": "^5.2.1",
          "react-grid-layout": "^1.5.0",
        },
      },
      null,
      2
    ),
    "src/index.js": `
        import React from 'react';
        import ReactDOM from 'react-dom/client';
        import App from './App';
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<React.StrictMode><App /></React.StrictMode>);
      `,
    "src/App.js": `
        import React from 'react';
        import UserPreview from './UserPreview';
        const App = () => <UserPreview/>;
        export default App;
      `,
    "src/UserPreview.js": loginFormCode, // Include LoginForm code as string
    "src/UserPreview.css": loginFormCSS, // Include LoginForm CSS as string
    "public/index.html": `
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
