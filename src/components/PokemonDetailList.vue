<script>
import { mapState } from "pinia";
import { usePokeStore } from "@/store.js";

export default {
  name: "PokemonDetailList",
  props: {
    name: String
  },
  computed: {
    ...mapState(usePokeStore, ['pokemonList']),
    pokemon() {
      return this.pokemonList[this.name] !== undefined ? this.pokemonList[this.name] : null
    }
  }
}
</script>

<template>
  <div class="miniCartePokemon">
    <p class="nameCartePokemon">{{ name }}</p>
    <div v-if="pokemon" class="detailPokemon">
      <p>Prix: {{ pokemon.base_experience }}</p>
      <img :src="pokemon.sprites.front_default" :alt="pokemon.name + ' Image'">
    </div>
  </div>
</template>

<style scoped>
.nameCartePokemon {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.miniCartePokemon {
  border: 1px solid black;
  border-radius: 0.3em;
  margin: 0.25em 0.5em 0.25em 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: fit-content;
}

.detailPokemon {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

img {
  width: 100%;
}
</style>
