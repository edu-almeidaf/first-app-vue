<template>
  <BoxComponent>
    <div class="columns">
      <div class="column is-7">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column">
        <CronometroComponent :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
      </div>
    </div>
  </BoxComponent>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue';
  import CronometroComponent from './CronometroComponent.vue';
  import { ITarefa } from './interfaces/ITarefa';
  import BoxComponent from './BoxComponent.vue';

  export default defineComponent({
    name: 'TarefaComponent',
    components: {
      CronometroComponent,
      BoxComponent
    },
    props: {
      tarefa: {
        type: Object as PropType<ITarefa>,
        required: true
      }
    },
    computed: {
      tempoGasto(): string {
        return new Date(this.tarefa.duracaoEmSegundos * 1000)
          .toISOString()
          .substring(11, 8)
      }
    }
  });
</script>../interfaces/ITarefa