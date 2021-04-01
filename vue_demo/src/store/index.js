import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    agents: [],
  },
  mutations: {
    SAVE_AGENTS(state, agents) {
      state.agents = agents;
    },
    SET_AGENT(state, agent) {
      let index = state.agents.findIndex((ele) => ele.id === agent.id);
      Vue.set(state.agents, index, agent);
    },
  },
  actions: {
    getAgents({ commit }) {
      return axios.get("/agents").then((res) => {
        const data = res.data;
        commit("SAVE_AGENTS", data);
        return data;
      });
    },
    // eslint-disable-next-line
    setAgent({ commit }, data) {
      const { id } = data;
      return axios.put(`/agents/${id}`, data).then((res) => {
        const data = res.data;
        commit("SET_AGENT", data);
        return data;
      });
    },
  },
  getters: {
    physicalAgents({ agents }) {
      return agents.filter((ele) => "physical" === ele.type);
    },
    virtualAgents({ agents }) {
      return agents.filter((ele) => "virtual" === ele.type);
    },
    buildingNum({ agents }) {
      return agents.filter((ele) => "building" === ele.status).length;
    },
    idleNum({ agents }) {
      return agents.filter((ele) => "idle" === ele.status).length;
    },
  },
});
