import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { ReducerContext } from "../../App";
import { getAgents, setAgents } from "../../store/actions";
import "./index.scss";

import {
  buildingNum,
  idleNum,
  agentsCountInfo,
  getPhysicalAgents,
  getVirtualAgents,
  deleteOneResource,
  deleteAllResource,
  setResources,
} from "./data";
import Popwin from "../../components/Popwin";

function InfoCards({ agents, agentsCountData }) {
  return (
    <div className="info_cards">
      <div className="status_card building">
        <i className="status-icon icon-cog"></i>
        <h3>Building</h3>
        <p className="num">{buildingNum(agents)}</p>
      </div>
      <div className="status_card idle">
        <i className="status-icon icon-coffee"></i>
        <h3>Idle</h3>
        <p className="num">{idleNum(agents)}</p>
      </div>
      <div className="status_card type_card">
        {agentsCountData.map((item) => (
          <div className="type_item" key={item.type}>
            <div className="type">{item.type.toLocaleUpperCase()}</div>
            <div className="count">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentList({ agentsResult, dispatch, refreshResources }) {
  function getTagStyle(status) {
    return {
      backgroundColor: status === "building" ? "#ff9a2a" : "#7fbc39",
    };
  }

  function AgentResource({ item }) {
    const addBtn = useRef(null);
    function showPopwin() {
      const { left, top } = addBtn.current.getBoundingClientRect();
      Popwin.show({
        top,
        left,
        fn: (arr) => {
          refreshResources(item, arr);
        },
      });
    }
    return (
      <div className="agent_resource">
        <div
          className="add_btn blue_btn icon-custom"
          ref={addBtn}
          onClick={() => showPopwin()}
        ></div>
        <div className="resources">
          {item.resources.map((resource) => (
            <div
              className="resource_tag"
              key={resource}
              onClick={() =>
                deleteOneResource(item, resource).then((data) =>
                  dispatch(setAgents(data))
                )
              }
            >
              <span>{resource}</span>
              <i className="icon-trash"></i>
            </div>
          ))}
        </div>
        {(item.resources && item.resources.length && (
          <div
            className="deny blue_btn"
            onClick={() =>
              deleteAllResource(item).then((data) => dispatch(setAgents(data)))
            }
          >
            <i className="icon-deny"></i>
            <span>Deny</span>
          </div>
        )) ||
          null}
      </div>
    );
  }

  return (
    <div className="agents_list">
      {agentsResult &&
        agentsResult.length &&
        agentsResult.map((item) => (
          <div className="agent_item" key={item.id}>
            <div
              className="agent_icon"
              style={{ backgroundImage: `url(./img/${item.os}.png)` }}
            ></div>

            <div className="agent_content">
              <div className="agent_info">
                <i className="icon-desktop"></i>
                <div className="name">{item.name}</div>
                <div className="tag" style={getTagStyle(item.status)}>
                  {item.status}
                </div>
                <i className="icon-info"></i>
                <div className="ip">{item.ip}</div>
                <i className="icon-folder"></i>
                <div className="location">{item.location}</div>
              </div>
              <AgentResource item={item} />
            </div>
          </div>
        ))}
    </div>
  );
}

function TabAndSearch({
  agentsCountData,
  activeType,
  setActiveType,
  searchWord,
  setSearchWord,
}) {
  return (
    <div className="handle_container">
      <div className="tab_container">
        {agentsCountData.map((item) => (
          <div
            className={`tab_item ${activeType === item.type ? "active" : ""}`}
            key={item.type}
            onClick={() => setActiveType(item.type)}
          >
            {item.type}
          </div>
        ))}
      </div>
      <div className="search_box">
        <i className="icon-search"></i>
        <input
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
    </div>
  );
}

function Home() {
  const {
    state: { agents },
    dispatch,
  } = useContext(ReducerContext);

  const agentsCountData = agentsCountInfo(agents),
    physicalAgents = getPhysicalAgents(agents),
    virtualAgents = getVirtualAgents(agents);

  const [activeType, setActiveType] = useState("All");
  const [searchWord, setSearchWord] = useState("");
  const [agentsResult, setAgentResult] = useState([]);

  useEffect(() => {
    axios.get("/agents").then((res) => {
      const data = res.data;
      dispatch(getAgents(data));
    });
  }, [dispatch]);

  useEffect(() => {
    const str = searchWord.trim();
    let activeAgents;
    switch (activeType) {
      case "Physcial":
        activeAgents = physicalAgents;
        break;
      case "Virtual":
        activeAgents = virtualAgents;
        break;
      default:
        activeAgents = agents;
        break;
    }
    const data = str
      ? activeAgents.filter((ele) => {
          const values = Object.values({
            ...ele,
            resources: "",
            id: "",
          });
          const resourceStr = ele.resources.join(" ");
          const valuesStr = values.join(" ") + " " + resourceStr;
          return valuesStr.indexOf(str) > -1;
        })
      : activeAgents;
    setAgentResult(data);
  }, [activeType, searchWord, agents]);

  function refreshResources(activeAgent, arr) {
    console.log(arr);
    console.log(activeAgent);
    setResources(activeAgent, arr).then((data) => dispatch(setAgents(data)));
  }

  return (
    <div id="home">
      <InfoCards agents={agents} agentsCountData={agentsCountData} />
      <TabAndSearch
        agentsCountData={agentsCountData}
        activeType={activeType}
        setActiveType={setActiveType}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />
      <AgentList
        agentsResult={agentsResult}
        dispatch={dispatch}
        refreshResources={refreshResources}
      />
    </div>
  );
}

export default Home;
