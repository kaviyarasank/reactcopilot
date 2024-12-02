import { useDrag } from "react-dnd";
import "./GenarateForm.css";

export const DragCard = ({ name }: any) => {
  const [{ isDragging }, dragRef]: any = useDrag({
    type: "language",
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div>
      <div ref={dragRef}>
        <div className="dragCardDiv">
          <img src={name.icon} alt="icon" />
          <p>
            {name?.name}
          </p>
        </div>
      </div>
    </div>
  );
};