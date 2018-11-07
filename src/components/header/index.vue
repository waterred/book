<template>
  <div class="header">
    <ul>
      <li class="active">
        <router-link to="/recommend">精选</router-link>
      </li>
      <li>
        <router-link to="/vip">VIP</router-link>
      </li>
      <li>
        <router-link to="/sort">分类</router-link>
      </li>
      <li>
        <router-link to="/rank">排行</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  
}
</script>

<style lang="less" scoped>
  .header{
    ul{
      display: flex;
      background-color: red;
      >li{
        width:25%;
        padding:10px 0;
        text-align: center;
        >a{
          color:#ccc;
          text-decoration: none;
          &.router-link-active{
          color:#fff;
        }
        }
        
      }
    }
  }
</style>
