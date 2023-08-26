<template>
  <FormularioTarefa @aoSalvarTarefa="salvarTarefa"/>
  <div class="lista">
    <BoxComponent v-if="semTarefas">
      Nenhuma tarefa cadastrada.
    </BoxComponent>
    <div class="field">
      <p class="control has-control-left">
        <input
          type="text"
          class="input"
          placeholder="Pesquise pelo nome"
          v-model="filtro"
        >
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <TarefaComponent
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <ModalComponent :mostrar="tarefaSelecionada !== null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>

      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaTarefa" class="label">Descrição</label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada?.descricao"
            id="descricaoDaTarefa"
          />
        </div>
      </template>

      <template v-slot:rodape>
        <button @click="alterarTarefa" class="button is-success">
          Salvar alterações
        </button>
        <button class="button" @click="fecharModal">Cancelar</button>
      </template>
    </ModalComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaComponent from '../components/TarefaComponent.vue';
import BoxComponent from '../components/BoxComponent.vue';
import ModalComponent from "../components/ModalComponent.vue";
import { ITarefa } from '@/interfaces/ITarefa';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';


export default defineComponent({
  name: 'TarefasView',
  components: {
    FormularioTarefa,
    TarefaComponent,
    BoxComponent,
    ModalComponent
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  computed: {
    semTarefas(): boolean {
      return this.tarefas.length === 0;
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
        this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
          .then(() => this.fecharModal());
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const filtro = ref("");

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      filtro,
    };
  },
});
</script>