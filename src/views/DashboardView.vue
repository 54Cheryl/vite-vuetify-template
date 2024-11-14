<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
    <div class="container">
      <router-link to="/admin" class="navbar-brand pb-0">
        <img src="https://storage.googleapis.com/vue-course-api.appspot.com/cheryl-hexschool/1678656720313.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Xkk8pDNR0qrqU13y6O766cAMbXAT0%2FS7f6PHT5xUFvjqf0Nfs9wMgIye6OD4nbzDdUl7vwjqbT8xaMKehN50MGKGOyymGE8XSGRbfJfJwTDf%2BhJKFxLrHk7x2htFI1wxzSEikMcnIgiXTOzOHJmm3v5txy7kzC1NKY0e4UZD5HDYbLMdwC0f3hhTF8hHMVsGNOUIVcqqsUc%2F2xLoLTbZLEYTUbPDtPhTIKQe1QSNsQU%2FVcmyWyXZK%2Ft0R5xf72DaFU1ffHGZQeUAj6GBIu9k31pU%2B%2FsddWFgyGVV98VfjANRGKl4kJuf1u6Q14WKdy7EDe5%2Bzy2AIt0fhByzCem1%2Fg%3D%3D" alt="BIECHA-logo" class="">
      </router-link>
      <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-0 pt-2">
          <li class="nav-item py-3">
            <router-link to="/admin/products" class="nav-link Serif-TC">產品管理</router-link>
          </li>
          <li class="nav-item py-3">
            <router-link to="/admin/orders" class="nav-link Serif-TC">訂單管理</router-link>
          </li>
          <li class="nav-item py-3">
            <router-link to="/admin/coupons" class="nav-link Serif-TC">優惠券管理</router-link>
          </li>
          <li class="nav-item py-3">
            <router-link to="/" class="nav-link Serif-TC">回到前台</router-link>
          </li>
        </ul>
        <form class="d-flex pt-2">
          <a href="#" @click.prevent="logout" class="text-decoration-none Serif-TC p-md-2 logout">登出</a>
        </form>
      </div>
    </div>
  </nav>
  <RouterView v-if="checkSuccess"></RouterView>
</template>

<script>
import { RouterView } from 'vue-router'
import { Toast, Swal } from '@/methods/swalToast'
const { VITE_APP_URL } = import.meta.env
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  components: {
    RouterView
  },
  methods: {
    logout () {
      document.cookie = 'cherylToken=; expires=;'
      this.$router.push('/login')
    },
    checkLogin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)cherylToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`
        this.$http.post(`${VITE_APP_URL}api/user/check`, { api_token: this.token })
          .then((res) => {
            this.checkSuccess = true
            if (!res.data.success) {
              this.$router.push('/login')
            }
            Toast.fire({
              icon: 'success',
              title: '登入成功'
            })
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: err.response.data.message,
              confirmButtonColor: '#ab7e52'
            })
            this.$router.push('/login')
          })
      } else {
        Toast.fire({
          icon: 'warning',
          title: '請先登入'
        })
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
