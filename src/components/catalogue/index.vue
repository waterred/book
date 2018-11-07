<template>
  <scroll class="catalogue">
      <div>
        <book-title :title="'优质书源'"></book-title>
        <div class="menu">
          <div>
            <span>目录</span>
            <p>
              <span>共</span>
              <span class="count">{{chapterLists.length}}</span>
              <span>章</span>
            </p>
          </div>
          
          <span @click="reverse">{{getSortText}}</span>
        </div>
        <ul class="chapter">
          <li v-for="(item,key) in chapterLists" :key="key" >
            <span>{{key | getKey(isreverse,chapterLists.length)}} {{item.title}}</span>
            <span class="iconfont icon-suo" v-show="item.unreadble" ></span>
          </li>
        
        </ul>
        <!-- <catalogue-bottom></catalogue-bottom> -->
      </div>

  </scroll>
</template>

<script>
import BookTitle from "@/components/bookTitle";
import CatalogueBottom from "@/components/footer";
import Scroll from "@/components/scroll";
import axios from "axios";
export default {
  components: {
    BookTitle,
    CatalogueBottom,
    Scroll
  },
  data() {
    return {
      bookId: 0,
      chapterLists: [],
      isreverse: false,
      sourceId: 0
    };
  },
  computed: {
    getSortText() {
      return this.isreverse ? "正序" : "倒序";
    }
  },
  created() {
    //http://api.zhuishushenqi.com/atoc/568fef99adb27bfb4b3a58dc?view=chapters
    this.bookId = this.$route.params.id;
    this.getChapterLists();
  },
  methods: {
    getChapterLists() {
      //获取小说源（传递bookId）
      axios.get(`/api/btoc?view=summary&book=${this.bookId}`).then(res => {
        console.log(res.data);
        this.sourceId = res.data[0]._id;
        //获取小说章节（根据源id）
        axios.get(`/api/atoc/${this.sourceId}?view=chapters`).then(res => {
          console.log(res.data);
          this.chapterLists = res.data.chapters;
        });
      });
    },
    reverse() {
      this.isreverse = !this.isreverse;
      this.chapterLists.reverse();
    }
  },
  filters: {
    getKey(key, isreverse, len) {
      return isreverse ? len - key : key;
    }
  }
};
</script>

<style lang="less" scoped>
.catalogue {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;

  .menu {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    > div {
      display: flex;
      flex: 1;
      align-items: center;
      > span {
        font-size: 0.2rem;
      }
      > p {
        font-size: 0.16rem;
        margin-left: 0.1rem;
        color: #999;
      }
    }
  }
  ul.chapter {
    padding-left: 0.2rem;
    > li {
      padding: 0.15rem 0;
      border-top: 1px solid #eee;
      font-size: 0.12rem;
      color: #999;
      &:last-of-type {
        border-bottom: 1px solid #eee;
      }
      > .icon-suo {
        float: right;
        margin-right: 0.2rem;
      }
    }
  }
}
</style>
