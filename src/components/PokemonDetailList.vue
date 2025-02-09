<script>
import { mapActions, mapState } from "pinia";
import { usePokeStore } from "@/store.js";
import { usePanierStore } from "@/store/panierStore";

export default {
  name: "PokemonDetailList",
  props: {
    name: String
  },
  computed: {
    ...mapState(usePokeStore, ['pokemonList']),
    ...mapState(usePanierStore, ['panier']),
    pokemon() {
      return this.pokemonList[this.name] !== undefined ? this.pokemonList[this.name] : null
    }
  },
  methods: {
    ...mapActions(usePanierStore, ['addPokemonToPanier']),
    ...mapActions(usePanierStore, ['removePokemonFromPanier']),
  }
}
</script>

<template>
  <div class="miniCartePokemon">
    <router-link :to="{ name: 'pokemon', params: { name: this.name } }" class="nomPokemon">
      <div class="nameCartePokemon">{{ name }}</div>
      <div v-if="pokemon" class="detailPokemon">
        <p>Prix: {{ pokemon.base_experience }}</p>
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name + ' Image'">
      </div>
    </router-link>

    <div class="btnsPanier">
      <button v-if="panier[name] === undefined" @click="addPokemonToPanier(name)">Ajouter au panier</button>
      <div v-else>
        <button @click="removePokemonFromPanier(name)">-</button>
        <span>{{ panier[name] }}</span>
        <button @click="addPokemonToPanier(name)">+</button>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.nomPokemon {
  width: inherit;
  text-transform: capitalize;
}

.btnsPanier {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: inherit;

  button {

    background-color: white;
    border-radius: 0.4em;
    margin: 0.2em;
    border: 1px solid dimgray;

    &:active {
      transform: translate(4px, 4px);
    }
  }
}

.nameCartePokemon {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: inherit;
}

.miniCartePokemon {
  // border: 1px solid black;
  // border-radius: 0.3em;
  border-radius: 15px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: fit-content;
  width: inherit;
}

.detailPokemon {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: inherit;
}

img {
  width: inherit;
}
</style>
