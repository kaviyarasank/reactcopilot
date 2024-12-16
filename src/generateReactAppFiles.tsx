const generateReactAppFiles = (props: any) => {
  const layout = JSON.stringify(props?.layout);

  const chartComponents = props.layout
    ?.map((item: any) => {
      return `
        <div
          key="${item.i}"
          data-grid={${JSON.stringify(item)}}
          className="gridDIv"
        >
          <ChartRenderer
                          id={${item.i}}
                          type={${JSON.stringify(item.type)}}
                          item={${JSON.stringify(item)}}
                        />

        </div>
      `;
    })
    .join("");

  const userPreviewCode = `
import React from "react";
import Chart from "react-google-charts";
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);
import ChartRenderer from "./renderChart";



const UserPreview = () => {
  return (
    <div>
      <ReactGridLayout
        className="layout mx-auto bg-white border"
        cols={12}
        rowHeight={50}
        isResizable={false}
        isDraggable={false}
        allowOverlap={false}
      >
        ${chartComponents}
      </ReactGridLayout>
    </div>
  );
};

export default UserPreview;
`;

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
          'react': "^18.3.1",
          "react-dom": "^18.3.1",
          "react-scripts": "5.0.1",
          "react-google-charts": "^5.2.1",
          "react-grid-layout": "^1.5.0",
          "react-dnd": "^16.0.1",
          "react-dnd-html5-backend": "^16.0.1",
          "react-redux": "^9.1.2",
          "@reduxjs/toolkit": "^2.4.0",
        },
      },
      null,
      2
    ),
    "src/index.js": `
       
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './service/store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider></React.StrictMode>);

      `,
    "src/App.js": `
        import React from 'react';
        import UserPreview from './UserPreview';
        const App = () => <UserPreview />;
        export default App;
      `,
    "src/UserPreview.js": userPreviewCode,
    "src/UserPreview.css": userPreviewCSS,
    "src/renderChart.js": `import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useLazyGetReportsQuery } from "./service/reports";


const ChartRenderer = ({ id, type,item }) => {
  const [data, setData] = useState(null);
  const [reports] = useLazyGetReportsQuery();
  
  useEffect(() => {
    const fetchAndSetData = async () => {
       await reports("")
        .unwrap()
        .then((res) => {
            setData(res?.result)
        })
        .catch((err) => ({
      
        }))
    };
    fetchAndSetData();
  }, [id]); 

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Chart
      chartType={type}
      data={data}
      options={{
        title: "My Dynamic Chart",
      }}
      width={"100%"}
    />
  );
};
export default ChartRenderer;`,

    "src/service/baseQuery.js": `import {
    FetchArgs,
    createApi,
    fetchBaseQuery,
   FetchBaseQueryError, FetchBaseQueryMeta, BaseQueryFn
  } from "@reduxjs/toolkit/query/react";
  
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://15.206.125.185:3000/',
      prepareHeaders: (headers, { getState }) => {
        return headers;
      },
    })
  
  //used for token handle and common response and error
  
  const customFetchBaseQuery = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    console.log('result', result);
    return result;
  };
  
  
  export const baseApi = createApi({
    reducerPath: "baseApiReducer",
    baseQuery: customFetchBaseQuery,
    endpoints: () => ({}),
    tagTypes: []
  });
  `,
    "src/service/reports.js": `import { baseApi } from "./baseQuery";

const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getReports: build.query({
      query: () => ({
        url: 'api/report/view_report_chartdata?id=675ff9f45bff99d1dfbf4ec1&query_id=675ff98b5bff99d1dfbf4eaf&connection_id=675fe1835bff99d1dfbf4e59',
        method: "GET"
      }),
    }),


  }),
});

export const {
  useLazyGetReportsQuery,
} = reportsApi;
`,
    "src/service/store.js": `
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from './baseQuery';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

`,
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
