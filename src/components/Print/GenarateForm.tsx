import React, { useContext, useEffect, useRef, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { useDrop } from "react-dnd";
import "./GenarateForm.css";
import DragFile from "./DragFile";
import Chart from "react-google-charts";
import { appContext } from "../../App";


const ReactGridLayout = WidthProvider(RGL);

let idCounter = 0;

const getId = () => {
  idCounter++;

  return idCounter.toString();
};

function GenarateForm() {
  const context = useContext<any>(appContext);
  const [layout, setLayout] = useState<any>([]);
  const [index, setIndex] = useState("");
  const [xposition, setXposition] = useState(0)
  const [yposition, setYposition] = useState(0)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const addNewItem = (item: any) => {
    const newInputBox = {
      x: xposition > 2 ? xposition - 2 : 0,
      y: yposition > 2 ? yposition - 2 : 0,
      w: 12,
      h: 4,
      i: getId(),
      isBounded: "",
      type: item?.name?.type,
      props: {
        ...item?.name,
      },
      moved: true,
      isResizable: true,
      isDraggable: true,
      static: true,
    };
    setLayout((prevLayout: any) => [newInputBox, ...prevLayout]);
  };
  console.log("item", layout);

  const [{ isOver }, dropRef] = useDrop({
    accept: "language",
    drop: (item) =>
      addNewItem(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const changeLayout = (changeLayouts: any) => {
    const combinedArray = layout.map((item1: any) => ({
      ...item1,
      ...changeLayouts.find((item2: any) => item2.i === item1.i),
    }));
    setLayout(combinedArray);
    context.updateLayout(combinedArray);
  };

  const gridClickFn = (index: any) => {
    setIndex(index);
    let ind = layout.findIndex((res: any) => res.i === index);
  };

  const handleDeleteControl = (id: any) => {
    let res = layout.filter((res: any) => res.i !== id);
    setLayout(res)
    setTimeout(() => {
      setIndex("")
    }, 100)
  }


  const SaveForm = () => {
    console.log("commonSettings", layout);

  };

  return (
    <div className="p-3">
      <div className="row mt-3">
        <div className="col-8 border" ref={dropRef}>
          <div >
            <ReactGridLayout
              className="layout mx-auto bg-white border"
              layout={layout}
              cols={12}
              rowHeight={50}
              onLayoutChange={changeLayout}
              isResizable={true}
              isDraggable={true}
              allowOverlap={true}
            >
              {layout.map((item: any) => (
                <div
                  key={item.i}
                  data-grid={item}
                  className="gridDIv position-ralative"
                  onClick={() => gridClickFn(item.i)}
                >
                  <>
                    {console.log("layout", layout)
                    }
                  </>
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
        </div>

        <div className="col-4">
          <div>
            <img src={""} alt="delete" className="deleteSvgImg" onClick={() => handleDeleteControl(index)} />
            <DragFile />
          </div>
        </div>
      </div>

      <div className="d-flex gap-3">
        <button onClick={SaveForm} className="backBtn mt-3">
          Submit
        </button>

        <button onClick={() => {
          handleOpen();
        }} className="backBtn mt-3">
          Preview
        </button>
      </div>
    </div>
  );
}

export default GenarateForm;
