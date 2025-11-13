<template>
  <div class="card">
    <h2>Forgot Password</h2>
    <form @submit.prevent="resetPassword">
      <input type="email" placeholder="Your Email" v-model="email" required />
      <button type="submit">Reset Password</button>
    </form>
    <a href="#" @click.prevent="$emit('switch', 'login')">Back to Login</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    resetPassword() {
      alert(`Password reset link sent to: ${this.email}`)
    }
  }
}
</script>
