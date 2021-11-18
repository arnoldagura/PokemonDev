<template>
  <div class="pokemon-list">
    <pokemon-list> </pokemon-list>
  </div>
</template>

<script>
import PokemonList from "@/components/PokemonList.vue";

export default {
  components: {
    PokemonList,
  },

  data() {
    return {
      user: "",
      users: [],
    };
  },
  methods: {
    thePokemon(pokemon) {
      this.modalOpen = true;
      this.pokemonData = pokemon;
    },
  },
  mounted() {
    if (localStorage.activeUser) {
      let lsUsers = localStorage.users;
      this.users = JSON.parse(lsUsers);

      let activeUser = localStorage.activeUser;
      this.user = JSON.parse(activeUser);
    }
  },
};
</script>

<style></style>
