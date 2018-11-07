<template>
  <div class="footer">
    <div class="search">
      <input type="text">
      <button class="go">搜索</button>
    </div>
    <ul >
      <li>首页</li>
      <li>分类</li>
      <li>排行</li>
      <li>书单</li>
      <li>我的</li>
    </ul>
    <div class="copyright">
      <div class="record">
        <img src="@/assets/images/recordIcon.png" alt="">
        <span>沪公网安备 31011202006103号</span>
      </div>
      <p>上海元聚网络科技有限公司 增值电信业务经营许可证沪B2-20170022 网络文化经营许可证沪网文（2016）3206-227号 出版物经营许可证新出发沪批字第U7659号</p>
      <p>客服电话：021-54393188-8048</p>
    </div>
    
  </div>
</template>

<script>
import "mint-ui/lib/style.css";
export default {
  data() {
    return {
      value: "总裁"
    };
  }
};
</script>

<style lang="less" scoped>
.footer {
  margin-top: 0.2rem;
  padding: 0.2rem;
  background-color: #f4f4f4;
  .search {
    display: flex;
    input,
    .go {
      outline: none;
      border: 1px solid #ddd;
    }
    input {
      flex: 1;
      outline: none;
      text-indent: 0.1rem;
    }
    .go {
      margin-left: 0.2rem;
      padding: 0.05rem 0.1rem;
      font-size: 0.12rem;
      color: #666;
      background-color: transparent;
    }
  }
  ul {
    display: flex;
    padding: 0.2rem 0;

    > li {
      flex: 1;
      text-align: center;
      font-size: 0.12rem;
      border-right: 1px solid #ddd;
      &:last-of-type {
        border-right: 0;
      }
    }
  }
  .copyright {
    .record {
      text-align: center;
      padding: 0.2rem;
      img,
      > span {
        vertical-align: middle;
      }
      img {
        display: inline;
      }
      > span {
        font-size: 0.14rem;
        color: #666;
        margin-left: 0.15rem;
      }
    }
    > p {
      font-size: 0.12rem;
      color: #999;
      text-align: center;
    }
  }
}
</style>
