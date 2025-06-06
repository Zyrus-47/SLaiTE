import { useState } from "react";
import "./index.css";
import WhiteBoard from "../../components/WhiteBoard";

const RoomPage = () => {
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");

  return (
    <div className="container">
      <h1 className="text-center py-4">SLaiTE{" "} 
        <span className="text-primary"> [Users online:]</span>
      </h1> 

      <div className="d-flex justify-content-between align-items-center flex-wrap px-5 py-3 gap-5">
        
        <div className="d-flex gap-2">
          <div className="d-flex gap-1 align-items-center">
            <label htmlFor="pencil">Pencil</label>
            <input
              type="radio"
              id="pencil"
              name="tool"
              value="pencil"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
          <div className="d-flex gap-1 align-items-center">
            <label htmlFor="line">Line</label>
            <input
              type="radio"
              id="line"
              name="tool"
              value="line"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
          <div className="d-flex gap-1 align-items-center">
            <label htmlFor="rect">Rectangle</label>
            <input
              type="radio"
              id="rect"
              name="tool"
              value="rect"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex flex-column align-items-center">
          <label htmlFor="color">Select Color:</label>
          <input
            type="color"
            id="color"
            value={color}
            className="mt-1"
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        
        <div className="d-flex gap-3 ms-4">
          <button className="btn btn-primary mt-1">Undo</button>
          <button className="btn btn-outline-primary mt-1">Redo</button>
        </div>

        
        <div>
          <button className="btn btn-danger mt-1">Clear Canvas</button>
        </div>
      </div>
      <div className="col-md-10  mx-auto mt-4 canvas-box">
            <WhiteBoard/>
      </div>
    </div>
  );
};

export default RoomPage;
