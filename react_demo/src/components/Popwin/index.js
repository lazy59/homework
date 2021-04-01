import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";

function Popwin({ top, left, fn }) {
  const windowHeight = window.innerHeight;
  left = left - 17;
  top = top + 50;
  let isUp = true;
  if (top > windowHeight - 150) {
    top = top - 220;
    isUp = false;
  }
  let callback = fn;
  const [resources, setResources] = useState("");
  const container = useRef(null);
  function addResource() {
    // 此处最好校验名称长度
    setResources(resources.trim());
    const arr = resources.split(",").filter((ele) => ele.trim());
    if (!arr.length) return;
    callback && callback(arr);
    cancel();
  }

  function cancel() {
    setResources("");
    callback = null;
    Popwin.hide();
  }

  function stopProp(e, fn) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    fn && fn();
  }

  useEffect(() => {
    container.current.addEventListener(
      "mousewheel",
      (e) => {
        e.preventDefault();
      },
      {
        passive: false,
      }
    );
  }, []);

  return (
    <div className="popwin_container" ref={container} onClick={() => cancel()}>
      <div
        className="popwin"
        style={{ left: left + "px", top: top + "px" }}
        onClick={(e) => stopProp(e)}
      >
        <i className="icon-close" onClick={() => cancel()}></i>
        <div className={`arrow_box ${isUp ? "" : "down"}`}></div>
        <div className="title">Separate multiple resource name with commas</div>
        <input
          type="text"
          className="resource_input"
          placeholder="Input value"
          value={resources}
          onChange={(e) => setResources(e.target.value)}
        />
        <div className="popwin_buttons">
          <div className="sure blue_btn" onClick={() => addResource()}>
            Add Resources
          </div>
          <div className="cancel gray_btn" onClick={() => cancel()}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

Popwin.show = function (props) {
  this.dom = document.createElement("div");
  document.body.append(this.dom);
  ReactDOM.render(<Popwin {...props} />, this.dom);
};

Popwin.hide = function () {
  this.dom && ReactDOM.unmountComponentAtNode(this.dom);
  this.dom && this.dom.parentNode && this.dom.parentNode.removeChild(this.dom);
};
export default Popwin;
