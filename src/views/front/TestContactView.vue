<template>
  <div class="h-screen d-flex flex-column">
    <FrontHeader />
    <v-layout class="pa-0 d-flex justify-center overflow-auto">
      <div class="d-flex flex-column h-100">
        <div class="text-center pt-5 pt-sm-10 pb-3 pb-sm-6">
          <h2 class="text-sm-h3 font-weight-bold">聯絡窗口</h2>
        </div>
        <div class="flex-grow-1 d-flex justify-center align-center">
          <div class="w-sm-65">
            <v-img width="100%" height="100%" cover alt="聯絡窗口插圖" :src="contactImg" />
          </div>
        </div>
        <div class="flex-grow-1">
          <div class="px-sm-12 py-4 ma-auto text-center">
            <p class="font-weight-regular d-inline-block text-h6 text-sm-h4 line-height letter-spacing mb-0">如您有任何問題，<br>請撥打本分署<br>購圖專線：02-89791558，<br>將由專人為您服務。</p>
            <p class="font-weight-regular text-h6 text-sm-h4 line-height letter-spacing mb-0">現場售圖時間：週一至週五 08:30-17:00。</p>
          </div>
          <div class="text-center pb-10 pt-2 pt-sm-4">
            <RouterLink to="/" class="text-white text-decoration-none">
              <v-btn
                prepend-icon="mdi-arrow-left"
                rounded="xl"
                class="text-white font-weight-black text-h6 text-sm-h4 smallup-btn-h smallup-btn-radius"
                color="cyan-darken-3"
                variant="flat"
                size="large"
              >回主選單
              </v-btn>
            </RouterLink>
          </div>
        </div>
      </div>
    </v-layout>
    <FrontFooter class="pa-0" />
  </div>
</template>

<script>
import FrontHeader from '@/components/FrontHeader.vue'
import FrontFooter from '@/components/FrontFooter.vue'
export default {
  data () {
    return {
      contactImg: `${import.meta.env.BASE_URL}img/9.contact.svg`
    }
  },
  components: {
    FrontHeader,
    FrontFooter
  }
}
</script>

<style scoped lang="scss">
.w-sm-65 {
  width: 100% !important;
}
@media screen and (min-width: 600px){
  .w-sm-65 {
    width: 65vw !important;
  }
}
</style>
