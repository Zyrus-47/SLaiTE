import { useEffect, useState, useLayoutEffect } from "react";
import rough from "roughjs/bin/rough";

const roughGenerator = rough.generator();

const WhiteBoard = ({ canvasRef, ctxRef, elements, setElements }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      roughCanvas.linearPath(element.path, { stroke: element.stroke });
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const newElement = {
      type: "pencil",
      path: [[offsetX, offsetY]],
      stroke: "black",
    };
    setElements((prevElements) => [...prevElements, newElement]);
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    setElements((prevElements) => {
      const updatedElements = [...prevElements];
      const lastElement = updatedElements[updatedElements.length - 1];
      const updatedLastElement = {
        ...lastElement,
        path: [...lastElement.path, [offsetX, offsetY]],
      };
      updatedElements[updatedElements.length - 1] = updatedLastElement;
      return updatedElements;
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="border border-dark border-3 h-100 w-100"
    />
  );
};

export default WhiteBoard;
