<template>
  <div class="auth-container">
    <div class="card">
      <h2>BeatMarket Login</h2>
      <p class="subtitle">For producers and artists</p>
      <form @submit.prevent="login">
        <input type="email" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <button type="submit">Login</button>
      </form>
      <div class="links">
        <a href="#" @click.prevent="$emit('switch', 'forgot')">Forgot Password?</a>
        <a href="#" @click.prevent="$emit('switch', 'signup')">Don't have an account? Sign Up</a>
      </div>
      <div class="beat-accent"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      // TODO: integrate real authentication
      alert(`Logging in as: ${this.email}`)
    }
  }
}
</script>

<style>
/* Container and background */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e2f, #2a2a40);
  padding: 1rem;
}

/* Card styling */
.card {
  background: #14142b;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.6);
}

/* Heading */
h2 {
  margin-bottom: 0.3rem;
  font-size: 2rem;
  color: #ffd166;
}

.subtitle {
  margin-bottom: 1.5rem;
  color: #aaa;
  font-size: 0.95rem;
}

/* Inputs */
input {
  width: 100%;
  padding: 0.85rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 1rem;
  background: #1e1e2f;
  color: #fff;
  transition: background 0.3s;
}

input::placeholder {
  color: #888;
}

input:focus {
  background: #27273f;
}

/* Button */
button {
  width: 100%;
  padding: 0.85rem;
  background: #ffd166;
  color: #14142b;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

button:hover {
  background: #e6b800;
  transform: translateY(-2px);
}

/* Links */
.links {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.links a {
  color: #ffd166;
  text-decoration: none;
  font-size: 0.9rem;
}

.links a:hover {
  text-decoration: underline;
}

/* Decorative beat accent */
.beat-accent {
  position: absolute;
  bottom: 0;
  left: -50%;
  width: 200%;
  height: 6px;
  background: linear-gradient(90deg, #ff6b6b, #ffd166, #6bffb3);
  animation: moveGradient 2s linear infinite;
}

@keyframes moveGradient {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(50%); }
}

/* Responsive */
@media (max-width: 500px) {
  .card {
    padding: 1.5rem;
  }
  h2 {
    font-size: 1.6rem;
  }
  input, button {
    font-size: 0.9rem;
    padding: 0.7rem;
  }
}
</style>
