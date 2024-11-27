<template>
  <div class="container mt-5 text-center">
    <h1>Detalles del Juego</h1>
    <div v-if="game" class="card mx-auto mt-4" style="width: 50%;">
      <img :src="game.background_image" alt="Imagen del juego" class="card-img-top fixed-size-image" />
      <div class="card-body">
        <h2 class="card-title">{{ game.name }}</h2>
        <p class="card-text">
          <strong>Descripción:</strong> {{ filteredDescription }}
        </p>
        <p class="card-text"><strong>Género:</strong> {{ game.genres.map(genre => genre.name).join(', ') }}</p>
        <p class="card-text"><strong>Lanzamiento:</strong> {{ game.released }}</p>
        <p class="card-text"><strong>Rating:</strong> {{ game.rating }} / 5</p>
        <button class="btn btn-secondary mt-3" @click="goBack">Volver</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      game: null,
    };
  },
  computed: {
    filteredDescription() {
      if (!this.game || !this.game.description_raw) return '';
      
      let englishDescription = this.game.description_raw;
      
      englishDescription = englishDescription.replace(/(?:Español|Spanish|Descripción en español):?[\s\S]*$/i, '');

      return englishDescription.trim();
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Home' });
    },
    fetchGameDetails() {
      axios.get(`https://api.rawg.io/api/games/${this.id}?key=c210308e1b5c44cd800e4ae82647b2b4`)
        .then(response => {
          this.game = response.data;
        })
        .catch(error => {
          console.error("Error al obtener los detalles del juego:", error);
        });
    },
  },
  mounted() {
    this.fetchGameDetails();
  },
};
</script>

<style scoped>
.fixed-size-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
</style>
