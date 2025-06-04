const JoinRoomForm = () => {
  return (
    <form className="form col-md-12 mt-5">
     
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Room Code"
        />
      </div>

      
      <div className="form-group">
        <button
          type="submit"
          className="btn btn-primary btn-block form-control mt-4"
        >
          Join Room
        </button>
      </div>
    </form>
  );
};

export default JoinRoomForm;
