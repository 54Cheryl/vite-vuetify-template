<template>
  <v-row justify="center" class="pa-0 ma-0">
    <v-col cols="12" sm="12" class="pa-0">
      <v-layout class="h-screen d-flex flex-column ma-0 pa-0 bg-white">
        <FrontHeader />
        <div class="flex-grow-1 overflow-auto">
          <div class="mx-auto text-center py-2 py-sm-8 d-flex justify-center align-center">
            <v-icon class="text-h3 text-sm-h2" color="cyan-darken-4">mdi-file-edit</v-icon>
            <div class="px-auto">
              <h2 class="px-auto pb-sm-1 text-sm-h4 font-weight-bold">填寫放大航空照片紙圖</h2>
              <h2 class="text-sm-h4 font-weight-bold">申請單聯絡資訊</h2>
            </div>
          </div>
          <p class="text-h6 font-size-subtitle-rwd font-weight-bold text-center pb-sm-2">聯絡資訊：</p>
          <v-form ref="contactForm">
            <v-sheet color="cyan-lighten-5" rounded="lg" class="mx-2 mt-2 mb-4 px-3 pb-5 pt-8">
              <v-select
                v-model="purpose_id"
                :items="purposeConfig"
                item-title="name"
                item-value="id"
                density="comfortable"
                label="申請目的(僅限申請目的內使用)"
                color="cyan-darken-2"
                bg-color="white"
                variant="outlined"
                required
                class="mb-3"
                :rules="[v => !!v || '請選擇一項申請目的！']"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :title="item.raw.name"
                  >
                  </v-list-item>
                </template>
              </v-select>
              <v-text-field
                v-model="taxId"
                label="統一編號(非身分證字號)"
                color="cyan-darken-2"
                bg-color="white"
                variant="outlined"
                required
                class="mb-3 rwd-text-field"
                :rules="taxidRule"
              ></v-text-field>
              <v-text-field
                v-model="recipet"
                label="收據抬頭(申請人)"
                color="cyan-darken-2"
                bg-color="white"
                variant="outlined"
                class="mb-3 rwd-text-field"
                required
                persistent-hint
                :hint="taxId ? '＊請確認收據抬頭是否為機關/公司名稱' : ''"
                :rules="[
                  value => !!value || '收據抬頭(申請人） 是必需資訊',
                  value => /^[\u4e00-\u9fa5]+$/u.test(value) || '收據抬頭(申請人） 僅接受中文正楷'
                ]"
              ></v-text-field>
              <v-text-field
              v-model="contactperson"
                label="聯絡人"
                color="cyan-darken-2"
                bg-color="white"
                variant="outlined"
                required
                class="mb-3 rwd-text-field"
                :rules="[
                  value => !!value || '聯絡人 是必需資訊',
                  value => /^[\u4e00-\u9fa5]+$/u.test(value) || '聯絡人 僅接受中文正楷'
                ]"
              ></v-text-field>

              <v-text-field
                v-model="mobile"
                label="聯絡電話(手機)"
                placeholder="0910123456"
                color="cyan-darken-2"
                bg-color="white"
                variant="outlined"
                class="mb-3 rwd-text-field"
                required
                persistent-hint
                hint="＊申請狀態更新會透過簡訊發送"
                :rules="[
                  value => !!value || '此欄位必填',
                  value => /^09[0-9]{8}$/.test(value) || '手機格式需為09開頭的10碼數字'
                ]"
              ></v-text-field>

              <v-text-field
                v-model="landline"
                label="聯絡電話(市話)"
                placeholder="0212345678"
                color="cyan-darken-2"
                bg-color="white"
                variant="outlined"
                class="rwd-text-field"
                required
              ></v-text-field>
            </v-sheet>
            <div class="mx-2 px-4 mb-4">
              <div class="d-inline-block">
                <p class="text-h6 text-sm-h5 font-weight-medium">
                  選擇取件方式：郵局寄送
                </p>
                <p class="text-body-1 text-sm-h6 font-weight-bold text-red-accent-4">
                  (掛號郵資依圖資重量而定，約44元~180元不等)
                </p>
              </div>
            </div>
            <v-divider :thickness="2" color="cyan-darken-2" class="border-opacity-75 mx-2"></v-divider>
            <p class="text-h6 font-size-subtitle-rwd font-weight-bold text-center mt-3 mt-sm-5">寄送資訊：</p>
            <v-sheet color="cyan-lighten-5" rounded="lg" class="mx-2 mb-4 mt-2 mt-sm-4 px-3 pb-4 pt-2">
              <div class="d-flex px-2 py-4">
                <v-radio-group
                  v-model="copyTitle"
                  inline
                  hide-details="auto"
                  color="cyan-darken-4"
                  class="pt-0 mt-0 text-sm-h5"
                >
                  <v-radio
                    value="contactperson"

                  >
                    <template v-slot:label>
                      <p class="text-h6 text-sm-h5 ps-sm-1">同聯絡人</p>
                    </template>
                  </v-radio>
                  <v-radio
                    class="ml-4"
                    value="applicant"
                  >
                    <template v-slot:label>
                      <p class="text-h6 text-sm-h5 ps-sm-1">同申請人</p>
                    </template>
                  </v-radio>
                </v-radio-group>
              </div>
              <v-text-field
                v-model="recipient"
                label="收件人/單位"
                color="cyan-darken-2"
                bg-color="white"
                variant="outlined"
                class="mb-3 rwd-text-field"
                :rules="[
                  value => !!value || '收據抬頭(申請人） 是必需資訊',
                  value => /^[\u4e00-\u9fa5]+$/u.test(value) || '收據抬頭(申請人） 僅接受中文正楷'
                ]"
              ></v-text-field>
              <v-text-field
                v-model="recipientphone"
                label="收件人電話"
                color="cyan-darken-2"
                bg-color="white"
                variant="outlined"
                class="mb-3 rwd-text-field"
                :rules="[value => !!value || '此欄位必填']"
              ></v-text-field>
              <v-text-field
                v-model="postalcode"
                label="郵遞區號(系統帶入)"
                color="cyan-darken-2"
                bg-color="white"
                variant="outlined"
                class="rwd-text-field"
                readonly
                disabled
              ></v-text-field>
              <v-select
                v-model="city"
                :items="citys"
                item-title="name"
                item-value="id"
                density="comfortable"
                label="縣市"
                bg-color="cyan-darken-2"
                variant="solo"
                class="mb-3"
                :rules="[value => !!value || '此欄位必填']"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :title="item.raw.name"
                  >
                  </v-list-item>
                </template>
              </v-select>
              <v-select
                v-model="district"
                :items="districtList"
                item-title="name"
                item-value="id"
                density="comfortable"
                label="鄉鎮市區"
                bg-color="cyan-darken-2"
                variant="solo"
                class="mb-3"
                :rules="[value => !!value || '此欄位必填']"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :title="item.raw.name"
                  >
                  </v-list-item>
                </template>
              </v-select>
              <v-text-field
                v-model="street"
                label="門牌地址"
                placeholder="請輸入詳細地址"
                color="cyan-darken-2"
                bg-color="white"
                variant="outlined"
                class="rwd-text-field"
                :rules="[value => !!value || '此欄位必填']"
              ></v-text-field>
            </v-sheet>
          </v-form>
          <div class="text-center my-4 my-sm-10 d-flex justify-space-evenly align-end flex-grow-1">
            <v-btn prepend-icon="mdi-close" rounded="xl" class="text-white font-weight-black text-h6 text-sm-h4 smallup-btn-h smallup-btn-radius"
              color="cyan-darken-3" variant="flat" size="large" @click="cancelApply">
              取消
            </v-btn>
            <v-btn prepend-icon="mdi-file-document-remove-outline" rounded="xl" class="text-white font-weight-black text-h6 text-sm-h4 smallup-btn-h smallup-btn-radius" color="cyan-darken-3"
              variant="flat" size="large" @click="clearApply">
              重新填寫
            </v-btn>
          </div>
          <div class="text-center my-5 pb-4">
            <v-btn prepend-icon="mdi-check" rounded="xl" class="text-white font-weight-black text-h6 text-sm-h4 smallup-btn-h smallup-btn-radius" color="cyan-darken-3"
              variant="flat" size="large" @click="submitMagnifyApplication">
              確定，送出申請
            </v-btn>
          </div>
        </div>
        <FrontFooter />
      </v-layout>
    </v-col>
  </v-row>
</template>

<script>
import FrontHeader from '@/components/FrontHeader.vue'
import FrontFooter from '@/components/FrontFooter.vue'
import axios from 'axios'
// import registry from '@/mixins/registry.js'
// import { mapState, mapActions } from 'pinia'
// import { useLoginStore } from '@/store/login'

export default {
  // mixins: [registry],
  data () {
    return {
      copyTitle: '',
      OrderPurposeConfig: [
        { id: '0', name: '內部用(不列入統計報表)' },
        { id: '1', name: '參考' },
        { id: '2', name: '證明' }
      ],
      purpose_id: '',
      recipet: '',
      taxId: '',
      contactperson: '',
      mobile: '',
      landline: '',
      postalcode: '',
      city: '',
      district: '',
      districtList: [],
      street: '',
      recipient: '',
      recipientphone: '',
      applicationContact: {
        purpose_id: '',
        taxId: '',
        recipet: '',
        contactperson: '',
        mobile: '',
        landline: '',
        recipient: '',
        recipientphone: '',
        postalcode: '',
        address: ''
      },
      sendApp: {},
      getApp: {},
      delivery: 'byPost',
      userlogdata: null,
      citylists: [],
      deliveryConfig: [{ id: '3', title: 'byPost', label: '郵局寄送(掛號郵資依圖資重量而定，約44元～180元不等)' }]
    }
  },
  components: {
    FrontHeader,
    FrontFooter
  },
  watch: {
    async copyTitle (val) {
      if (val === 'contactperson') {
        this.recipient = this.contactperson
        this.recipientphone = this.mobile
      } else if (val === 'applicant') {
        this.recipient = this.recipet
        this.recipientphone = ''
      }
    },
    city (obj) {
      this.district = null
      this.postalcode = null
      if (obj) {
        this.getTownLists(obj)
      } else {
        this.districtList = []
      }
    },
    district (obj) {
      const town = this.districtList.filter(district => district.id === obj)[0]
      if (obj) this.postalcode = town.zip
    }
  },
  computed: {
    // ...mapState(useLoginStore, ['citylists', 'magnify', 'userlogdata']),
    citys () {
      this.setCityLists()
      return this.citylists
    },
    purposeConfig () {
    // const roleid = JSON.parse(localStorage.getItem('ldata'))?.roleid
      const roleid = this.userlogdata?.roleid
      if (roleid && roleid > 3) {
        return this.OrderPurposeConfig
      } else {
        return this.OrderPurposeConfig.filter(purpose => purpose.id !== '0')
      }
    },
    taxidRule () {
      if (this.taxId) {
        return [
          value => !!value || '此欄位必填',
          value => /^\d{8}$/.test(value) || '請輸入統一編號(8碼)'
        ]
      } else return [true]
    }
  },
  methods: {
    // ...mapActions(useLoginStore, ['setCityLists', 'setSelectedPositionLists', 'setMagnifyPositionLists']),
    getCity () {
      const uri = 'https://gistest.asrs.gov.tw/atisapi/WebProvide/adminRegion/city'
      return axios(uri).then(res => res.data).catch(error => console.log(error))
    },
    setCityLists () {
      if (!this.citylists.length) {
        this.getCity().then(res => {
          if (res.success) {
            this.citylists = res.data.tableList
          } else {
            this.citylists = []
          }
        }).catch(error => console.log(error))
      }
    },
    cancelApply () {
      this.setSelectedPositionLists([])
      this.clearApply()
      this.$router.push('/admin/location-filter')
    },
    async clearApply () {
      await this.$refs.contactForm.reset()
    },
    async submitMagnifyApplication () {
      const validation = await this.$refs.contactForm.validate()
      if (validation.valid) {
        Object.keys(this.applicationContact).forEach(key => {
          if (this[key]) {
            this.applicationContact[key] = this[key]
          }
        })
        const cityObj = this.citylists.filter(city => city.id === this.city)[0]
        const districtObj = this.districtList.filter(district => district.id === this.district)[0]
        this.applicationContact.address = `${cityObj.name}${districtObj.name}${this.street}`
        this.sendApp = {
          ...this.applicationContact,
          delivery: this.deliveryConfig.filter(delivery => delivery.title === this.delivery)[0].id,
          positionlists: this.magnify.selectedPositionLists
        }
        await this.sendAppForm(this.sendApp).then(res => {
          if (res) {
            this.getApp = res
            const remainPositionLists = this.magnify.magnifyPositionLists.reduce((acc, val) => {
              if (!this.magnify.selectedPositionLists.find(position => position.id === val.id)) {
                acc.push(val)
              }
              return acc
            }, [])
            this.magnify.magnifyPositionLists = remainPositionLists
            this.magnify.magnifyPositionLists = this.magnify.magnifyPositionLists.filter(item => {
              return !this.magnify.selectedPositionLists.some(selectedItem => selectedItem.id === item.id)
            })
            localStorage.setItem('magnifyPositionLists', JSON.stringify(this.magnify.magnifyPositionLists))
            this.clearApply()
            this.$router.push('/admin/progress-query')
          }
        })
      }
    },
    getTownLists (cid) {
      this.districtList = []
      this.getTownByCityid(cid).then(res => {
        if (res) this.districtList = res
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>

@media screen and (min-width: 600px) {
  .font-size-subtitle-rwd {
    font-size: 1.85rem !important;
  }
  .v-input :deep(.v-label) {
    font-size: 20px !important;
  }
  .v-input :deep(.v-icon) {
    font-size: 34px !important;
  }
  .v-input :deep(.v-field__input) {
    font-size: 35px !important;
    padding-top: 32px !important;
    min-height: 100.5px !important;
  }
  .v-input :deep(.v-messages) {
    font-size: 20px !important;
    display: flex !important;
    height: 100% !important;
  };
  .v-input :deep(.v-input__details) {
    padding-bottom: 25px !important;
  }
  .v-input :deep(.v-messages__message) {
    line-height: 28px !important;
  }
  .v-list-item :deep(.v-list-item-title){
    font-size: 22px !important;
  }
  .smallup-btn-h{
    height: 85px !important;
  }
  .smallup-btn-radius{
    border-radius: 48px !important;
  }
  .smallup-icon-h{
    height: auto !important;
    width: auto !important;
  }
}
</style>
