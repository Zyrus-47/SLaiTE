import { useRef, useState } from "react";
import "./index.css";
import WhiteBoard from "../../components/WhiteBoard";

const RoomPage = ({user,socket,users}) => {

  const canvasRef =useRef(null) ;
  const ctxRef =useRef(null);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements,setElements]=useState([]);
  const [history,setHistory]= useState([]);
  const [openUserTab,setOpenedUserTab]= useState(false);

  const handleClearCanvas=()=>{
    const canvas =canvasRef.current;
    const ctx =canvas.getContext("2d");
    ctx.fillRect ="white";
    ctx.clearRect(0,0, canvasRef.current.width, canvasRef.current.height);
    setElements([]);

  }
  const undo=()=>{
    setHistory((prevHistory)=>[...prevHistory,elements[elements.length-1]]);
    setElements(
      (prevElements)=>prevElements.slice(0,prevElements.length-1)
    );
  }
  const redo=()=>{
    setElements((prevElements)=>[...prevElements,history[history.length-1]
  ]);
    setHistory(
      (prevHistory)=>prevHistory.slice(0,prevHistory.length-1)
    );
  }


  return (
    <div className="container">
      <button type="button" className="btn btn-dark"
      style={{
        display: "block",
        position: "absolute",
        top: "5%",
        left: "5%",
        height: "40px",
        width: "100px"  
      }}
      onClick={()=>setOpenedUserTab(true)}
      >
         Users
      </button>
      {openUserTab && (
        <div className="position-fixed top-0  h-100 text-white bg-dark"
        style={{width:"250px", left: "0%"}}>
          <button type="button" onClick={()=>setOpenedUserTab(false)} className="btn btn-light btn-lock w-100 mt-1">Close</button>
          <div className="w-100 mt-5 pt-5">
          {users.map((usr,index)=>(
              <p key={index*999} className="my-2 text-center w-100">
                {usr.name} {user.userId === usr.userId && "(You)"}
                </p>
            ))
          }
          </div>
          </div>
      )}



      <h1 className="text-center py-4">SLaiTE{" "} 
        <span className="text-primary"> [Users online:{users.length}]</span>
      </h1> 
      {
        user?.presenter &&(
          <div className="d-flex justify-content-between align-items-center flex-wrap px-5 py-3 gap-5">
        
        <div className="d-flex gap-2">
          <div className="d-flex gap-1 align-items-center">
            <label htmlFor="pencil">Pencil</label>
            <input
              type="radio"
              id="pencil"
              checked={tool==="pencil"}
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
              checked={tool==="line"}
              value="line"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
          <div className="d-flex gap-1 align-items-center">
            <label htmlFor="rect">Rectangle</label>
            <input
              type="radio"
              checked={tool==="rect"}
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
          <button className="btn btn-primary mt-1"
           disabled={elements.length===0}
           onClick={()=> undo()}
          >Undo</button>
          <button className="btn btn-outline-primary mt-1"
           disabled={history.length<1}
           onClick={()=> redo()}
          >Redo</button>
        </div>

        
        <div>
          <button className="btn btn-danger mt-1" onClick={handleClearCanvas}>Clear Canvas</button>
        </div>
      </div>

        )
      }

      
      <div className="col-md-10  mx-auto mt-4 canvas-box">
            <WhiteBoard canvasRef={canvasRef} ctxRef={ctxRef}
            elements={elements}
            setElements={setElements}
            color={color}
            tool={tool}
            user={user}
            socket={socket}
            />
      </div>
    </div>
  );
};

export default RoomPage;
