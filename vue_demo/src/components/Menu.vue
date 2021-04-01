<template>
  <div id="menu" :class="isShow ? 'show' : 'hidden'">
    <ul>
      <li
        v-for="(menu, index) in menus"
        :key="menu.title"
        :class="activeName === menu.title ? 'active' : ''"
        @click="menuJump(index)"
      >
        <i :class="menu.icon"></i>
        <span>{{ menu.title }}</span>
      </li>
    </ul>
    <i class="icon-close" @click="hiddenView"></i>
  </div>
</template>

<script>
import routes from "../router/routerConfig";

export default {
  name: "Menu",
  data() {
    return {
      menus: [],
      isShow: false
    };
  },
  created() {
    this.menus = routes.map((route) => route.meta);
  },
  computed: {
    activeName() {
      return this.$route.meta.title;
    },
  },
  methods: {
    menuJump(index) {
      this.hiddenView();
      this.$router.push(routes[index].path);
    },
    hiddenView() {
      this.isShow = false
    },
    showView() {
      this.isShow = true
    }
  },
};
</script>

<style lang="less">
#menu {
  width: 300px;
  background: @grayColor;
  color: #fff;
  ul {
    padding-top: 30px;
    li {
      cursor: pointer;
      padding: 10px 20px;
      span {
        padding-left: 10px;
      }
      &:hover,
      &.active {
        color: @blueColor;
        background-color: @grayHoverColor;
      }
    }
  }
  .icon-close {
    display: none;
  }
}

@media screen  and (max-width: 768px) {
  #menu {
    padding-top: 50px;
    transition: transform ease-in-out .5s;
    &.show {
      transform: translateX(0);
    }
    &.hidden {
      transform: translateX(-100%);
    }
  }
  .icon-close {
    display: block!important;
    color: @blueColor;
    font-size: 25px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>
