import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomForm = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
    };
    setUser(roomData);
    navigate(`/${roomId}`);
    console.log(roomData);
    socket.emit("userJoined", roomData);
  };

  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="input-group my-2">
          <input
            type="text"
            value={roomId}
            className="form-control"
            disabled
            placeholder="Generated Code"
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setRoomId(uuid())}
            type="button"
          >
            Generate
          </button>
          <button className="btn btn-outline-danger btn-sm" type="button">
            Copy
          </button>
        </div>
      </div>

      <div className="form-group">
        <button
          type="submit"
          className="btn btn-primary btn-block form-control mt-4"
          onClick={handleCreateRoom}
        >
          Generate Room
        </button>
      </div>
    </form>
  );
};

export default CreateRoomForm;
