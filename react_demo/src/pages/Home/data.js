import axios from "axios";

export function getPhysicalAgents(agents) {
  return agents.filter((ele) => "physical" === ele.type);
}

export function getVirtualAgents(agents) {
  return agents.filter((ele) => "virtual" === ele.type);
}

export function buildingNum(agents) {
  return agents.filter((ele) => "building" === ele.status).length;
}

export function idleNum(agents) {
  return agents.filter((ele) => "idle" === ele.status).length;
}

export async function setAgent(data) {
  const { id } = data;
  return axios.put(`/agents/${id}`, data).then((res) => {
    const data = res.data;
    return data;
  });
}

export function agentsCountInfo(agents) {
  return [
    {
      type: "All",
      count: agents.length,
    },
    {
      type: "Physcial",
      count: getPhysicalAgents(agents).length,
    },
    {
      type: "Virtual",
      count: getVirtualAgents(agents).length,
    },
  ];
}

export function deleteOneResource(item, resource) {
  let resources = item.resources.filter((ele) => ele !== resource);
  return setAgent({
    ...item,
    resources,
  });
}

export function deleteAllResource(item) {
  return setAgent({
    ...item,
    resources: [],
  });
}

export function setResources(activeAgent, resources) {
  return setAgent({
    ...activeAgent,
    resources: activeAgent.resources
      ? activeAgent.resources.concat(resources)
      : [],
  });
}
