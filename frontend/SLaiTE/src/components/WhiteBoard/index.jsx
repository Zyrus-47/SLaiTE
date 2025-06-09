import { useEffect, useState, useLayoutEffect } from "react";
import rough from "roughjs/bin/rough";

const roughGenerator = rough.generator();

const WhiteBoard = ({ canvasRef, ctxRef, elements, setElements, tool, color, user, socket }) => {
  const [img, setImg] = useState(null);

  useEffect(() => {
    const handleWhiteboardData = (data) => {
      setImg(data.imgURL);
    };

    socket.on("whiteBoardDataResponse", handleWhiteboardData);
    return () => {
      socket.off("whiteBoardDataResponse", handleWhiteboardData);
    };
  }, [socket]);

 
  if (!user?.presenter) {
    return (
      <div
        className="relative border border-dark border-3 overflow-hidden"
        style={{ height: "80vh", marginBottom: "2rem" }}
      >
        <img
          src={img}
          alt="Real time feed of presenter"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;

    ctx.scale(dpr, dpr);
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
    }
  }, [color]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const roughCanvas = rough.canvas(canvasRef.current);
    const ctx = canvasRef.current.getContext("2d");

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    elements.forEach((element) => {
      const options = {
        stroke: element.stroke,
        strokeWidth: 5,
        roughness: 0,
      };

      if (element.type === "rect") {
        roughCanvas.draw(
          roughGenerator.rectangle(element.offsetX, element.offsetY, element.width, element.height, options)
        );
      } else if (element.type === "line") {
        roughCanvas.draw(
          roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height, options)
        );
      } else if (element.type === "pencil") {
        roughCanvas.linearPath(element.path, options);
      }
    });

    
    const canvasImage = canvasRef.current.toDataURL();
    socket.emit("whiteboardData", canvasImage);
  }, [elements]);

  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prev) => [
        ...prev,
        { type: "pencil", offsetX, offsetY, path: [[offsetX, offsetY]], stroke: color },
      ]);
    } else if (tool === "line") {
      setElements((prev) => [
        ...prev,
        { type: "line", offsetX, offsetY, width: offsetX, height: offsetY, stroke: color },
      ]);
    } else if (tool === "rect") {
      setElements((prev) => [
        ...prev,
        { type: "rect", offsetX, offsetY, width: 0, height: 0, stroke: color },
      ]);
    }

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    setElements((prev) =>
      prev.map((ele, index) => {
        if (index !== prev.length - 1) return ele;

        if (tool === "pencil") {
          return { ...ele, path: [...ele.path, [offsetX, offsetY]] };
        } else if (tool === "line") {
          return { ...ele, width: offsetX, height: offsetY };
        } else if (tool === "rect") {
          return {
            ...ele,
            width: offsetX - ele.offsetX,
            height: offsetY - ele.offsetY,
          };
        }

        return ele;
      })
    );
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div
      className="relative border border-dark border-3 overflow-hidden"
      style={{ height: "80vh", marginBottom: "2rem" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} className="w-100 h-100" />
    </div>
  );
};

export default WhiteBoard;
