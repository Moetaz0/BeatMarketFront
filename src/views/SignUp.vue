<template>
  <div class="card">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <input type="text" placeholder="Full Name" v-model="name" required />
      <input type="email" placeholder="Email" v-model="email" required />
      <input type="password" placeholder="Password" v-model="password" required />
      <button type="submit">Sign Up</button>
    </form>
    <a href="#" @click.prevent="$emit('switch', 'login')">Already have an account? Login</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signup() {
      alert(`Signing up: ${this.name}`)
    }
  }
}
</script>
