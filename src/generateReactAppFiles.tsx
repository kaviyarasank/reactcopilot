const generateReactAppFiles = (props: any) => {
  const layout = JSON.stringify(props?.layout);

  // Generate static JSX code for each chart in the layout
  const chartComponents = props.layout
    ?.map((item: any) => {
      return `
        <div
          key="${item.i}"
          data-grid={${JSON.stringify(item)}}
          className="gridDIv position-relative"
        >
          <Chart
            chartType="${item.type}"
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
          />
        </div>
      `;
    })
    .join("");

  // Store the UserPreview component code as a string with static JSX
  const userPreviewCode = `
import React from "react";
import Chart from "react-google-charts";
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);

const UserPreview = () => {
  return (
    <div>
      <ReactGridLayout
        className="layout mx-auto bg-white border"
        cols={12}
        rowHeight={50}
        isResizable={true}
        isDraggable={true}
        allowOverlap={true}
      >
        ${chartComponents}
      </ReactGridLayout>
    </div>
  );
};

export default UserPreview;
`;

  // Store the UserPreview.css code as a string
  const userPreviewCSS = ` `;

  return {
    "package.json": JSON.stringify(
      {
        name: "chart-dashboard",
        version: "1.0.0",
        scripts: {
          start: "react-scripts start",
          build: "react-scripts build",
          test: "react-scripts test",
          eject: "react-scripts eject",
        },
        dependencies: {
          react: "^18.3.1",
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
        const App = () => <UserPreview />;
        export default App;
      `,
    "src/UserPreview.js": userPreviewCode,
    "src/UserPreview.css": userPreviewCSS,
    "public/index.html": `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Chart Dashboard</title>
        </head>
        <body>
          <div id="root"></div>
        </body>
        </html>
      `,
  };
};

export default generateReactAppFiles;
