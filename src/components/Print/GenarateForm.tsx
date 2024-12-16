import React, { useCallback, useContext, useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { useDrop } from "react-dnd";
import "./GenarateForm.css";
import DragFile from "./DragFile";
import Chart from "react-google-charts";
import { appContext } from "../../App";
import { useLazyGetReportsQuery } from "../../service/reports";
import renderChart from "./renderChart";
import ChartRenderer from "./renderChart";

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
  const [xposition, setXposition] = useState(0);
  const [yposition, setYposition] = useState(0);

  const [reports] = useLazyGetReportsQuery();
  const [chartData, setChartData] = useState<{ [key: string]: any }>({}); // To store chart data for each chart

  const handleOpen = () => { };
  console.log("chartData", chartData);


  const addNewItem = (item: any) => {
    const newInputBox = {
      x: xposition > 2 ? xposition - 2 : 0,
      y: yposition > 2 ? yposition - 2 : 0,
      w: 6,
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
      static: false,
    };
    setLayout((prevLayout: any) => [newInputBox, ...prevLayout]);
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: "language",
    drop: (item) => addNewItem(item),
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
    setLayout(res);
    setTimeout(() => {
      setIndex("");
    }, 100);
  };

  const fetchChartData = useCallback(() => {
    Promise.all(
      layout.map((item: any) =>
        reports("")
          .unwrap()
          .then((res: any) => {

            return {
              id: item.i,
              data: res?.result || [], // Default chart data
            }
          }
          )
          .catch((err: any) => ({
            id: item.i,
            data: [], // Default chart data on error
          }))
      )
    ).then((results) => {
      const updatedChartData = results.reduce((acc: any, result: any) => {
        acc[result.id] = result.data;
        return acc;
      }, {});
      setChartData(updatedChartData);
    });
  }, [layout, reports]);


  useEffect(() => {
    if (layout?.length > 0) {
      fetchChartData();
    }
  }, [layout, fetchChartData]);

  const SaveForm = () => {
    console.log("Saved layout:", layout);
  };

  const dragOver = (e: any) => {

    const containerWidth = e.currentTarget.clientWidth;
    let x = (e.clientX / containerWidth) * 12;
    x = Math.floor(Math.min(12, Math.max(0, x)));
    setXposition(x)

    const containerWidth1 = e.currentTarget.clientWidth;
    let y = (e.clientY / containerWidth1);
    y = Math.floor(Math.min(12, Math.max(0, y)));
    setYposition(y)
  }

  return (
    <div className="p-3">
      <div className="row mt-3">
        <div className="col-8 border containerSection" ref={dropRef}  >
          <div className="" ref={dropRef}>
            <div className=" mt-2 p-2 " style={{ minHeight: 200, background: "#FFFFFF", borderRadius: "4px" }}>
              <div onDragOver={(e) => dragOver(e)} className="section dot">
                <ReactGridLayout
                  className="layout"
                  layout={layout}
                  cols={12}
                  rowHeight={100}
                  onLayoutChange={(data) => changeLayout(data)}
                  isResizable={true}
                  isDraggable={true}
                >
                  {layout?.map((item: any) => (
                    <div
                      key={item?.i}
                      data-grid={item}
                      className="resize-grid-bg"
                      onClick={() => gridClickFn(item.i)}
                    >
                      <div className="full-height">
                        <ChartRenderer
                          id={item.i}
                          type={item.type}
                        />
                      </div>
                    </div>
                  ))}
                </ReactGridLayout>
              </div>
              <br />
            </div>
          </div>
        </div>

        <div className="col-4">
          <div>
            <img
              src={""}
              alt="delete"
              className="deleteSvgImg"
              onClick={() => handleDeleteControl(index)}
            />
            <DragFile />
          </div>
        </div>
      </div>

      {/* <div className="d-flex gap-3">
        <button onClick={SaveForm} className="backBtn mt-3">
          Submit
        </button>

        <button
          onClick={() => {
            handleOpen();
          }}
          className="backBtn mt-3"
        >
          Preview
        </button>
      </div> */}
    </div>
  );
}

export default GenarateForm;
