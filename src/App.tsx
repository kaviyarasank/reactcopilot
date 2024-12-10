import React, { createContext, useState } from "react";
import ExportButton from "./components/ExportButton/ExportButton";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GenarateForm from "./components/Print/GenarateForm";
import UserPreview from "./components/preview/userView";

export const appContext = createContext({});

const App = () => {

  const [layout, setLayout] = useState([]);
  const updateLayout=(layouts:any)=>{
    setLayout(layouts)
  }
  console.log("layoutbbbb",layout);
  
  return (
    <appContext.Provider value={{
      layout,
      updateLayout
    }}>
    <div className="App">
      <h1>React Project Exporter</h1>
      <div className="container-fluid bg-white">
            <DndProvider backend={HTML5Backend}>
                <GenarateForm />
            </DndProvider>
        </div>
        {/* <UserPreview/> */}
      {/* <LoginForm /> */}
      <div style={{ marginTop: 10 }}>
        <ExportButton layout={layout}/>
        </div>
    </div>
        </appContext.Provider>
  );
};

export default App;
