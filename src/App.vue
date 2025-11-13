<template>
  <component :is="currentPage" @switch="switchPage" />
</template>

<script>
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import ForgotPassword from './views/ForgotPassword.vue'

export default {
  components: { Login, SignUp, ForgotPassword },
  data() {
    return {
      currentPage: Login
    }
  },
  methods: {
    switchPage(page) {
      if (page === 'login') this.currentPage = Login
      else if (page === 'signup') this.currentPage = SignUp
      else if (page === 'forgot') this.currentPage = ForgotPassword
    }
  }
}
</script>
