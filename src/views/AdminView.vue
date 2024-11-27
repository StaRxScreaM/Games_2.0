<template>
  <div class="container mt-5">
    <div class="user-admin-card shadow-lg p-4">
      <h1 class="title mb-4">Administración del Usuario</h1>

      <!-- Formulario de Usuario -->
      <div class="form-group">
        <input
          v-model="user.name"
          placeholder="Nombre"
          class="form-control input-custom mb-3"
        />
        <input
          v-model="user.surname"
          placeholder="Apellido"
          class="form-control input-custom mb-3"
        />
        <button class="btn btn-success btn-lg w-100" @click="saveUser">Guardar Usuario</button>
      </div>

      <!-- Información del Usuario -->
      <div v-if="user.name && user.surname" class="mt-5">
        <h2 class="welcome-text">Bienvenido, {{ user.name }} {{ user.surname }}</h2>

        <div class="coins-section mt-4">
          <button
            class="btn btn-primary btn-lg mb-3"
            :disabled="user.coins >= 50"
            @click="addCoins"
          >
            Agregar Coins
          </button>
          <p class="current-coins">Coins actuales: {{ user.coins }}</p>

          <!-- Barra de progreso -->
          <div class="progress">
            <div
              class="progress-bar progress-bar-animated"
              role="progressbar"
              :class="progressBarColor"
              :style="{ width: coinsPercentage + '%' }"
            >
              {{ user.coins }} / 50
            </div>
          </div>

          <p v-if="user.coins >= 50" class="text-danger mt-2">Llegaste al máximo de tu crédito</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
    coinsPercentage() {
      return (this.user.coins / 50) * 100;
    },
    progressBarColor() {
      if (this.user.coins <= 20) return 'bg-success';
      if (this.user.coins <= 30) return 'bg-warning';
      return 'bg-danger';
    },
  },
  methods: {
    saveUser() {
      this.$store.commit('updateUser', this.user);
      alert(`Usuario guardado: ${this.user.name} ${this.user.surname}`);
    },
    addCoins() {
      if (this.user.coins < 50) {
        this.$store.commit('updateCoins', this.user.coins + 10);
      }
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
.container {
  max-width: 600px;
  background-color: rgba(0, 0, 0, 0);
  padding: 30px;
  border-radius: 15px;
  color: white;
  font-family: 'Arial', sans-serif;
}

/* Tarjeta de administración de usuario */
.user-admin-card {
  background-color: rgba(64, 64, 64, 0.9);
  border-radius: 15px;
  padding: 30px;
  color: #333;
}

/* Título */
.title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #007bff;
}

/* Texto de bienvenida */
.welcome-text {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #0056b3;
}

/* Campos de entrada */
.input-custom {
  font-size: 1.1rem;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

/* Botones */
.btn {
  border-radius: 10px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  font-size: 1.1rem;
}

.btn-success {
  font-size: 1.1rem;
}

/* Sección de coins */
.coins-section {
  text-align: center;
}

.current-coins {
  font-size: 1.2rem;
  font-weight: bold;
  color: #28a745;
}

/* Barra de progreso */
.progress {
  height: 25px;
  border-radius: 15px;
  background-color: #e9ecef;
  overflow: hidden;
}

.progress-bar {
  font-size: 1rem;
  font-weight: bold;
  line-height: 25px;
  text-align: center;
}
</style>
