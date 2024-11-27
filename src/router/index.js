import Vue from 'vue';
import Router from 'vue-router';

const HomeView = () => import('../views/HomeView.vue');
const AboutView = () => import('../views/AboutView.vue');
const OpinionView = () => import('../views/OpinionView.vue');
const AdminView = () => import('../views/AdminView.vue');
const NotFound = () => import('../views/NotFound.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/about/:id', name: 'About', component: AboutView, props: true },
    { path: '/opinion/:gameName', name: 'Opinion', component: OpinionView, props: true },
    { path: '/admin', name: 'Admin', component: AdminView },
    { path: '*', name: 'NotFound', component: NotFound },
  ],
});
