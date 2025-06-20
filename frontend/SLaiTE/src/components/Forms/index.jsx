import CreateRoomForm from "./CreateRoomForm";
import "./index.css";
import JoinRoomForm from "./JoinRoomForm";

const Forms = ({uuid,socket,setUser}) => {
  return (
      <div className="row h-100 pt-5">
        <div className="col-md-4 mt-5 form-box p-5 border border-primary rounded-2 d-flex align-items-center flex-column mx-auto">
          <h1 className="text-primary fw-bold p-3">Create Room</h1>
          <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser}/>
        </div>
        <div className="col-md-4 mt-5 form-box p-5 border border-primary rounded-2 d-flex align-items-center flex-column mx-auto">
          <h1 className="text-primary fw-bold p-3">Join Room</h1>
          <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser}/>
        </div>
      </div>
  );
};

export default Forms;
