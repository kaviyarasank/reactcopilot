import React, { useContext, useState } from "react"
import Chart from "react-google-charts";
import RGL, { WidthProvider } from "react-grid-layout";
import { appContext } from "../../App";
const ReactGridLayout = WidthProvider(RGL);

const UserPreview = () => {
    const context = useContext<any>(appContext);
    console.log("context",context?.layout);

  return (
    <div>
           <ReactGridLayout
              className="layout mx-auto bg-white border"
              layout={context?.layout}
              cols={12}
              rowHeight={50}
              isResizable={true}
              isDraggable={true}
              allowOverlap={true}
            >
              {context?.layout?.map((item: any) => (
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
