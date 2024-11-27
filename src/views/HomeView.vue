<template>
  <div class="container mt-5">
    <div class="row align-items-start">
      <!-- Aside para géneros -->
      <aside class="col-md-3 aside-genres">
        <h5 class="aside-title">Géneros</h5>
        <ul class="list-unstyled">
          <li v-for="genre in genres" :key="genre" class="genre-item">
            <input
              type="checkbox"
              :id="genre"
              :value="genre"
              @change="toggleGenre(genre)"
              :checked="selectedGenres.includes(genre)"
            />
            <label :for="genre" class="genre-label">{{ genre }}</label>
          </li>
        </ul>
      </aside>

      <!-- Lista de juegos -->
      <div class="col-md-9">
        <h1 class="text-center mb-4">TOP Juegos All Time Long</h1>
        <div class="row">
          <div v-for="game in filteredGames" :key="game.id" class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
              <img
                :src="game.background_image"
                alt="Imagen del juego"
                class="card-img-top fixed-size-image"
                v-if="game.background_image"
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title text-center">{{ game.name }}</h5>
                <p class="card-text text-center mb-1"><strong>Rating:</strong> {{ game.rating }} / 5</p>
                <div class="mt-auto d-flex justify-content-center">
                  <button class="btn btn-primary mx-2" @click="goToDetails(game.id)">Ver detalles</button>
                  <button class="btn btn-outline-secondary mx-2" @click="goToOpinion(game.name)">Opinar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    games() {
      return this.$store.state.games;
    },
    filteredGames() {
      if (this.selectedGenres.length === 0) return this.games;
      return this.games.filter((game) =>
        game.genres.some((genre) => this.selectedGenres.includes(genre.name))
      );
    },
  },
  data() {
    return {
      genres: ["Action", "RPG", "Shooter", "Puzzle", "Fighting", "Adventure", "Indie", "Platformer"],
      selectedGenres: [],
    };
  },
  methods: {
    toggleGenre(genre) {
      if (this.selectedGenres.includes(genre)) {
        this.selectedGenres = this.selectedGenres.filter((g) => g !== genre);
      } else {
        this.selectedGenres.push(genre);
      }
    },
    goToDetails(gameId) {
      this.$router.push({ name: "About", params: { id: gameId } });
    },
    goToOpinion(gameName) {
      this.$router.push({ name: "Opinion", params: { gameName: gameName } });
    },
  },
  mounted() {
    this.$store.dispatch("fetchGames");
  },
};
</script>

<style scoped>
/* Fondo global */
body {
  background-image: url('/src/assets/about-background.png'); /* Cambia esto por la ruta real de tu imagen */
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Fondo fijo al hacer scroll */
  background-repeat: no-repeat;
  color: white;
}

/* Contenedor principal */
.container {
  background-color: rgba(0, 0, 0, 0.695); /* Fondo semitransparente */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

/* Aside Géneros */
.aside-genres {
  background-color: rgba(54, 53, 53, 0.496); /* Fondo oscuro con transparencia */
  padding: 15px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-top: 65px; /* Elimina el margen superior */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Asegura que los elementos comiencen en la parte superior */
}

.aside-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.8);
  margin-top: 10px;
  margin-bottom: 15px;
  text-align: center;
}

.genre-item {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.genre-label {
  margin-left: 10px;
  font-size: 1rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

input[type="checkbox"] {
  accent-color: white;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* Lista de Juegos */
.fixed-size-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card {
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-outline-secondary {
  color: #6c757d;
  border-color: #6c757d;
}

.btn-outline-secondary:hover {
  background-color: #6c757d;
  color: #ffffff;
}

h1 {
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
}
</style>
