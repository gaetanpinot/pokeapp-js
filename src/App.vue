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
      <RouterLink to="/">Liste des pokémons</RouterLink>
      <PanierStatus></PanierStatus>
    </header>
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
