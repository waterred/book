<template>
    <div class="book-title">
      <mt-header :title="title">
        <mt-button  icon="back" slot="left" @click="back">返回</mt-button>
        <mt-button  class="iconfont icon-zhuye index" @click="toIndex" slot="right"></mt-button>
      </mt-header>
    </div>
</template>

<script>
import "mint-ui/lib/style.css";

export default {
  props: {
    title: {
      type: String,
      default: "主题"
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    toIndex() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less">
.mint-header {
  background-color: red;
  .index {
    font-size: 0.24rem;
  }
}
</style>
