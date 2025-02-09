<script>
import PanierStatus from "@/components/PanierStatus.vue";
export default {
  components: { PanierStatus },
  name: "App",

}
</script>

<template>
  <div id="app-pokemon">
    <header>
      <h1>PokeApp</h1>
      <RouterLink class="lien" to="/">Liste des pokémons</RouterLink>
      <PanierStatus class="lien"></PanierStatus>
    </header>
    <RouterView></RouterView>
  </div>
</template>

<style lang="scss" scoped>
#app-pokemon {
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    .lien {
      font-size: 1.5em;
      margin-right: 1em;
    }
  }
}
</style>
