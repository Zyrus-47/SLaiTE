const CreateRoomForm = () => {
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
        <div className="input-group my-2">
          <input
            type="text"
            className="form-control"
            disabled
            placeholder="Generated Code"
          />
          <button className="btn btn-primary btn-sm" type="button">
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
        >
          Generate Room
        </button>
      </div>
    </form>
  );
};

export default CreateRoomForm;
