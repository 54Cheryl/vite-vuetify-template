<template>
  <v-sheet>
    <div class="d-flex justify-space-evenly bg-cyan-darken-2 pa-2 text-white font-weight-bold text-sm-h5 py-sm-4">
      <RouterLink to="/introduction" class="text-white text-decoration-none">網站介紹</RouterLink>
      <RouterLink to="/terms" class="text-white text-decoration-none">服務條款</RouterLink>
      <RouterLink to="/contact" class="text-white text-decoration-none">聯絡窗口</RouterLink>
      <!-- <RouterLink to="/hours" class="text-white text-decoration-none">營業時間</RouterLink> -->
    </div>
    <v-sheet class="text-center text-sm-h6 pa-2 py-sm-4" color="cyan-darken-2" style="border-top: rgba(255, 255, 255, 0.6) 1px solid; ">
      <a href="https://www.asrs.gov.tw/" class="text-white text-decoration-none">
        <span class="text-white font-weight-medium">ⓒ 2024 航測及遙測分署</span>
      </a>
    </v-sheet>
  </v-sheet>
</template>
