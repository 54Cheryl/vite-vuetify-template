<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="auto" class="pa-0">
        <div class="overflow-auto flex-grow-1 d-flex flex-column">
          <v-card class="px-3 py-6 overflow-auto border-none">
            <!-- <p>Decrypted Data: {{ order_no }}</p> -->
            <!-- <v-card-title class="text-h5 font-weight-regular text-center text-cyan-darken-4">親愛的受訪者您好：</v-card-title>
            <p class="pb-4 text-sm-h5 font-weight-regular text-cyan-darken-4 text-center">為持續精進平臺的服務品質，請您將【使用的感受】就以下問題填寫。您對本平臺服務之滿意度，將是本機關後續的重要參考，謝謝您的協助！</p> -->
            <v-form ref="QuestionnaireForm">
              <v-card rounded="lg" class="elevation-0 mb-4" style="border: 1px solid #00838F;" v-for="(item, index) in questionList" :key="index">
                <div class="bg-light-green-lighten-3" style="border-bottom: 1px solid #00838F;">
                  <template v-for="category in qstCategory" :key="category.category_id">
                    <p class="py-3 text-h5 font-weight-medium text-center" v-if="index == category.category_id">{{ index == category.category_id ? category.category_name : '' }}</p>
                  </template>
                </div>
                <template v-if="index == 1">
                  <v-card-text class="bg-light-green-lighten-5" v-if="index == 1">
                    <p class="mb-2 text-h6 text-sm-h5 font-weight-regular ms-1">請問您操作平臺使用的設備？</p>
                    <v-radio-group v-model="device" inline color="cyan-darken-4" class="text-h6 radio-label-opacity" hide-details="auto" :rules="[value => !!value || '此欄位必填']">
                      <v-radio value="手機" class="pe-sm-4 pe-md-8">
                        <template v-slot:label>
                          <p class="text-sm-h6 font-weight-regular">
                            手機/平板
                          </p>
                        </template>
                      </v-radio>
                      <v-radio value="電腦" class="pe-sm-8">
                        <template v-slot:label>
                          <p class="text-sm-h6 font-weight-regular">電腦</p>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-card-text>
                  <v-divider :thickness="1" color="cyan-darken-4" class="border-opacity-50 m-0">
                  </v-divider>
                </template>
                <template v-for="(qst, index) in item" :key="qst.question_id">
                  <v-card-text class="bg-light-green-lighten-5">
                    <p class="mb-2 text-h6 text-sm-h5 font-weight-regular ms-1">{{ qst.question }}</p>
                    <v-radio-group v-model="tmpAns[qst.question_id]" inline color="cyan-darken-4" class="text-h6 radio-label-opacity" hide-details="auto" :rules="[value => !!value || '此欄位必填']">
                      <v-radio :value="5" class="pe-sm-4 pe-md-8">
                        <template v-slot:label>
                          <p class="text-sm-h6 font-weight-regular">
                            非常滿意
                          </p>
                        </template>
                      </v-radio>
                      <v-radio :value="4" class="pe-sm-8">
                        <template v-slot:label>
                          <p class="text-sm-h6 font-weight-regular">滿意</p>
                        </template>
                      </v-radio>
                      <v-radio :value="3" class="pe-sm-8">
                        <template v-slot:label>
                          <p class="text-sm-h6 font-weight-regular">普通</p>
                        </template>
                      </v-radio>
                      <v-radio :value="2" class="pe-sm-8">
                        <template v-slot:label>
                          <p class="text-sm-h6 font-weight-regular">不滿意</p>
                        </template>
                      </v-radio>
                      <v-radio :value="1" class="pe-sm-8">
                        <template v-slot:label>
                          <p class="text-sm-h6 font-weight-regular">非常不滿意</p>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-card-text>
                  <v-divider :thickness="1" color="cyan-darken-4" class="border-opacity-50 m-0" v-if="index + 1 !== item.length">
                  </v-divider>
                </template>
              </v-card>

              <div class="text-center mb-6">
                <div class="mb-4 text-sm-h5 text-cyan-darken-4 font-weight-medium">
                  <p>如您有其他建議，請撥打本分署售圖</p>
                  <p>購圖專線<span class="text-red-darken-2"> (02-89791558)</span>，</p>
                  <p>由專人為您服務。</p>
                </div>
                <v-btn
                  prepend-icon="mdi-check"
                  rounded="xl"
                  size="x-large"
                  color="cyan-darken-3"
                  class="text-h6 text-sm-h5"
                  @click="submitQuestionnaire"
                >
                  送出
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <!-- 問卷填寫相關內容 -->
  <v-dialog
    v-model="questionnaireDialog"
    scrollable
    persistent
    >
    <v-row justify="center">
      <v-col cols="12" sm="7">
        <v-card class="pa-2 pa-sm-3">
          <v-card-title class="text-center text-cyan-darken-4 text-h6 text-sm-h5"><v-icon class="me-1">mdi-emoticon-excited-outline</v-icon>{{ questionnaireInfo.title }}</v-card-title>
          <div class="px-4">
            <v-divider :thickness="2" color="cyan-darken-4" class="border-opacity-50">
            </v-divider>
          </div>
          <v-card-text class="font-weight-medium text-sm-h6 line-height">{{ questionnaireInfo.text }}</v-card-text>
          <v-card-text class="text-red-darken-2 font-weight-medium text-sm-h6 line-height">
            <p>＊提醒：</p>
            <p>1.每張訂單之平臺滿意度問卷調查表限填一次</p>
            <!-- ，填寫期限為下單後30天內 -->
            <p>2.建議於收到圖資後填寫問卷</p>
          </v-card-text>
          <div class="text-center my-4">
            <v-btn
              rounded="xl"
              size="large"
              color="cyan-darken-3"
              class="text-h6 text-sm-h5"
              @click="questionnaireDialog = false"
            >
              開始填寫
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
  <!-- 已送出問卷！ -->
  <v-dialog
    v-model="sendQuestionnaireDialog"
    scrollable
    persistent
    >
    <v-row justify="center">
      <v-col cols="12" sm="7">
        <v-card class="py-2">
          <v-card-title class="text-center text-cyan-darken-4 text-h6 text-sm-h5 mb-2"><v-icon class="me-2">mdi-send-check</v-icon>已送出問卷！</v-card-title>
          <v-card-text class="font-weight-medium text-center text-sm-h6 line-height pb-2">感謝您提供寶貴的意見，我們致力於提供更好的服務！</v-card-text>
          <v-card-text class="font-weight-medium text-center text-sm-h6 line-height pt-0">＊提醒：系統將為您導向至本分署綜合服務主頁</v-card-text>
          <div class="text-center my-4">
            <v-btn
              rounded="xl"
              size="large"
              color="cyan-darken-3"
              class="text-h6 text-sm-h5"
              @click="pathToAtisweb"
            >
              OK
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>
// import registry from '@/mixins/registry.js'
// import CryptoJS from 'crypto-js'
// import { detectDevice } from '@/mixins/deviceDetection.js';
import axios from 'axios'
export default {
  // mixins: [registry],
  data () {
    return {
      questionnaireDialog: false,
      sendQuestionnaireDialog: false,
      errorPathDialog: true,
      errorRepeatDialog: false,
      tmpErrorRepeat: {},
      questionnaireInfo: {
        title: '親愛的受訪者您好：',
        text: '為持續精進平臺的服務品質，請您將【使用的感受】就以下問題填寫。您對本平臺服務之滿意度，將是本機關後續的重要參考，謝謝您的協助！'
      },
      qstCategory: [],
      questionList: [],
      device: '',
      tmpAns: [],
      order_no: '', // 用來顯示解密後的數據
      order_no_Index: 1,
      LinkOK: false,
      ValidityPeriod: false
      // VITE_APP_DECRYPTED_IV: import.meta.env.VITE_APP_DECRYPTED_IV
      // deviceType: 'unknown',
    }
  },
  watch: {
    tmpAns: {
      handler (val) {
      },
      deep: true
    }
  },
  components: {
  },
  methods: {
    pathToAtisweb () {
      this.sendQuestionnaireDialog = false
      window.location.href = '/'
    },
    async getQuestionnaireCategory () {
      try {
        const response = await axios.get('/QCategory.json')
        this.qstCategory = response.data.results
        console.log(this.qstCategory)
      } catch (error) {
        console.error('Error fetching questionnaire data:', error)
      }
      // this.getQCategory()
      //   .then((res) => {
      //     this.qstCategory = res
      //   }).catch(error => {
      //     console.log(error)
      //   })
    },
    async getQuestionnaireQST () {
      try {
        const response = await axios.get('/Questionnaire.json')
        this.questionList = response.data.results
        console.log(this.questionList)
      } catch (error) {
        console.error('Error fetching questionnaire data:', error)
      }
      // await this.getQuestionnaire()
      //   .then((res) => {
      //     this.questionList = res
      //   }).catch(error => {
      //   // console.log(error)
      //   })
      this.questionList = Object.keys(this.questionList).reduce((result, key) => {
        if (key === '1' || key === String(this.order_no_Index)) {
          result[key] = this.questionList[key]
        }
        return result
      }, {})
    },
    async submitQuestionnaire () {
      const QuestionnaireFormValid = await this.$refs.QuestionnaireForm.validate()
      // console.log(QuestionnaireFormValid.valid);
      if (!QuestionnaireFormValid.valid) return

      const tmpQuestionnaire = Object.entries(this.tmpAns).map(([questionId, rating]) => {
        return { questionId: Number(questionId), rating }
      })

      const questionnaire = {
        order_no: this.order_no,
        device: this.device,
        questionnaire: tmpQuestionnaire
      }
      console.log(questionnaire)
      // await this.CompleteSurvey(questionnaire).then(res => {
      //   if (res.success) {
      //     this.sendQuestionnaireDialog = true
      //     this.questionnaireDialog = false
      //   } else {
      //     this.tmpErrorRepeat = res
      //     this.errorRepeatDialog = true
      //   }
      // })
    },
    decryptData () {
      const { orderId } = this.$route.params
      console.log(orderId)
      this.order_no_Index = orderId.substring(0, 1) === 'w' ? 2 : 3
      this.questionnaireDialog = true
      // let encryptedData = order_id
      // encryptedData = encryptedData.replace(/-/g, '+').replace(/_/g, '/')
      // const decodedData = atob(encryptedData)
      // const parts = decodedData.split('::')
      // if (parts.length === 2) {
      //   function _hex (str) {
      //     const arr = []
      //     for (let i = 0; i < str.length; i++) {
      //       arr[i] = (str.charCodeAt(i).toString(16)).slice(-4)
      //     }
      //     return arr.join('')
      //   }
      //   const encrypted = parts[0]
      //   const key = CryptoJS.enc.Hex.parse(_hex(parts[1]))
      //   const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      //     iv: CryptoJS.enc.Hex.parse(this.VITE_APP_DECRYPTED_IV),
      //     padding: CryptoJS.pad.Pkcs7
      //   })
      //   if (decrypted.toString(CryptoJS.enc.Utf8)) {
      //     this.LinkOK = true
      //     this.order_no = decrypted.toString(CryptoJS.enc.Utf8)
      //     // this.order_no = 'M240701001'
      //     this.order_no_Index = this.order_no.substring(0, 1) === 'w' ? 2 : 3
      //     // this.checkSurveyDate()
      //     this.ValidityPeriod = true
      //     this.questionnaireDialog = true
      //   } else {
      //     this.LinkOK = false
      //     this.questionnaireDialog = false
      //     this.sendQuestionnaireDialog = false
      //   }
      // }
    },
    checkSurveyDate () {
      // const today = new Date().toISOString().substr(0, 10)
      // const surveyDate = new Date('2021-06-30')
      const today = new Date()
      if (!this.order_no) return
      const surveyDateString = '20' + this.order_no.substring(1, 7) // 20240529
      const surveyDate = new Date(surveyDateString.slice(0, 4) + '-' + surveyDateString.slice(4, 6) + '-' + surveyDateString.slice(6, 8))

      const diff = today - surveyDate

      const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
      if (diffDays <= 30) {
        this.ValidityPeriod = true
        this.questionnaireDialog = true
      } else {
        this.ValidityPeriod = false
      }
    }
  },
  mounted () {
    // this.deviceType = detectDevice();
    this.getQuestionnaireCategory()
    this.decryptData()
    this.getQuestionnaireQST()
  }
}
</script>

<style scoped lang="scss">
p {
  margin: 0;
}
.radio-label-opacity {
  :deep(.v-label) {
    opacity: 1 !important;
  }
}
.v-radio-group {
  :deep(.v-selection-control-group--inline) {
    flex-direction: column !important;
  }
}

.CouponDialog :deep(.v-overlay__content) {
  margin: 0px !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100% !important;
  max-height: 100% !important;
}
.v-input :deep(.v-input__details) {
  padding-left: 10px !important;
  .v-messages {
  // padding-bottom: 6px !important;
    font-size: 14px !important;
    // min-height: auto !important;
    display: flex !important;
    height: 100% !important;
  };
}
@media screen and (min-width: 600px) {
  .v-radio-group {
    :deep(.v-selection-control-group--inline) {
      flex-direction: row !important;
    }
  }
  .CouponDialog :deep(.v-overlay__content) {
    width: auto !important;
    height: auto !important;
  }
  .v-input :deep(.v-messages) {
  // padding-bottom: 6px !important;
    font-size: 18px !important;
    // min-height: auto !important;
    display: flex !important;
    height: 100% !important;
  };
}
</style>
