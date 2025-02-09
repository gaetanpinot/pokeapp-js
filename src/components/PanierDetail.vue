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
  <div id="panier">
    <div id="listePanier">
      <div class="pokemonPanier" v-for="(nombre, name) in panier">
        <div v-if="pokemonList[name] !== undefined">
          <img :src="pokemonList[name].sprites.front_default" alt="pokemon" class="imgPokemonPanier">
          <router-link :to="{ name: 'pokemon', params: { name: pokemonList[name].name } }" class="nomPkmn"> {{
            this.pokemonList[name].name }} </router-link>
          <span class="prixPkmn"> {{ nombre }} x {{ this.pokemonList[name].base_experience }} €</span>
          <button @click="addPokemonToPanier(name)">+</button>
          <button @click="removePokemonFromPanier(name)">-</button>
        </div>
        <div v-else>
          <p>Chargement...</p>
        </div>
      </div>
    </div>
    Total: {{ total }} €
    <router-link :to="{ name: 'confirmation' }">Confirmer la commande</router-link>
  </div>
</template>


<style scoped lang="scss">
#panier {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  #listePanier {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}

$sizeBtn: 1.5em;

.pokemonPanier {
  border-radius: 0.5em;
  margin-bottom: 1em;

  background-color: rgba(0, 0, 0, 0.15);

  &:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  width: 30em;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 30em) {
      flex-direction: column;
      align-items: center;
    }

    .nomPkmn {
      width: 10em;
      text-align: center;
    }

    .prixPkmn {
      width: 10em;
      text-align: center;
    }

    button {
      width: $sizeBtn;
      height: $sizeBtn;
      font-size: 2em;
      text-align: center;
      font-weight: bold;
      background-color: white;
      border-radius: 0.4em;
      margin: 0.2em;
      border: 1px solid dimgray;

      &:active {
        transform: translate(4px, 4px);
      }
    }
  }
}

.imgPokemonPanier {
  width: 7em;
}
</style>
