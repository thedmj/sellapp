// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router"
import resource from "vue-resource";
import goods from "./components/goods.vue";
import seller from "./components/seller.vue";
import ratings from "./components/ratings.vue";
Vue.use(VueRouter);
Vue.use(resource);


Vue.config.productionTip = false

var router = new VueRouter({
  routes:[
    {path:"/goods",component:goods},
    {path:"/seller",component:seller},
    {path:"/ratings",component:ratings}
  ]
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});
router.push("/goods");
