<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-5"
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
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TemporizadorComponent @aoTemporizadorFinalizado="salvarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import TemporizadorComponent from './TemporizadorComponent.vue';
  import { useStore } from '@/store';

  export default defineComponent({
    name: "FormularioTarefa",
    emits: ['aoSalvarTarefa'],
    components: {
      TemporizadorComponent
    },
    data() {
      return {
        descricao: '',
        idProjeto: '',
      }
    },
    methods: {
      salvarTarefa(tempoDecorrido: number): void {
        this.$emit('aoSalvarTarefa', {
          duracaoEmSegundos: tempoDecorrido,
          descricao: this.descricao,
          projeto: this.projetos.find((proj) => proj.id === this.idProjeto),
        });
        this.descricao = '';
      }
    },
    setup() {
      const store = useStore();
      return {
        projetos: computed(() => store.state.projetos)
      }
    }
  });
</script>

<style>
  .box {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
  }
</style>