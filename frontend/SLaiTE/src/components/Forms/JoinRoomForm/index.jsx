import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({uuid,socket,setUser}) => {

  const [roomId,setRoomId]=useState("");
  const [name,setName]=useState("");
  const navigate =useNavigate();


  const handleRoomJoin=(e)=>{
    e.preventDefault();
    const roomData={
      name,
      roomId,
      userId:uuid(),
      host:false,
      presenter: false,
    };
    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("userJoined",roomData)
  }
  return (
    <form className="form col-md-12 mt-5">
      
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Room Code"
          value={roomId}
          onChange={(e)=>setRoomId(e.target.value)}
        />
      </div>

      
      <div className="form-group">
        <button
          type="submit"
          onClick={handleRoomJoin}
          className="btn btn-primary btn-block form-control mt-4"
        >
          Join Room
        </button>
      </div>
    </form>
  );
};

export default JoinRoomForm;
