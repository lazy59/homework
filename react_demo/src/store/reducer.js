import { SET_AGENT, SAVE_AGENTS } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case SAVE_AGENTS:
      return {
        agents: action.data,
      };
    case SET_AGENT:
      const { id } = action.data;
      let result = [...state.agents];
      let index = state.agents.findIndex((ele) => ele.id === id);
      result.splice(index, 1, action.data);
      return {
        agents: result,
      };
    default:
      return state;
  }
};
