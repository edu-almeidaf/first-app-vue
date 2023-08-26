import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import TarefasView from '../views/TarefasView.vue';
import ProjetosView from '../views/ProjetosView.vue';
import FormularioProjetos from "../views/Projetos/FormularioProjetos.vue";
import ListaComponent from '../views/Projetos/ListaComponent.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: TarefasView
  },
  {
    path: '/projetos',
    component: ProjetosView,
    children: [
      {
        path: '',
        name: 'Projetos',
        component: ListaComponent
      },
      {
        path: 'novo',
        name: 'Novo projeto',
        component: FormularioProjetos
      },
      {
        path: ':id',
        name: 'Editar projeto',
        component: FormularioProjetos,
        props: true
      },
    ]
  }
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default roteador;