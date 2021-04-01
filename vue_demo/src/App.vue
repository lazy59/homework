<template>
  <div id="app">
    <Header @menuClick="showMenu" />
    <div class="container c_container">
      <Menu class="menu_view" ref="menu" />
      <div class="content">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Menu,
    Header,
    Footer,
  },
  methods: {
    showMenu() {
      this.$refs.menu.showView()
    }
  }
};
</script>

<style lang="less">
#app {
  height: 100%;
  position: relative;
  background: #eee;
  display: flex;
  flex-direction: column;
  .container {
    height: 100%;
    overflow: hidden;
    flex: 1;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    position: relative;
  }
  .content {
    height: 100%;
    position: relative;
    overflow: auto;
    flex: 1;
    padding: 20px;
  }
}

@media screen  and (max-width: 768px) {
  .menu_view {
    position: fixed;
    height: 100%;
    z-index: 1000;
    top: 0;
    left: 0;
  }
  .content {
    padding: 20px 5px!important;
  }
}
</style>
