<script>
import { usePanierStore } from '@/store/panierStore';
import { mapActions, mapState } from 'pinia';
import PokemonDetailList from './PokemonDetailList.vue';
import { usePokeStore } from '@/store';

export default {
  name: "PanierDetail",
  components: {
    PokemonDetailList
  },
  props: {
  },
  computed: {
    ...mapState(usePanierStore, ['panier']),
    ...mapState(usePanierStore, ['nbObjetPanier']),
    ...mapState(usePokeStore, ['pokemonList']),
    ...mapState(usePanierStore, ['total']),
  },
  methods: {
    ...mapActions(usePanierStore, ['addPokemonToPanier']),
    ...mapActions(usePanierStore, ['removePokemonFromPanier']),
  }
}

</script>

<template>
  <div v-for="(nombre, name) in panier">
    <span> {{ this.pokemonList[name].name }} </span>
    {{ nombre }}<button @click="addPokemonToPanier(name)">+</button><button
      @click="removePokemonFromPanier(name)">-</button>
  </div>
  Total : {{ total }} pommes de terres (livré en cagette de 10)

</template>


<style scoped lang=scss>
.pokemonPanier {
  width: 10em;
}
</style>
