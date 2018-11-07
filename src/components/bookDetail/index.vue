<template>
  <scroll class="book-detail">
    <div>
      <book-title :title="'书籍详情'"></book-title>
      <div class="book-info">
        <div class="book-pic">
          <img :src="bookInfo.cover | getUrl" alt="">
        </div>
        <div class="book-mess">
          <p class="title">{{bookInfo.title}}</p>
          <p>
            <span class="author">{{bookInfo.author}}</span>
            <span class="line">|</span>
            <span class="minor">{{bookInfo.minorCate}}</span>
            <span class="line">|</span>
            <span class="word-num">{{bookInfo.wordCount | changeNum}}</span>字
          </p>
          <p>
            <span class="time">30分钟</span>
            <span>前更新</span>
          </p>
        </div>
      </div>
      <div class="deal">
        <div class="add">加入书架</div>
        <div class="start-read" @click="read">开始阅读</div>
      </div>
      <div class="book-status">
        <div>
          <p>追人气</p>
          <p class="popularity">{{bookInfo.latelyFollower | changeNum}}</p>
        </div>
        <div>
          <p>读者留存率</p>
          <p class="remain">{{bookInfo.retentionRatio | getCollect}}</p>
        </div>
        <div>
          <p>日更新字数/天</p>
          <p  class="day-word">{{bookInfo.serializeWordCount | changeNum}}</p>
        </div>
      </div>
      <div class="text-content">
        {{bookInfo.longIntro}}
      </div>
      <div class="catalog" @click="toCatalogue">
        <p>目录</p>
        <div class="newest" >
          <span>></span>
          <p>
            <span>[</span>
            <span class="recently-time">{{bookInfo.updated | getRecentlyTime}}</span>
            <span>前更新]</span>
            <span>{{bookInfo.lastChapter}}</span>
          </p>

        </div>
      </div>
      <!-- <div class="hot-comment">
        <h3 class="title">热门书评</h3>
        <span class="more">更多评论</span>
      </div> -->
      <!-- <div class="comment-lists">
        <div class="comment">
          <div class="logo">
            <img src="" alt="">
          </div>
          <div class="comment-mess">
            <p class="commenter">有道无为</p>
            <p class="">在山的那边</p>
          </div>
        </div>
      </div> -->
      <book-footer :title="searchTitle"></book-footer>
    </div>
  </scroll>
  
</template>

<script>
import BookTitle from "@/components/bookTitle";
import axios from "axios";
import BookFooter from "@/components/footer";
import Scroll from "@/components/scroll";
export default {
  components: {
    BookTitle,
    BookFooter,
    Scroll
  },
  data() {
    return {
      bookId: 0,
      bookInfo: [],
      searchTitle: "总裁"
    };
  },
  created() {
    this.bookId = this.$route.params.id;
    this.getBookInfo();
  },
  methods: {
    getBookInfo() {
      axios.get(`/api/book/${this.bookId}`).then(res => {
        console.log(res.data);
        this.bookInfo = res.data;
      });
    },
    read() {
      this.$router.push({ path: `/reading/${this.bookId}` });
    },
    toCatalogue() {
      this.$router.push({ path: `/source/${this.bookId}` });
    }
  },
  filters: {
    changeNum(val) {
      return val / 10000 > 1 ? (val / 10000).toFixed(1) + "万" : val;
    },
    getUrl(val) {
      return "http://statics.zhuishushenqi.com" + val;
    },
    getCollect(val) {
      return val + "%";
    },
    getRecentlyTime(val) {
      let time = val;
      let d = new Date(time);
      let n = new Date();
      console.log((n.getTime() - d.getTime()) / 1000 / 60 / 60);
      let times =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();

      let t = (n.getTime() - d.getTime()) / 1000 / 60 / 60;
      return t > 1 ? parseInt(t) + "小时" : parseInt(t * 60) + "分钟";
    }
  }
};
</script>

<style lang="less" scoped>
.book-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  .book-info {
    display: flex;
    padding: 0.2rem;
    .book-pic {
      width: 60px;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .book-mess {
      margin-left: 0.2rem;
      p {
        color: #999;
        font-size: 0.14rem;
        margin-top: 0.05rem;
        &.title {
          font-size: 0.2rem;
          color: #000;
          margin-bottom: 0.1rem;
          margin-top: 0;
        }
        .author {
          color: red;
        }
        .line {
          padding: 0 0.1rem;
        }
      }
    }
  }
  .deal {
    display: flex;
    padding: 0 0.2rem;
    justify-content: space-between;
    .add,
    .start-read {
      width: 45%;
      text-align: center;
      font-size: 0.2rem;
      border: 1px solid red;
      padding: 0.1rem 0;
      border-radius: 2px;
    }
    .add {
      color: red;
    }
    .start-read {
      background-color: red;
      color: #fff;
    }
  }
  .book-status {
    display: flex;
    margin-top: 0.2rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 0.2rem 0;

    > div {
      text-align: center;
      flex: 1;

      > p:first-of-type {
        color: #666;
      }
      > p:last-of-type {
        margin-top: 0.05rem;
        font-size: 0.2rem;
      }
    }
  }
  .text-content {
    margin: 0 0.2rem;
    padding: 0.2rem 0;
    color: #333;
    font-size: 0.16rem;
    line-height: 0.3rem;
    border-bottom: 1px solid #ddd;
  }
  .catalog {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    > p {
      width: 0.5rem;
      font-size: 0.18rem;
    }
    .newest {
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
      color: #999;
      > p {
        width: 2.5rem;
        text-align: right;
        margin-right: 0.1rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .hot-comment {
    display: flex;
    padding: 0.1rem 0.2rem;
    justify-content: space-between;
    .more {
      color: #666;
    }
  }
}
</style>

