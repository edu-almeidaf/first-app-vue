<template>
  <FormularioTarefa @aoSalvarTarefa="salvarTarefa"/>
  <div class="lista">
    <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
    <BoxComponent v-if="listaEstaVazia">
      Nenhuma tarefa cadastrada.
    </BoxComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaComponent from '../components/TarefaComponent.vue';
import BoxComponent from '../components/BoxComponent.vue';
import { ITarefa } from '../components/interfaces/ITarefa';

export default defineComponent({
  name: 'App',
  components: {
    FormularioTarefa,
    TarefaComponent,
    BoxComponent
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    },
  },
});
</script>
