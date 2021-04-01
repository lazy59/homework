<template>
  <div class="footer">
      <div class="copyright">
          © Copyright 2021 <strong>Thought</strong>Works
      </div>
  </div>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style lang="less">
.footer {
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: #fff;
    font-size: 14px;
    box-shadow: 0 -3px 6px 0px rgba(0, 0, 0, 0.1);
}
@media screen and (max-width: 1204px) {
    .footer {
        display: none;
    }
}
</style>