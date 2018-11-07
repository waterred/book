<template>
  <div class="top">
    <div class="sex">
      <span>男</span>
      <span class="active">女</span>
    </div>
    <p class="title">追书神器</p>
    <div class="search iconfont icon-sousuo"></div>
  </div>
</template>

<script>
import "@/assets/font/iconfont.css";
export default {};
</script>

<style lang="less">
.top {
  width: 100%;
  padding: 0.1rem 0;
  position: relative;
  display: flex;
  align-items: center;

  .sex {
    width: 0.5rem;
    height: 0.24rem;
    border-radius: 0.24rem;
    background-color: #eee;
    margin-left: 0.2rem;
    display: flex;
    justify-content: space-around;

    > span {
      width: 0.24rem;
      height: 0.24rem;
      text-align: center;
      color: #666;
      &.active {
        color: #fff;
        background-color: red;
        border-radius: 50%;
      }
    }
  }
  p {
    flex: 1;
    font-size: 0.3rem;
    color: red;
    font-weight: 700;
    text-align: center;
  }
  .search {
    width: 0.5rem;
    margin-right: 0.15rem;
    color: red;
    font-size: 0.3rem;
    text-align: right;
  }
}
</style>
