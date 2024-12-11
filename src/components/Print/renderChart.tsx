import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useLazyGetReportsQuery } from "../../service/reports";

interface ChartRendererProps {
  id: string;
  type: any;
//   fetchChartData: (id: string) => Promise<any>;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ id, type }) => {
  const [data, setData] = useState<any>(null);
  const [reports] = useLazyGetReportsQuery();

  useEffect(() => {
    const fetchAndSetData = async () => {
       await reports("")
        .unwrap()
        .then((res: any) => {
            setData(res?.result)
        })
        .catch((err: any) => ({
      
        }))
    };
    fetchAndSetData();
  }, [id]); // Re-run effect when `id` or `fetchChartData` changes

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

export default ChartRenderer;
