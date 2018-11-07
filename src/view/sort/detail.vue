<template>
  <div class="sort-detail">
    <book-title :title="this.currentMajor" ref="major" ></book-title>
    <ul class="alltype"  ref="alltype">
      <li class="active"  @click="refreshType">热门</li>
      <li @click="refreshType">新书</li>
      <li @click="refreshType">好评</li>
      <li @click="refreshType">完结</li>
      <li @click="refreshType">包月</li>
    </ul>
    <ul class="minor" ref="minor">
      <li class="active" @click="refreshMinor">全部</li>
      <li  @click="refreshMinor($event)" v-for="(item,key)  in minorLists.mins" :key="key">{{item}}</li>
     
    </ul>
    <scroll ref="scroll" :pullup="true" @scrollToEnd='scrollToEnd' :data="lists"  class="books">
      <div>
        <div class="book" @click="bookDetail(item._id)" v-for="(item,key) in lists" :key="key">
          <div class="pic">
            <img :src="item.cover | getUrl" alt="">
          </div>
          <div class="mess">
            <p class="bookname">{{item.title}}</p>
            <p>
              <span class="author">{{item.author}}</span>
              <span class="rule" >|</span>
              <span class="major">{{item.majorCate}}</span>
            </p>
            <p class="shortinfo">{{item.shortIntro}}</p>
            <p class="hot-mess">
              <span class="popularity">{{item.latelyFollower | getPopularity}}</span>人气
              <span class="rule">|</span>
              <span class="collect">{{item.retentionRatio|getCollect}}</span>读者留存

            </p>
          </div>
        </div>
        <p class="loading" v-show="isLoading">正在加载中...</p>

      </div>

    </scroll>
  </div>
</template>

<script>
import axios from "axios";
import Scroll from "@/components/scroll";
import BookTitle from "@/components/bookTitle";

export default {
  data() {
    return {
      minorLists: [],
      lists: [],
      currentGender: "",
      currentType: "hot",
      currentMajor: "",
      currentMinor: "",
      start: 0,
      num: 20,
      isLoading: false,
      isreverse: false
    };
  },
  components: {
    Scroll,
    BookTitle
  },
  watch: {
    lists() {
      this.isLoading = false;
    }
  },
  created() {
    let prop = this.$route.params;
    console.log(prop);
    this.currentGender = prop.gender;
    this.currentMajor = prop.major;
    this.getMinorLists();
    this.getLists();

    //设置scroll高度
  },
  updated() {
    this.setScrollHeight();
  },
  methods: {
    setScrollHeight() {
      let offsetY =
        this.$refs.minor.offsetHeight +
        this.$refs.major.$el.offsetHeight +
        this.$refs.alltype.offsetHeight;
      console.log(this.$refs.minor.offsetHeight);
      this.$refs.scroll.$el.style.top = offsetY + "px";
    },
    refreshType(event) {
      let typeLis = document
        .getElementsByClassName("alltype")[0]
        .getElementsByTagName("li");
      for (let i = 0; i < typeLis.length; i++) {
        if (typeLis[i] == event.currentTarget) {
          for (let j = 0; j < typeLis.length; j++) {
            typeLis[j].className = "";
          }
          typeLis[i].className = "active";
          this.currentType = this.getCurrentType(i);
          console.log(this.currentType);
        }
      }
      this.refresh();
    },
    refreshMinor() {
      let minorLists = document
        .getElementsByClassName("minor")[0]
        .getElementsByTagName("li");
      for (let i = 0; i < minorLists.length; i++) {
        if (minorLists[i] == event.currentTarget) {
          for (let j = 0; j < minorLists.length; j++) {
            minorLists[j].className = "";
          }
          minorLists[i].className = "active";
          if (i == 0) {
            this.currentMinor = "";
          } else {
            this.currentMinor = minorLists[i].textContent;
          }
          console.log(this.currentMinor);
        }
      }
      this.refresh();
    },
    refresh() {
      console.log(this.currentGender);
      axios
        .get(
          `/api/book/by-categories?gender=${this.currentGender}&type=${
            this.currentType
          }&major=${this.currentMajor}&minor=${
            this.currentMinor
          }&start=0&limit=20`
        )
        .then(res => {
          console.log(res.data);
          this.lists = res.data.books;
        });
    },
    getCurrentType(i) {
      let str = "";
      switch (i) {
        case 0:
          str = "hot";
          break;
        case 1:
          str = "new";
          break;
        case 2:
          str = "repulation";
          break;
        case 3:
          str = "over";
          break;
        case 4:
          str = "month";
          break;
      }
      return str;
    },
    getLists() {
      axios
        .get(
          `/api/book/by-categories?gender=${
            this.currentGender
          }&type=hot&major=${this.currentMajor}&minor=&start=${
            this.start
          }&limit=${this.num}`
        )
        .then(res => {
          //http://statics.zhuishushenqi.com//agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2229427%2F2229427_b89561dfb0ff476281e95642b63032e4.jpg%2F
          this.lists = this.lists.concat(res.data.books);
          this.start += this.num;
          // console.log(this.lists);
        });
    },

    scrollToEnd() {
      this.isLoading = true;
      this.getLists();
    },
    getMinorLists() {
      axios.get("/api/cats/lv2").then(res => {
        this.minorLists = res.data[this.currentGender].filter(
          item => item.major == this.currentMajor
        )[0];
        this.currentMinor = this.minorLists.mins[0];
        // console.log(this.minorLists)
        // console.log(this.currentType,this.currentMajor,this.currentMinor);
      });
    },
    bookDetail(id) {
      this.$router.push(`/bookDetail/${id}`);
    },
    back() {
      this.$router.back();
    }
  },
  filters: {
    getUrl(val) {
      return "http://statics.zhuishushenqi.com" + val;
    },
    getCollect(val) {
      return val + "%";
    },
    getPopularity(val) {
      return val / 10000 > 1 ? (val / 10000).toFixed(1) + "万" : val;
    }
  }
};
</script>

<style lang="less" scoped>
.sort-detail {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  .topic {
    padding: 0.1rem;
    background-color: red;
    color: #fff;
    .back {
      float: left;
      font-size: 0.14rem;
      > span {
        vertical-align: middle;
      }
    }
    p.title {
      text-align: center;
      font-size: 0.16rem;
    }
    .index {
      float: right;
    }
  }
  ul.alltype,
  ul.minor {
    padding: 0.1rem;
    border-bottom: 1px solid #ddd;
    > li {
      display: inline;
      padding: 0.1rem;
      color: #666;
      &.active {
        color: red;
      }
    }
  }
  .books {
    position: absolute;
    top: 1.5rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    padding: 0 0.15rem;
    background-color: #eee9b0;
    .loading {
      text-align: center;
      font-size: 0.14rem;
      color: #666;
      padding: 0.15rem 0;
    }

    .book {
      padding: 0.15rem 0;
      display: flex;
      border-bottom: 1px solid #bbb;

      .pic {
        width: 0.7rem;
        height: 0.9rem;
        background-color: #666;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .mess {
        margin-left: 0.2rem;
        flex: 1;
        > p {
          color: #999;
          line-height: 0.2rem;
          margin-top: 0.05rem;
          font-size: 10px;
          .rule {
            padding: 0 0.1rem;
          }
        }
        > p.shortinfo {
          width: 3.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        > p.bookname {
          font-size: 0.14rem;
          color: #000;
          margin-bottom: 0.05rem;
          margin-top: 0;
        }
        > .hot-mess {
          color: #666;
          .popularity,
          .collect {
            color: red;
          }
        }
      }
    }
  }
}
</style>

