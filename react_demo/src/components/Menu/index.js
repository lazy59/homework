import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import routes from "../../router";
import "./index.scss";

function Menu() {
  const menus = routes.map((route) => route.meta);
  const history = useHistory();
  const location = useLocation();

  function handleJump(index) {
    history.push(routes[index].path);
  }

  function setActiveClass(index) {
    return routes[index].path === location.pathname ? "active" : "";
  }

  return (
    <div id="menu">
      <ul>
        {menus.map((menu, index) => (
          <li
            key={menu.title}
            onClick={() => handleJump(index)}
            className={setActiveClass(index)}
          >
            <i className={menu.icon}></i>
            <span>{menu.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
