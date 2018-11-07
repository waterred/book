import Vue from "vue";
import Router from "vue-router";
import Recommend from "@/view/recommend";
import Rank from "@/view/rank";
import Sort from "@/view/sort";
import Vip from "@/view/vip";
import SortDetail from "@/view/sort/detail.vue";
import bookDetail from "@/components/bookDetail";
import Catalogue from "@/components/catalogue";
import Reading from "@/components/reading";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Recommend
    },
    {
      path: "/recommend",
      name: "",
      component: Recommend
    },
    {
      path: "/vip",
      component: Vip
    },
    {
      path: "/bookDetail/:id",
      component: bookDetail
    },
    {
      path: "/sort",
      component: Sort,
      children: [
        {
          path: "detail/:gender/:major",
          component: SortDetail
        }
      ]
    },
    {
      path: "/rank",
      component: Rank
    },
    {
      path: "/source/:id",
      component: Catalogue
    },
    {
      path: "/reading/:id",
      component: Reading
    }
  ]
});
