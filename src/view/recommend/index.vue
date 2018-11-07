<template>
  <div class="banner">

  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import axios from 'axios';
  export default{
    created(){
      this.getLists();
    },
    methods:{
      getLists(){
        axios.get('api/ranking/54d43437d47d13ff21cad58b').then(res=>{
          console.log(12)
          console.log(res)
        })
      }
    }
  }
</script>

<style>

</style>
