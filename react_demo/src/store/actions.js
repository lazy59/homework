const SAVE_AGENTS = "SAVE_AGENTS"
const SET_AGENT = "SET_AGENT"

const getAgents = data => ({
    type: SAVE_AGENTS,
    data
})

const setAgents = data => ({
    type: SET_AGENT,
    data
})

export {
    SAVE_AGENTS,
    SET_AGENT,
    getAgents,
    setAgents
}