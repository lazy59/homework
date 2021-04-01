<template>
  <div class="header">
      <div class="c_container">
        <i class="icon-th-list" @click="menuClick"></i>
        <div class="logo">
            <img src="../assets/imgs/logo.svg" alt="Logo">
        </div>
        <div class="avatar"></div>
      </div>
  </div>
</template>

<script>
export default {
    name: "Header",
    methods: {
        menuClick() {
            this.$emit('menuClick')
        }
    }
}
</script>

<style lang="less">
.header {
    background-color: #fff;
    box-shadow: 0 1px 6px 0px rgba(0, 0, 0, 0.1);
    .c_container {
        margin: 0 auto;
        display: flex;
        height: 60px;
        align-items: center;
        .icon-th-list {
            font-size: 18px;
            margin-left: 30px;
            display: none;
        }
        .logo {
            flex: 1;
            text-align: center;
            img {
                height: 35px;
            }
        }
        .avatar {
            width: 40px;
            height: 40px;
            margin-right: 40px;
            background-image: url("../assets/imgs/avatar.jpg");
            background-size: contain;
            background-repeat: no-repeat;
            border-radius: 50%;
        }
    }
}

@media screen  and (max-width: 768px) {
    .icon-th-list {
        display: block!important;;
    }
}
</style>