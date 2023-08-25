import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import TarefasView from '../views/TarefasView.vue';
import ProjetosView from '../views/ProjetosView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: TarefasView
  },
  {
    path: '/projetos',
    name: 'Projetos',
    component: ProjetosView
  }
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default roteador;