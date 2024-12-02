import { DragCard } from "./DragCrad";
import "./GenarateForm.css";

const Data = [
 {
  name:"Bar chart",
  type:"Bar",
  icon:""
 },
 {
  name:"Pie chart",
  type:"PieChart",
  icon:""
 }
];

export function DragFile() {
  return (
    <div className="my-8 mx-8 rounded-xl border w-fit">
      <div className="m-4">
        <div>
          <p className="mx-16 font-bold text-center">Drag your Items</p>
        </div>
        <div className="row">
        {Data.map((e:any, i:any) => (
          <div key={i} className="cursor-pointer col-4">
            <DragCard name={e} />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
export default DragFile;
