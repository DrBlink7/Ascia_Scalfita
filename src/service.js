import { useState, useEffect } from "react";

export function cleanUpUrl(whereAreYou) {
  let location = whereAreYou.replace(/\//gi, ' ');
  location = location.replace(/_/gi, " ");
  return location;
}

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, e: '', posX: 0, posY: 0 });
  useEffect(() => {
    const setFromEvent = e => {
      setPosition({ x: e.clientX, y: e.clientY, e: e, posX: e.target.x, posY: e.target.y });
    }
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("click", setFromEvent);
    };
  }, []);
  return position;
};