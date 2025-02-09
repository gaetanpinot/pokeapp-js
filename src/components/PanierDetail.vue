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
  <div class="pokemonPanier" v-for="(nombre, name) in panier">
    <img :src="pokemonList[name].sprites.front_default" alt="pokemon" class="imgPokemonPanier">
    <span class="nomPkmn"> {{ this.pokemonList[name].name }} </span>
    <span class="prixPkmn"> {{ nombre }} x {{ this.pokemonList[name].base_experience }} €</span>
    <button @click="addPokemonToPanier(name)">+</button>
    <button @click="removePokemonFromPanier(name)">-</button>
  </div>
  Total: {{ total }} €
  <router-link :to="{ name: 'confirmation' }">Confirmer la commande</router-link>
</template>


<style scoped lang=scss>
$sizeBtn: 1.5em;

.pokemonPanier {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 30%;

  .nomPkmn {
    width: 10em;
  }

  .prixPkmn {
    width: 10em;
  }

  button {
    width: $sizeBtn;
    height: $sizeBtn;
    font-size: 2em;
    text-align: center;
    font-weight: bold;
  }
}

.imgPokemonPanier {
  width: 7em;
}
</style>
