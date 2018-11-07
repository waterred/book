<template>
  <div id="app">
    <!-- 顶部 -->
    <top></top>
    <!-- 导航 -->
    <header-nav></header-nav>
    <!-- 子路由 -->
    <router-view/>
    <book-footer></book-footer>
  </div>
</template>

<script>
import Top from "@/components/topic";
import HeaderNav from "@/components/header";
import BookFooter from "@/components/footer";
import Scroll from "@/components/scroll";
export default {
  name: "App",
  components: {
    Top,
    HeaderNav,
    BookFooter,
    Scroll
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-size: calc(100vw / 4.8);
  height: 100%;
}
ul {
  list-style: none;
}
body {
  height: 100%;
  font-size: 0.14rem;
}
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
