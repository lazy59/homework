import PopWin from "@/components/PopWin.vue";

let $popWin;
export default {
  install(Vue) {
    if (!$popWin) {
      const popWinVue = Vue.extend(PopWin);
      $popWin = new popWinVue({
        el: document.createElement("div"),
      });
      document.body.appendChild($popWin.$el);
    }

    const popWinFn = {
      show({ left, top }, callback) {
        const windowHeight = window.innerHeight;
        $popWin.left = left - 17;
        $popWin.top = top + 50;
        $popWin.isUp = true;
        if ($popWin.top > windowHeight - 150) {
          $popWin.top = top - 170;
          $popWin.isUp = false;
        }
        $popWin.show = true;
        $popWin.callback = callback;
      },
      hide() {
        $popWin.show = false;
      },
    };
    Vue.mixin({
      created() {
        this.$popWin = popWinFn;
      },
    });
  },
};
