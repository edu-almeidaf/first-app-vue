<template>
  <FormularioTarefa @aoSalvarTarefa="salvarTarefa"/>
  <div class="lista">
    <BoxComponent v-if="listaEstaVazia">
      Nenhuma tarefa cadastrada.
    </BoxComponent>
    <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaComponent from '../components/TarefaComponent.vue';
import BoxComponent from '../components/BoxComponent.vue';
import { ITarefa } from '@/interfaces/ITarefa';

export default defineComponent({
  name: 'TarefasView',
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
    salvarTarefa(tarefa: ITarefa): void {
      this.tarefas.push(tarefa);
    },
  },
});
</script>
../interfaces/ITarefa