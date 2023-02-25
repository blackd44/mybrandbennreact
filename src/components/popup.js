import { useCallback, useEffect, useRef } from "react";

const Popup = ({ children, setVisibility, ...props }) => {
  const backRef = useRef();

  const visiblity = useCallback((e) => {
    e.preventDefault();
    setVisibility(false);
  }, [setVisibility]);

  useEffect(() => {
    const back = backRef.current;
    if (back || back !== null) back.addEventListener("dblclick", visiblity);

    return () => {
      if (back || back !== null) back.addEventListener("dblclick", visiblity);
    };
  }, [backRef, visiblity]);
  
  return (
    <>
      <div className="infront">
        <div className="back" ref={backRef}></div>
        {children}
      </div>
    </>
  );
};

export default Popup;
