<template>
  <div
    class="popwin_container"
    v-if="show"
    @mousewheel.stop.prevent
    @click.self="cancel"
  >
    <div class="popwin" :style="{ left: left + 'px', top: top + 'px' }">
      <i class="icon-close" @click="cancel"></i>
      <div :class="['arrow_box', { down: !isUp }]"></div>
      <div class="title">Separate multiple resource name with commas</div>
      <input
        type="text"
        class="resource_input"
        placeholder="e.g. Chrome,Firefox"
        v-model="resources"
      />
      <div class="popwin_buttons">
        <div class="sure blue_btn" @click="addResource">Add Resources</div>
        <div class="cancel gray_btn" @click="cancel">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopWin",
  data() {
    return {
      resources: "",
      top: 0,
      left: 0,
      show: false,
      isUp: true,
      callback: null,
    };
  },
  methods: {
    addResource() {
      // TODO: resource length check
      this.resources = this.resources.trim();
      const arr = this.resources.split(",").filter((ele) => ele.trim());
      if (!arr.length) return;
      this.callback && this.callback(arr);
      this.cancel();
    },
    cancel() {
      this.show = false;
      this.resources = "";
      this.callback = null;
    },
  },
};
</script>

<style lang="less" scoped>
@arrowBaseSize: 12px;
.arrow_style {
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 2 * @arrowBaseSize solid @blueColor;
  border-left: @arrowBaseSize solid transparent;
  border-right: @arrowBaseSize solid transparent;
}
.popwin_container {
  position: fixed;
  z-index: 2000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .popwin {
    background: #fff;
    position: absolute;
    width: 570px;
    border: 1px solid @blueColor;
    padding: 15px;
    box-sizing: border-box;
    .icon-close {
      color: @blueColor;
      font-size: 25px;
      position: absolute;
      top: 10px;
      right: 20px;
      cursor: pointer;
    }
    .arrow_box:extend(.arrow_style) {
      top: -25px;
      left: 20px;
      &.down {
        transform: rotate(180deg);
        top: auto;
        bottom: -25px;
      }
      &::after:extend(.arrow_style) {
        content: "";
        position: absolute;
        transform: translate(-50%, 2px);
        border-bottom: 2 * @arrowBaseSize solid #fff;
      }
    }
    input {
      margin-top: 15px;
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
      box-sizing: border-box;
      border: 1px solid #999;
      border-radius: 4px;
      &:focus {
        border: 1px solid #999;
        outline: none;
      }
    }
    .popwin_buttons {
      margin-top: 15px;
      div {
        width: 110px;
        text-align: center;
        display: inline-block;
        margin-right: 20px;
      }
    }
  }
}

@media screen and (max-width: 1204px) {
  .popwin_container {
    background-color: rgba(0, 0, 0, .3);
  }
  .popwin {
    left: 50%!important;
    top: 150px!important;
    transform: translateX(-50%);
  }
  .arrow_box {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .popwin_container {
    .popwin {
      width: 100%;
      padding-top: 50px;
      .popwin_buttons {
        .gray_btn {
          display: none;
        }
        .blue_btn {
          width: 93%;
        }
      }
    }
  }
}

  
</style>
