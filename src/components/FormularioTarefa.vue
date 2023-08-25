<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-7"
        role="form"
        aria-label="Formulário para criação de nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        >
      </div>
      <div class="column">
        <TemporizadorComponent @aoTemporizadorFinalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import TemporizadorComponent from './TemporizadorComponent.vue';

  export default defineComponent({
    name: "FormularioTarefa",
    emits: ['aoSalvarTarefa'],
    components: {
      TemporizadorComponent
    },
    data() {
      return {
        descricao: ''
      }
    },
    methods: {
      finalizarTarefa(tempoDecorrido: number): void {
        this.$emit('aoSalvarTarefa', {
          duracaoEmSegundos: tempoDecorrido,
          descricao: this.descricao
        });
        this.descricao = '';
      }
    }
  });
</script>

<style>
  .formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
  }
</style>