<template>
  <div class="reading " :class="mode | convertMode" >
    <!-- 头部菜单 -->
     <transition name="header">
        <mt-header title="圣墟" class="reading-header" v-show="isControlShow">
          <router-link to="/" slot="left">
            <mt-button icon="back" @click="back">返回</mt-button>
          </router-link>
          <mt-button icon=" " class="iconfont icon-toggle" slot="right"></mt-button>
        </mt-header>
      </transition>
    
    <!-- 页面目录 -->
    <transition name="catalogue" mode="out-in">
      <div class="catalog" v-show="isCatalogShow">
        <h1 class="title">圣墟</h1>
        <p>
          <span>目录</span>
          <span class="reverse" @click="reverseLog">{{getSortText}}</span>
        </p>
        <scroll class="log-lists" ref="catalogue" :listenScroll="true">
          <ul>
            <li v-for="(item,key) in chapterLists" @click="goTo(key)" :key="key">{{key | getKey(isreverse,chapterLists.length)}}-{{item.title}}</li>
          </ul>
        </scroll>
        <loading v-show="isLogLoading"></loading>
      </div>
    </transition>
    <!-- 页面主体 -->
    <scroll class="main" ref="scroll" :pulldown="true"   :pullup="true"  @scrollToEnd='scrollToEnd' @pulldown='pulldown' :data="contentLists" :listenScroll="true">
      <div class="contents" ref="contents"  @click="bodyClick">
        <p v-show="loadingMore">正在努力加载中...</p>
        <div class="item" ref="item"  v-for="(item,key) in contentLists" :key="key">
          <h1 :style="setFontSize">{{item.title}}</h1>
          <div v-html="$options.filters.convertContext(item.cpContent)" :style="setFontSize" class="context"></div>
        </div>
        <p v-show="loadingMore">正在努力加载中...</p>
      </div>
    </scroll>
    <!-- 底部控制菜单 -->
    <transition name="footer">
      <div class="reading-footer" v-show="isControlShow">
        <mt-progress :value="fontSize" >
          <div slot="start"  class="drop" @click="small">Aa-</div>
          <div slot="end" @click="large" class="up">Aa+</div>
        </mt-progress>
        <ul class="mode" ref="mode">
          <li class="active" @click="forDefault">默认</li>
          <li @click="forNight">夜间</li>
          <li @click="forEye">护眼</li>
        </ul>
        <div class="control">
          <div class="prev" @click.stop="prevChapter" >上一章</div>
          <div class="switch-log" @click.stop="openCatalog" >目录</div>
          <div class="next" @click.stop="nextChapter" >下一章</div>
        </div>
      </div>
    </transition>
    
   
    <loading  v-show="isLoading"></loading>

  </div>
</template>

<script>
import axios from "axios";
import Scroll from "@/components/scroll";
import Loading from "@/components/loading";
import "mint-ui/lib/style.css";
import "@/assets/font/iconfont.css";

export default {
  data() {
    return {
      chapterId: 0,
      bookId: 0,
      chapterLists: [],
      sourceId: 0,
      lastIndex: 0,
      firstIndex: 0,
      initIndex: 0,
      activeIndex: -1,
      contentLists: [],
      loadingMore: false,
      rangeValue: 25,
      fontSize: 20,
      isControlShow: false,
      isreverse: false,
      isLoading: true,
      isCatalogShow: false,
      mode: 0,
      isLogLoading: true
    };
  },
  components: {
    Scroll,
    Loading
  },
  created() {
    this.bookId = this.$route.params.id;
    this.getLists();
  },
  computed: {
    getSortText() {
      return this.isreverse ? "正序" : "倒序";
    },
    setFontSize() {
      let fontSize = 0.2 + this.fontSize / 1000;
      return `font-size:${fontSize}rem`;
    }
  },
  methods: {
    //打开目录
    openCatalog() {
      this.isCatalogShow = true;
      this.isControlShow = false;
      console.log(this.$refs.catalogue);
      this.$nextTick(() => {
        this.$refs.catalogue.refresh();
      });
    },
    getLists() {
      this.isLoading = true;
      //获取小说源（传递bookId）
      axios.get(`/api/btoc?view=summary&book=${this.bookId}`).then(res => {
        this.sourceId = res.data[0]._id;
        //获取小说章节（根据源id）
        axios
          .get(`/im/book-chapters/${this.sourceId}?view=chapters`)
          .then(res => {
            this.isLogLoading = false;
            this.chapterLists = res.data.chapters;
            //获取小说当前内容
            axios
              .get(
                `/im/chapters/${encodeURIComponent(
                  this.chapterLists[this.initIndex].link
                )}`
              )
              .then(res => {
                this.isLoading = false;

                this.chapterId = res.data.chapter.id;
                this.contentLists.push(res.data.chapter);
                this.activeIndex += 1;
              });
          });
      });
    },
    // 跳转到当前目录
    goTo(key) {
      this.isCatalogShow = false;
      this.init(key);
    },
    //反转目录
    reverseLog() {
      this.isreverse = !this.isreverse;
      this.chapterLists.reverse();
    },

    bodyClick() {
      this.isControlShow = !this.isControlShow;
      if (this.isCatalogShow) {
        this.isCatalogShow = false;
      }
    },
    pulldown() {
      this.prevChapter();
    },
    //上拉事件
    scrollToEnd() {
      this.nextChapter();
    },
    //返回
    back() {
      this.$router.back();
    },
    //默认模式
    forDefault() {
      this.mode = 0;
      this.setModeStyle();
    },
    //夜间模式
    forNight() {
      this.mode = 1;
      this.setModeStyle();
    },
    //护眼模式
    forEye() {
      this.mode = 2;
      this.setModeStyle();
    },
    // 更改阅读模式样式
    setModeStyle() {
      let lis = this.$refs.mode.getElementsByTagName("li");
      console.log(lis);
      for (let i = 0; i < lis.length; i++) {
        lis[i].className = "";
      }
      lis[this.mode].className = "active";
    },
    //字体变大
    large() {
      this.fontSize = this.fontSize + 20 > 100 ? 100 : this.fontSize + 20;
    },
    //字体变小
    small() {
      this.fontSize = this.fontSize - 20 < 0 ? 0 : this.fontSize - 20;
    },
    //下一章
    nextChapter() {
      this.activeIndex += 1;
      if (this.activeIndex > this.contentLists.length - 1) {
        this.activeIndex = this.contentLists.length;
        if (++this.lastIndex >= this.chapterLists.length - 1) {
          this.lastIndex = this.chapterLists.length - 1;
          return;
        }
        this.loadingMore = true;

        axios
          .get(
            `/im/chapters/${encodeURIComponent(
              this.chapterLists[this.lastIndex].link
            )}`
          )
          .then(res => {
            this.loadingMore = false;
            this.chapterId = res.data.chapter.id;
            this.contentLists.push(res.data.chapter);
            this.$nextTick(() => {
              let lis = this.$refs.item;
              this.$refs.scroll.scrollToElement(lis[this.activeIndex]);
            });
          });
      } else {
        let lis = this.$refs.item;
        this.$refs.scroll.scrollToElement(lis[this.activeIndex]);
      }
    },
    //上一章
    prevChapter() {
      this.activeIndex -= 1;
      let questIndex;
      if (this.activeIndex < 0) {
        this.activeIndex = 0;
        if (--this.firstIndex <= 0) {
          this.firstIndex = 0;
          console.log(this.firstIndex);
          return;
        }
        this.loadingMore = true;

        axios
          .get(
            `/im/chapters/${encodeURIComponent(
              this.chapterLists[this.firstIndex].link
            )}`
          )
          .then(res => {
            this.loadingMore = false;
            this.chapterId = res.data.chapter.id;
            this.contentLists.unshift(res.data.chapter);
            this.$nextTick(() => {
              let lis = this.$refs.item;
              this.$refs.scroll.scrollToElement(lis[this.activeIndex]);
            });
          });
      } else {
        let lis = this.$refs.item;
        this.$refs.scroll.scrollToElement(lis[this.activeIndex]);
      }
    },
    init(index) {
      this.contentLists = [];
      this.lastIndex = this.firstIndex = this.initIndex = index;
      this.activeIndex = -1;
      this.getLists();
    }
  },
  filters: {
    getKey(key, isreverse, len) {
      return isreverse ? len - key : key;
    },
    convertContext(val) {
      val = val.replace(/\n/g, "<br />");
      return val;
    },
    convertMode(val) {
      let str = "";
      switch (val) {
        case 0:
          str = "";
          break;
        case 1:
          str = "night";
          break;
        case 2:
          str = "protect-eye";
          break;
      }
      return str;
    }
  }
};
</script>

<style lang="less" scoped>
// 头部动画
& {
  .header-leave-active {
    animation: headerleave 0.3s;
  }
  .header-enter-active {
    animation: headerShow 0.3s;
  }
  @keyframes headerShow {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes headerleave {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }
}
// 底部动画
& {
  .footer-leave-active {
    animation: footerLeave 0.3s;
  }
  .footer-enter-active {
    animation: footerShow 0.3s;
  }
  @keyframes footerShow {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes footerLeave {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
}
// 左侧目录动画
& {
  .catalogue-leave-active {
    animation: hide 0.1s ease-in;
  }
  .catalogue-enter-active {
    animation: show 0.1s ease-in;
  }
  @keyframes hide {
    0% {
      left: 0;
    }
    100% {
      left: -100%;
    }
  }
  @keyframes show {
    0% {
      left: -100%;
    }
    100% {
      left: 0;
    }
  }
}

.reading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #eee6dd;

  .reading-header {
    background: #555;
    opacity: 0.9;
    .icon-toggle {
      font-size: 0.3rem;
    }
  }
  .main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    overflow: hidden;
    .contents {
      .item {
        padding: 0.2rem;
        > h1 {
          font-size: 0.24rem;
          font-weight: 400;
        }
        .context {
          line-height: 0.36rem;
          font-size: 0.2rem;
          color: #333;
          margin-top: 0.2rem;
        }
      }
      > p {
        text-align: center;
      }
    }
  }
  .catalog {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
    width: 80%;
    background-color: #eee;
    > h1 {
      margin: 0.15rem 0 0.15rem 0.15rem;
      font-size: 0.16rem;
      font-weight: normal;
    }
    > p {
      padding: 0 0 0.15rem 0.15rem;
      font-size: 0.14rem;
      color: #666;
      border-bottom: 1px solid #ddd;
      .reverse {
        float: right;
        margin-right: 0.2rem;
        color: #999;
      }
    }
    .log-lists {
      position: absolute;
      top: 1rem;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      > ul {
        padding-left: 0.15rem;
        > li {
          padding: 0.15rem 0;
          color: #999;
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
  .reading-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    background-color: #555;
    opacity: 0.9;
    padding: 0.2rem;

    /deep/ .mt-progress {
      .mt-progress-content {
        margin: 0 0.2rem;
      }
      .drop,
      .up {
        color: #fff;
        font-size: 0.24rem;
      }
    }
    .mode {
      display: flex;
      margin: 0.1rem 0;
      > li {
        flex: 1;
        padding: 0.1rem 0;
        color: #fff;
        font-size: 0.18rem;
        text-align: center;
        &.active {
          color: red;
          border: 1px solid red;
        }
      }
    }
    .control {
      display: flex;
      .next,
      .prev,
      .switch-log {
        flex: 1;
        text-align: center;
        color: #fff;
        font-size: 0.2rem;
      }
      .switch-log {
        color: #999;
      }
    }
  }
}

//护眼模式
.night {
  background-color: #333;
  .main {
    .contents {
      .item {
        > h1 {
          color: #eee;
        }
        .context {
          color: #eee;
        }
      }
    }
  }
  .reading-header {
    opacity: 1;
  }
  .reading-footer {
    opacity: 1;
  }
}
.protect-eye {
  background-color: #b8cd8d;
  .main {
    .contents {
      .item {
        > h1 {
          // color: #eee;
        }
        .context {
          // color: #eee;
        }
      }
    }
  }
  .reading-header {
    opacity: 1;
  }
  .reading-footer {
    opacity: 1;
  }
}
</style>
