<template>
  <div id="home">
    <div class="info_cards">
      <div class="status_card building">
        <i class="status-icon icon-cog"></i>
        <h3>Building</h3>
        <p class="num">{{ buildingNum }}</p>
      </div>
      <div class="status_card idle">
        <i class="status-icon icon-coffee"></i>
        <h3>Idle</h3>
        <p class="num">{{ idleNum }}</p>
      </div>
      <div class="status_card type_card">
        <div class="type_item" v-for="item in agentsCountInfo" :key="item.type">
          <div class="type">{{ item.type.toLocaleUpperCase() }}</div>
          <div class="count">{{ item.count }}</div>
        </div>
      </div>
    </div>

    <div class="handle_container">
      <div class="search_box mini">
        <i class="icon-search"></i>
        <input type="text" v-model="searchWord" />
      </div>
      <div class="tab_container">
        <div
          :class="['tab_item', { active: activeType === item.type }]"
          v-for="item in agentsCountInfo"
          :key="item.type"
          @click="activeType = item.type"
        >
          {{ item.type }}
        </div>
      </div>
      <div class="search_box large">
        <i class="icon-search"></i>
        <input type="text" v-model="searchWord" />
      </div>
    </div>

    <div class="agents_list">
      <div class="agent_item" v-for="item in agentsResult" :key="item.id">
        <div class="mini_line" :style="getTagStyle(item.status)"></div>
        <div
          class="agent_icon"
          :style="{ backgroundImage: `url(./img/${item.os}.png)` }"
        ></div>
        <div class="agent_content">
          <div class="agent_info">
            <div class="detail_container">
              <i class="icon-desktop"></i>
              <div class="name">{{ item.name }}</div>
            </div>
            <div class="tag" :style="getTagStyle(item.status)">
              {{ item.status }}
            </div>
            <div class="detail_container">
              <i class="icon-info"></i>
              <div class="ip">{{ item.ip }}</div>
            </div>
            <div class="detail_container">
              <i class="icon-folder"></i>
              <div class="location">{{ item.location }}</div>
            </div>
          </div>
          <div class="agent_resource">
            <div
              class="add_btn blue_btn icon-custom"
              @click="showAddPopWin($event, item)"
            ></div>
            <div class="resources">
              <div
                class="resource_tag"
                v-for="resource in item.resources"
                :key="resource"
              >
                <span>{{ resource }}</span>
                <i
                  class="icon-trash"
                  @click="deleteOneResource(item, resource)"
                ></i>
              </div>
            </div>
            <div
              class="deny blue_btn large"
              v-if="item.resources && item.resources.length"
              @click="deleteAll(item)">
              <i class="icon-deny"></i>
              <span>Deny</span>
            </div>
          </div>
          <div class="mini_deny_container">
            <div
              class="deny blue_btn mini"
              v-if="item.resources && item.resources.length"
              @click="deleteAll(item)">
              <i class="icon-deny"></i>
              <span>Deny</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./home.less";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      activeType: "All",
      activeAgent: null,
      searchWord: "",
    };
  },
  mounted() {
    this.getAgents().then((res) => console.log(res));
  },
  computed: {
    ...mapState(["agents"]),
    ...mapGetters([
      "physicalAgents",
      "virtualAgents",
      "buildingNum",
      "idleNum",
    ]),
    agentsCountInfo() {
      return [
        {
          type: "All",
          count: this.agents.length,
        },
        {
          type: "Physcial",
          count: this.physicalAgents.length,
        },
        {
          type: "Virtual",
          count: this.virtualAgents.length,
        },
      ];
    },
    activeAgents() {
      switch (this.activeType) {
        case "Physcial":
          return this.physicalAgents;
        case "Virtual":
          return this.virtualAgents;
        default:
          return this.agents;
      }
    },
    agentsResult() {
      const str = this.searchWord.trim();
      return str
        ? this.activeAgents.filter((ele) => {
            const values = Object.values({
              ...ele,
              resources: "",
              id: "",
            });
            const resourceStr = ele.resources.join(" ");
            const valuesStr = values.join(" ") + " " + resourceStr;
            return valuesStr.indexOf(str) > -1;
          })
        : this.activeAgents;
    },
  },
  methods: {
    ...mapActions(["getAgents", "setAgent"]),
    getTagStyle(status) {
      return {
        backgroundColor: status === "building" ? "#ff9a2a" : "#7fbc39",
      };
    },
    deleteOneResource(item, resource) {
      let resources = item.resources.filter((ele) => ele !== resource);
      this.setAgent({
        ...item,
        resources,
      });
    },
    deleteAll(item) {
      this.setAgent({
        ...item,
        resources: [],
      });
    },
    addAgents(agentArr) {
      this.setAgent({
        ...this.activeAgent,
        resources: this.activeAgent.resources.concat(agentArr),
      });
    },
    showAddPopWin($event, item) {
      this.activeAgent = item;
      const { left, top } = $event.target.getBoundingClientRect();
      this.$popWin.show({ left, top }, this.addAgents);
    },
  },
};
</script>
