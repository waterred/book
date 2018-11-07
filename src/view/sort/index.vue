<template>
  <div class="sort">
    <div class="content">
      <div class="part" v-for="(item,key) in lists" :key="key">
        <p class="part-name">{{item.title}}</p>
        <div class="type">
          <div class="item" v-for="(val, k ) in  item.lists" @click="readDetail(item.gender,val.name)" :key="k">
            <p class="name">{{val.name}}</p>
            <p class="num">{{val.monthlyCount}}</p>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
  
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import axios from "axios";
import Scroll from "@/components/scroll";
export default {
  data() {
    return {
      lists: []
    };
  },
  components: {
    Scroll
  },
  created() {
    this.getLists();
  },
  methods: {
    getLists() {
      axios.get("api/cats/lv2/statistics").then(res => {
        this.lists.push({
          title: "男生",
          gender: "male",
          lists: res.data.male
        });
        this.lists.push({
          title: "女生",
          gender: "female",
          lists: res.data.female
        });
        this.lists.push({
          title: "漫画",
          gender: "picture",
          lists: res.data.picture
        });
        this.lists.push({
          title: "出版",
          gender: "press",
          lists: res.data.press
        });

        // console.log(res.data);
      });
    },
    readDetail(gender, major) {
      this.$router.push({ path: "/sort/detail/" + gender + "/" + major });
    }
  }
};
</script>

<style lang="less">
.sort {
  overflow: hidden;
  .part {
    > p.part-name {
      color: #999;
      font-size: 0.14rem;
      padding: 0.2rem 0 0.2rem 0.3rem;
    }
    .type {
      display: flex;
      flex-wrap: wrap;
      border-left: 1px solid #ccc;
      border-top: 1px solid #ccc;

      .item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0.1rem 0;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        p.name {
          color: #000;
          font-size: 0.14rem;
        }
        > p.num {
          margin-top: 0.05rem;
          color: #999;
        }
      }
    }
  }
}
</style>
