<script>

import { fetchUrl, getAllPokemons, getPokemon, getPokemons, getType, getTypes } from "@/services/httpClient.js";

import { usePokeStore } from "@/store.js";
import PokemonDetailList from "@/components/PokemonDetailList.vue";
import { mapActions, mapState } from "pinia";

export default {
  components: { PokemonDetailList },
  props: {
  },
  data() {
    return {
      //result contient le nom des pokemons affiché
      result: [],
      error: "",
      currentPage: 0,
      //nombre de pokemon affiché par page
      shownPokemon: 5,

      recherche: "",
      rechercheActuel: "",

      //liste des types de pokemon
      filtreType: [],
      filtreTypeActuel: [],

      //liste des pokemons filtré par type pour ne pas avoir à les recharger quand on fait une nouvelle recherche
      typeFilteredPokemonList: [],

    }
  },
  async created() {
    try {
      if (this.pokemonNameList.length < 1000) {
        const allPokemon = await getAllPokemons()
        const namePokemons = allPokemon.results.map((r) => r.name)
        const listTypeApi = await getTypes()
        this.fillTypeList(listTypeApi)
        // console.log( namePokemons.reduce( (ac,cur)=> ac.length>cur.length?ac:cur,""))
        this.typeFilteredPokemonList = namePokemons
        this.fillPokemonNameList(namePokemons)
      }

      this.chargePage()

    } catch (e) {
      this.error = e.message;
    }
  },

  /** 
ce qui déclenche le changement de la liste: 
- changement de page
- nouvelle recherche
- changement de filtre de type
j'ai comme donnée:
- la nouvelle page (ne peut pas être v-model)
- la nouvelle recherche (peut être v-model)
- le nouveau filtre de type (peut être v-model)

donné actuellement appliqué vs données input
*/

  methods: {

    //met à jour l'affichage en fonction de la recherche des filtres et de la page demandé
    async updatePages(page = null) {

      if (this.recherche !== this.rechercheActuel) {
        this.rechercheActuel = this.recherche
      }

      //console.log(this.filtreType)

      if (this.filtreType !== this.filtreTypeActuel && this.filtreType.length > 0) {
        this.filtreTypeActuel = this.filtreType
        this.typeFilteredPokemonList = await this.filtrerType()
      } else if (this.filtreType.length === 0) {
        this.typeFilteredPokemonList = this.pokemonNameList
      }
      console.log(this.rechercheActuel + "-" + this.typeFilteredPokemonList)
      this.rechercher(this.rechercheActuel, this.typeFilteredPokemonList)

      this.chargePage(page !== null ? page : this.inputPage)
    },

    async filtrerType() {
      try {
        let namePokemonsFusionne = []
        let premier = true
        for (const type of this.filtreTypeActuel) {
          const typeDetail = await getType(type)
          const namePokemons = typeDetail.pokemon.map((p) => p.pokemon.name)
          //console.log(namePokemons)
          if (premier) {
            namePokemonsFusionne = namePokemons
            premier = false
          } else {
            namePokemonsFusionne = namePokemonsFusionne.filter((name) => namePokemons.includes(name))
          }
        }
        //console.log(namePokemonsFusionne)
        return namePokemonsFusionne
      } catch (e) {
        this.error = e.message
      }
    },

    //charge la page demandé en fonction des pokemons disponible
    chargePage(page = 0) {
      //console.log(page)
      this.currentPage = page
      //pagination des resultats
      this.result = this.availablePokemonName.slice(this.shownPokemon * page, this.shownPokemon * (page + 1))
      //console.log("chargePage" + this.availablePokemonName)
      this.chargePokemonDetail()
    },

    chargePokemonDetail() {
      for (const name of this.result) {
        if (this.pokemonList[name] === undefined)
          this.chargePokemonIndividuelDetail(name)
      }
      //console.log(this.pokemonList)
    },

    async chargePokemonIndividuelDetail(name) {
      const pokemon = await getPokemon(name)
      this.addPokemon(pokemon)
    },

    ...mapActions(usePokeStore, ['addPokemon']),
    ...mapActions(usePokeStore, ['fillPokemonNameList']),
    ...mapActions(usePokeStore, ['sliceNamePokemon']),
    ...mapActions(usePokeStore, ['rechercher']),
    ...mapActions(usePokeStore, ['fillTypeList']),

  },
  computed: {

    //page demandé par l'utilisateur danq la query, si c'est un nombre valide
    inputPage() {
      const page = Number(this.$route.query.page)
      //la query page si c'est un nombre, et si elle est entre 0 et le max de page
      // if(!isNaN(page) && page >=0 && page <= this.nbPageTotal){
      //   return page-1
      // }
      return !isNaN(page) ? (page >= 0 ? (page <= this.nbPageTotal ? page - 1 : this.nbPageTotal - 1) : 0) : 0
    },
    ...mapState(usePokeStore, ['pokemonList']),
    ...mapState(usePokeStore, ['pokemonNameList']),
    ...mapState(usePokeStore, ['availablePokemonName']),
    ...mapState(usePokeStore, ['listeType']),

    //prochaine page possible
    nextPage() {
      if ((this.currentPage + 1) * this.shownPokemon >= this.availablePokemonName.length) {
        return this.currentPage
      } else {
        return ++this.currentPage
      }
    },
    //page précédente possible
    previousPage() {
      if (this.currentPage - 1 < 0) {
        return this.currentPage
      } else {
        return --this.currentPage
      }
    },

    nbPageTotal() {
      return Math.ceil(this.availablePokemonName.length / this.shownPokemon)
    },
    updateTypeList(type) {
      if (!this.filtreType.contains(type)) {
        this.filtreType.push(type)
      }
    },
  },

  watch: {
    //'$route.query'() {
    //  this.recherche = (this.$route.query.recherche !== undefined) ? this.$route.query.recherche : ""
    //  this.updatePages()
    //},
  }
}

</script>

<template>
  <div id="page">

    <nav id="sidenav">
      <h2> Filtre par type</h2>
      <div v-for="type in listeType.results" :key="type">
        <label>
          <input type="checkbox" :value="type.name" v-model="filtreType">
          {{ type.name }}
        </label>
      </div>
    </nav>

    <div id="pokemon-list">
      <nav>
        <button @click="chargePage(previousPage)">Previous page</button>
        <button @click="chargePage(nextPage)">Next page</button>
      </nav>
      <p>Page: {{ currentPage + 1 }}/{{ nbPageTotal }}</p>



      <div id="recherche">
        <label for="barreRecherche">Recherche pokemon</label>
        <input id="barreRecherche" v-model="recherche" placeholder="Recherche" type="text" @change="updatePages()">
        <button @click="updatePages()">Rechercher</button>
      </div>
      <div id="list">
        <span v-for="namePoke in result" v-if="result.length > 0" class="elementPokemon">
          <router-link :to="{ name: 'pokemon', params: { name: namePoke } }" class="nomPokemon">
            <PokemonDetailList :name="namePoke"></PokemonDetailList>
          </router-link>
        </span>
        <span v-else>
          <p>Aucun pokemon trouvé</p>
        </span>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
$maxwidth: 49.9em;

#page {
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: $maxwidth) {
    flex-direction: column;

    #sidenav {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}

#sidenav {
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.3em;

    input {
      margin-right: 0.4em;
      width: 2em;
      height: 2em;
    }
  }
}

#pokemon-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

#pokemon-list>* {
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: 0.5em;
  padding-right: 0.5em;
}

nav {
  display: flex;
  flex-direction: row;
}


#list {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-flow: wrap;
  width: 50em;

  @media (max-width: $maxwidth) {
    width: 100%;
  }
}

.elementPokemon {
  box-sizing: border-box;
  width: 9em;
  height: fit-content;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;

}
</style>
