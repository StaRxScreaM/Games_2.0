<template>
  <div class="container mt-5 opinion-section">
    <!-- Título del juego -->
    <h1 class="game-title mb-4">Opiniones para: <span class="game-name">{{ gameName }}</span></h1>

    <!-- Formulario de opinión -->
    <div v-if="user.name && user.surname" class="opinion-form mb-5">
      <p class="user-info">Opinando como: <strong>{{ user.name }} {{ user.surname }}</strong></p>
      <textarea
        v-model="newOpinion.content"
        placeholder="Escribe tu opinión aquí..."
        class="form-control opinion-textarea mb-3"
      ></textarea>
      <button
        class="btn btn-primary btn-lg w-100"
        @click="addOpinion"
      >
        {{ isEditing ? 'Actualizar Opinión' : 'Agregar Opinión' }}
      </button>
    </div>
    <p v-else class="alert alert-warning text-center">
      Por favor, crea un perfil en la sección de administración para opinar.
    </p>

    <!-- Listado de opiniones -->
    <div class="opinions-list mt-4">
      <h2 class="section-title">Opiniones</h2>
      <div v-if="currentGameOpinions && currentGameOpinions.length">
        <div
          v-for="(opinion, index) in currentGameOpinions"
          :key="index"
          class="card opinion-card my-3"
        >
          <div class="card-body">
            <h5 class="card-title">Opinión de: {{ opinion.author }}</h5>
            <p class="card-text">{{ opinion.content }}</p>
            <div class="d-flex justify-content-end mt-3">
              <button
                class="btn btn-warning btn-sm mx-2"
                @click="editOpinion(index)"
              >
                Editar
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="deleteOpinion(index)"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="alert alert-danger text-center">
        No existen opiniones para este juego.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['gameName'],
  computed: {
    user() {
      return this.$store.state.user;
    },
    currentGameOpinions() {
      return this.$store.state.opinions[this.gameName] || [];
    },
  },
  data() {
    return {
      newOpinion: { content: '' },
      isEditing: false,
      editingIndex: null,
    };
  },
  methods: {
    addOpinion() {
      if (this.isEditing) {
        this.currentGameOpinions[this.editingIndex] = {
          ...this.newOpinion,
          author: `${this.user.name} ${this.user.surname}`,
        };
        this.isEditing = false;
        this.editingIndex = null;
      } else {
        if (this.user.coins >= 5) {
          const opinion = {
            content: this.newOpinion.content,
            author: `${this.user.name} ${this.user.surname}`,
          };
          this.$store.dispatch('addOpinion', { gameName: this.gameName, opinion });
        } else {
          alert('No tienes suficientes créditos para agregar una opinión.');
        }
      }
      this.resetForm();
    },
    deleteOpinion(index) {
      this.$store.dispatch('deleteOpinion', {
        gameName: this.gameName,
        index,
      });
    },
    editOpinion(index) {
      this.newOpinion = { ...this.currentGameOpinions[index] };
      this.isEditing = true;
      this.editingIndex = index;
    },
    resetForm() {
      this.newOpinion = { content: '' };
      this.isEditing = false;
      this.editingIndex = null;
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
.opinion-section {
  max-width: 800px;
  margin: auto;
  background-color: rgba(60, 60, 60, 0.827);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Título del juego */
.game-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #007bff;
}
.game-name {
  color: #0056b3;
}

/* Formulario de opinión */
.opinion-form {
  background-color: rgba(119, 119, 119, 0.463);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.user-info {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.opinion-textarea {
  border-radius: 10px;
  padding: 15px;
  font-size: 1rem;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Opiniones */
.opinions-list {
  margin-top: 30px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #fafcff;
}

/* Tarjetas de opiniones */
.opinion-card {
  border: none;
  border-radius: 10px;
  background-color: #000000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.2rem;
  color: #ffffff;
}

.card-text {
  font-size: 1rem;
  color: #6c757d;
}

/* Botones */
.btn {
  border-radius: 10px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>
