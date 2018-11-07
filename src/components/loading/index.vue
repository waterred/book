<template>
  <div class="loading">
    <img src="./5-121204193R5-50.gif" alt="">
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "正在努力加载中..."
    }
  }
};
</script>

<style lang="less" scoped>
.loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1000;
  > p {
    margin-top: 0.2rem;
  }
}
</style>
