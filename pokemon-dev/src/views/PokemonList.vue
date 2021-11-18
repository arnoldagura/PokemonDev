<template>
  <div class="pokemon-list">
    <pokemon-list> </pokemon-list>
    <search-input @searching="filter = $event"></search-input>
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
      url: "https://api.pokemontcg.io/v1/cards",
      modalOpen: false,
      pokemonData: {},
      currentPage: 1,
      perPage: 20,
      filter: "",
    };
  },
  methods: {
    thePokemon(pokemon) {
      this.modalOpen = true;
      this.pokemonData = pokemon;
    },
    onPageClick(event) {
      this.currentPage = event;
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
