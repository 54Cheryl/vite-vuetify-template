<template>
  <v-row justify="center" class="pa-0 ma-0 overflow-auto position-relative">
    <v-col cols="12" sm="12" class="pa-0">
      <v-layout class="h-screen d-flex flex-column bg-white">
        <FrontHeader />
        <div class="flex-grow-1 overflow-auto">

          <div class="mx-auto text-center py-2">
            <h2 class="text-grey-darken-1 py-2 px-auto py-sm-4 text-sm-h3 font-weight-bold">放大航空照片紙圖申購專區1</h2>
            <div class="d-flex justify-center px-auto py-sm-3">
              <v-icon class="text-h4 text-sm-h3" color="grey-darken-1">mdi-chevron-right</v-icon>
              <h2 class="text-sm-h3 font-weight-bold">新增申請單</h2>
            </div>
            <!-- <h2 class="text-cyan-darken-4 text-sm-h3 font-weight-bold py-sm-3 mt-3">新增「放大影像」定位點資訊</h2> -->
          </div>

          <div class="px-2">
            <div class="px-2 mb-5">

              <v-card rounded="lg" class="elevation-0" style="border: 2px solid #00838F;">

                <div class="text-white bg-cyan-darken-4">
                  <p class="py-2 py-sm-4 text-h6 text-sm-h3 font-weight-bold text-center mb-0">新增「放大影像」定位點資訊</p>
                </div>

                <v-card-text class="bg-teal-lighten-5 pb-0">
                  <v-form ref="locationFilter">
                    <v-select
                      v-model="serviceType"
                      :items="serviceList"
                      item-title="title"
                      item-value="id"
                      density="comfortable"
                      label="定位方式"
                      placeholder="請選擇"
                      variant="solo"
                      rounded="lg"
                      :rules="[v => !!v || '必填欄位！']"
                      hide-details="auto"
                    >
                      <template v-slot:item="{ props, item }">
                        <v-list-item
                          v-bind="props"
                          :title="item.title"
                        >
                        </v-list-item>
                      </template>
                    </v-select>
                  </v-form>

                  <v-form ref="position">
                    <v-row v-if="serviceType && (serviceType === 1)" class="pt-4">
                      <v-col>
                        <v-autocomplete
                          v-model="AutoSelect"
                          v-model:search="AutoSearch"
                          @compositionstart="handleCompositionStart"
                          @compositionend="handleCompositionEnd"
                          :loading="AutoLoading"
                          :items="AutoItems"
                          item-title="full_addr"
                          item-value="full_addr"
                          :label="ComboLabel"
                          :custom-filter="filterObject"
                          :hint="outTraceInfo"
                          return-object
                          placeholder="請輸入"
                          variant="solo"
                          rounded="lg"
                          hide-details="auto"
                          clearable
                          @click:clear="clearAutoSearch"
                          no-data-text="查無相關地址"
                          @update:focused="updateFocused"
                          @update:search="updateSearchInput"
                          :rules="comboRules"
                        >
                          <template v-slot:item="{ props, item }">
                            <v-list-item
                              v-bind="props"
                              :title="item.raw.full_addr"
                            ></v-list-item>
                          </template>
                        </v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row v-if="serviceType && (serviceType === 2 || serviceType === 999 || serviceType === 3 || serviceType === 4)" class="pt-4">
                      <v-col :cols="serviceType === 3 ? '12' : '6'">
                        <v-select
                          v-model="Model1"
                          :items="Service1"
                          :item-title="serviceType === 2 || serviceType === 999 ? 'name' : 'title'"
                          :item-value="serviceType === 2 || serviceType === 999 ? 'code' : 'id'"
                          :label="Label1"
                          :rules="[v => !!v || '必填欄位！']"
                          variant="solo"
                          rounded="lg"
                          hide-details="auto"
                        >
                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :title="serviceType === 2 || serviceType === 999 ? item.raw.name : item.raw.title"
                          >
                          </v-list-item>
                        </template>
                        </v-select>
                      </v-col>
                      <v-col :cols="serviceType === 3 ? '12' : '6'" v-if="serviceType && (serviceType === 2 || serviceType === 999 || serviceType === 4)">
                        <v-select
                          v-model="Model2"
                          :items="Service2"
                          item-value="code"
                          item-title="name"
                          :label="Label2"
                          :rules="[v => !!v || '必填欄位！']"
                          variant="solo"
                          rounded="lg"
                          hide-details="auto"
                          no-data-text="請先選取縣市"
                        >
                          <template v-slot:item="{ props, item }">
                            <v-list-item
                              v-bind="props"
                              :title="item.raw.name"
                            >
                            </v-list-item>
                          </template>
                        </v-select>
                      </v-col>
                    </v-row>
                    <v-row v-if="serviceType && serviceType === 2 || serviceType === 999">
                      <v-col>
                        <v-select
                          v-model="Model3"
                          :items="Service3"
                          item-value="sec"
                          item-title="name"
                          :label="Label3"
                          :rules="[v => !!v || '必填欄位！']"
                          variant="solo"
                          rounded="lg"
                          hide-details="auto"
                          no-data-text="請先選取縣市/鄉鎮市區"
                        >
                          <template v-slot:item="{ props, item }">
                            <v-list-item
                              v-bind="props"
                              :title="item.raw.name"
                            >
                            </v-list-item>
                          </template>
                        </v-select>
                      </v-col>
                    </v-row>
                    <v-row v-if="serviceType && serviceType === 3 && Model1 && (Model1 === 2 || Model1 === 3)">
                      <v-col class="py-1 py-sm-4">
                        <v-radio-group
                          v-model="zone"
                          hide-details="auto"
                          inline
                          class="pt-0 mt-0"
                          color="cyan-darken-4"
                        >
                          <v-radio
                            value="121"
                          >
                            <template v-slot:label>
                              <p class="text-h6 text-sm-h4 ps-sm-1">121 Zone</p>
                            </template>
                          </v-radio>
                          <v-radio
                            class="ml-4"
                            value="119"
                          >
                            <template v-slot:label>
                              <p class="text-h6 text-sm-h4 ps-sm-1">119 Zone</p>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                    <template v-if="serviceType && serviceType === 999">
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="TextModel3"
                            :label="TextLabel3"
                            :placeholder="TextPlaceholder3"
                            :rules="Text3Rules"
                            variant="solo"
                            rounded="lg"
                            class="bg-text-white"
                            hide-details="auto"
                            :hint="`一組地號包含母、子號各4位數，母、子號之間以「-」分隔，每一組地號再以「,」分隔`"
                            @input="removeSpaces"
                          />
                        </v-col>
                      </v-row>
                    </template>
                    <!-- (母地號、子地號) or (Ｘ坐標、Ｙ坐標)-->
                    <template v-if="serviceType && (serviceType === 2 || (serviceType === 3 && Model1 && Model1 !== 1))" >
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="TextModel1"
                            :label="TextLabel1"
                            :placeholder="TextPlaceholder1"
                            :rules="lonRules"
                            variant="solo"
                            rounded="lg"
                            class="bg-text-white"
                            hide-details="auto"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="TextModel2"
                            :label="TextLabel2"
                            :placeholder="TextPlaceholder2"
                            :rules="latRules"
                            variant="solo"
                            rounded="lg"
                            class="bg-text-white"
                            hide-details="auto"
                          />
                        </v-col>
                      </v-row>
                    </template>
                    <template v-if="serviceType && serviceType === 3 && Model1 && Model1 === 1">
                      <!--坐標選單資料X-->
                      <v-row justify="space-evenly">
                        <v-col cols="auto" sm="2" class="align-self-center pe-1 pe-sm-0">
                          <div class="text-center text-body-1 text-sm-h4">東經</div>
                        </v-col>
                        <!--經緯度(度分秒)-->
                        <v-col cols="10" class="ps-0">
                          <v-row class="ml-0">
                            <v-col cols="4" class="px-xxs-6">
                              <v-text-field
                                v-model="lonDMS.d"
                                placeholder="121"
                                suffix="度"
                                :rules="lonDRules"
                                variant="solo"
                                rounded="lg"
                                class="bg-text-white"
                                hide-details="auto"
                                />
                            </v-col>
                            <v-col cols="4" class="px-xxs-6">
                              <v-text-field
                                v-model="lonDMS.m"
                                placeholder="31"
                                suffix="分"
                                :rules="[v => !!v || '必填欄位！']"
                                variant="solo"
                                rounded="lg"
                                class="bg-text-white"
                                hide-details="auto"
                                />
                            </v-col>
                            <v-col cols="4" class="px-xxs-6">
                              <v-text-field
                                v-model="lonDMS.s"
                                placeholder="1.48"
                                suffix="秒"
                                :rules="[v => !!v || '必填欄位！']"
                                variant="solo"
                                rounded="lg"
                                class="bg-text-white"
                                hide-details="auto"
                                />
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <!--坐標選單資料Y-->
                      <v-row justify="space-evenly">
                        <v-col cols="auto" sm="2" class="align-self-center pe-1 pe-sm-0">
                          <div class="text-center text-body-1 text-sm-h4">北緯</div>
                        </v-col>
                        <!--經緯度(度分秒)-->
                        <v-col cols="10" class="ps-0">
                          <v-row class="ml-0">
                            <v-col cols="4" class="px-xxs-6">
                              <v-text-field
                                v-model="latDMS.d"
                                placeholder="25"
                                suffix="度"
                                :rules="latDRules"
                                variant="solo"
                                rounded="lg"
                                class="bg-text-white"
                                hide-details="auto"
                                />
                            </v-col>
                            <v-col cols="4" class="px-xxs-6">
                              <v-text-field
                                v-model="latDMS.m"
                                placeholder="2"
                                suffix="分"
                                :rules="[v => !!v || '必填欄位！']"
                                variant="solo"
                                rounded="lg"
                                class="bg-text-white"
                                hide-details="auto"
                                />
                            </v-col>
                            <v-col cols="4" class="px-xxs-6">
                              <v-text-field
                                v-model="latDMS.s"
                                placeholder="52.51"
                                suffix="秒"
                                :rules="[v => !!v || '必填欄位！']"
                                variant="solo"
                                rounded="lg"
                                class="bg-text-white"
                                hide-details="auto"
                                />
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <div class="text-center mt-4">
                        <v-btn
                        color="indigo-darken-3"
                        prepend-icon="mdi-map-marker"
                        rounded="xl"
                        density="comfortable"
                        variant="flat"
                        size="large"
                        class="px-4 smallup-chip-h smallup-btn-radius text-sm-h4 px-sm-6"
                        @click="DMSmarker"
                        >搜尋經緯度定位</v-btn>
                      </div>
                    </template>
                  </v-form>

                  <div class="text-center pb-4 pt-4 pb-sm-8 pt-sm-4">
                    <v-btn
                      color="indigo-darken-3"
                      prepend-icon="mdi-map-search"
                      rounded="xl"
                      density="comfortable"
                      variant="flat"
                      size="large"
                      v-if="this.serviceType !== 999"
                      class="px-4 smallup-chip-h smallup-btn-radius text-sm-h4 px-sm-6"
                      @click="searchImg('map')"
                      >
                      <span v-if="serviceType && serviceType !== 3">
                        查看電子地圖資訊
                      </span>
                      <span v-else-if="serviceType && serviceType === 3 && Model1 && Model1 === 1 && this.magnify.searchInfo.center.length === 0">
                        請先搜尋經緯度定位
                      </span>
                      <span v-else>
                        查看電子地圖資訊
                      </span>

                      <!-- :disabled="this.magnify.searchInfo.center.length === 0" -->
                    </v-btn>
                  </div>

                </v-card-text>
                <div class="bg-cyan-darken-3 py-2 py-sm-4">
                  <v-row class="justify-center justify-sm-space-between align-center">
                    <v-col cols="auto" sm="1"></v-col>
                    <v-col cols="auto" sm="6" class="text-center text-sm-end">
                      <p class="text-h6 text-sm-h3 font-weight-bold">指定拍攝日期</p>
                    </v-col>
                    <v-col cols="auto" sm="5" class="text-end text-sm-center">
                      <v-btn
                        color="#EDFDC4"
                        rounded="xl"
                        density="comfortable"
                        variant="flat"
                        size="large"
                        class="px-3 smallup-chip-h smallup-btn-radius text-sm-h4"
                        @click="addShootingOptions"
                        >
                        <v-icon>mdi-plus-circle</v-icon>
                        <span class="ms-1">
                          新增日期
                        </span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
                <v-card-text class="pa-0 bg-teal-lighten-5">
                  <v-form ref="dateOptions">
                    <div v-for="(option, index) in dateOptions" :key="index">
                      <v-row class="ma-0 pa-0 pt-2 pb-3">
                        <v-col cols="12" sm="5">
                          <v-menu
                            v-model="option.showDate"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            class="menu-date-left"
                          >
                            <template v-slot:activator="{ props }">
                              <v-text-field
                                v-model="option.tempappointeddate"
                                readonly
                                color="cyan-darken-2"
                                class="v-date-input"
                                variant="solo"
                                rounded="lg"
                                prepend-inner-icon="mdi-calendar"
                                placeholder="選擇拍攝日期"
                                label="選擇拍攝日期"
                                hide-details="auto"
                                v-bind="props"
                                required
                                :rules="[v => !!v || '必填欄位！']"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="option.appointeddate"
                              min="1973-01-01"
                              :max="(new Date(Date.now())).toISOString().substr(0, 10)"
                              color="cyan-darken-2"
                              bg-color="teal-lighten-5"
                              no-title
                              scrollable
                              hide-header
                              @update:modelValue="updateTmpDate(index)"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="12" sm="7">
                          <v-select
                            v-model="option.policy"
                            :items="policyConfig"
                            item-value="text"
                            density="comfortable"
                            label="查無指定拍攝日期的處理原則"
                            variant="solo"
                            rounded="lg"
                            hide-details="auto"
                            required
                            :rules="[v => !!v || '必填欄位！']"
                          >
                            <template v-slot:item="{ props, item }">
                              <v-list-item
                                v-bind="props"
                                :title="item.title"
                              >
                              </v-list-item>
                            </template>
                          </v-select>
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="option.memo"
                            variant="solo"
                            rounded="lg"
                            label="其他備註"
                            placeholder="限：指定影像檔名或卷片號..."
                            hide-details="auto"
                            class="bg-text-white"
                            :rules="memoRules"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" v-if="index !== 0" class="text-center">
                          <v-btn
                            color="red-darken-4"
                            prepend-icon="mdi-close-circle"
                            rounded="xl"
                            density="comfortable"
                            variant="flat"
                            size="large"
                            class="px-3 mx-4 smallup-reload-h smallup-btn-radius text-sm-h5"
                            @click="deletedateOptions(index)"
                            >刪除
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-divider :thickness="2" color="cyan-darken-2" class="border-opacity-75"></v-divider>
                    </div>
                  </v-form>

                  <div class="py-3 py-sm-6 px-auto text-center">
                    <p class="pb-3 text-body-1 text-sm-h4">請點選申請規格(擇一)：</p>
                    <div>
                      <v-chip-group
                        v-model="appFormatTypeSelection"
                        filter
                        selected-class="bg-cyan-darken-2 text-white"
                        column
                        mandatory
                        class="d-flex justify-center"
                      >
                        <v-chip rounded="xl" variant="flat" size="large" class="ma-0 mx-2 mb-3 font-weight-bold smallup-chip-h smallup-btn-radius text-sm-h4 px-sm-6" value="30 x 30">30x30cm紙圖 (300元/張)</v-chip>

                        <v-chip rounded="xl" variant="flat" size="large" class="ma-0 mx-2 mb-3 font-weight-bold smallup-chip-h smallup-btn-radius text-sm-h4 px-sm-6" value="50 x 50">50x50cm紙圖 (500元/張)</v-chip>

                      </v-chip-group>
                    </div>

                  </div>
                </v-card-text>
              </v-card>
            </div>

          </div>

          <div class="d-flex justify-space-around mb-6 mt-3 px-4">
            <RouterLink to="/admin/expand" class="text-white text-decoration-none">
              <v-btn rounded="xl" variant="flat" color="cyan-darken-3" size="large" prepend-icon="mdi-close" class="text-h6 my-1 smallup-btn-h smallup-btn-radius text-sm-h4">取消</v-btn>
            </RouterLink>
            <div class="text-white text-decoration-none">
              <v-btn rounded="xl" variant="flat" color="cyan-darken-3" size="large" prepend-icon="mdi-check" class="text-h6 my-1 smallup-btn-h smallup-btn-radius text-sm-h4" @click="searchImg('addList')">加入申請清單</v-btn>
            </div>
          </div>
        </div>
        <FrontFooter />
      </v-layout>
    </v-col>
    <ApplicationPopup class="position-absolute" style="z-index: 1000;" v-if="ImgMapDialog" @close="closeApplicationPopup" :serviceType="serviceType"></ApplicationPopup>
  </v-row>
  <div class="text-center">
    <v-overlay
      :model-value="overlay"
      class="align-center justify-center"
      persistent
    >
      <v-progress-circular
        color="cyan-darken-4"
        size="64"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import FrontHeader from '@/components/FrontHeader.vue'
import FrontFooter from '@/components/FrontFooter.vue'
// import { mapState, mapActions } from 'pinia'
// import { useLoginStore } from '@/store/login'
// import { helper, registry, query } from '@/mixins'
import { useVuelidate } from '@vuelidate/core'
// import PositionPin from '@/components/PositionPin.vue'
import ApplicationPopup from '@/components/ApplicationPopup.vue'
import { transform } from 'ol/proj'
import { LineString } from 'ol/geom'
import { getLength } from 'ol/sphere'
import { boundingExtent, getCenter } from 'ol/extent'

export default {
  // mixins: [helper, registry, query],
  data () {
    return {
      tmpAutoSearch: { desc: '', full_addr: '', lat: null, lon: null, x: null, y: null },
      ImgMapDialog: true,
      ImgMapBtn: false,
      serviceType: null,
      appFormatTypeSelection: '30 x 30',
      serviceList: [
        { id: 1, title: '門牌位置', source: '服務來源: 內政部地理資訊圖資雲服務平台', hint: '門牌地址', apiRef: 10, icon: '', show: false },
        { id: 2, title: '地籍位置', source: '服務來源: 地政司地籍圖資網路便民服務系統', hint: '段號查詢條件', apiRef: 20, icon: 'architecture' },
        { id: 3, title: '坐標位置', hint: '經緯度坐標', apiRef: 60, icon: '', show: false },
        { id: 999, title: '表單填寫(適用多筆地號)', hint: '申請單' }
      ],
      policyConfig: [
        { title: '往指定拍攝日期「前」找最靠近', text: '往前找' },
        { title: '往指定拍攝日期「後」找最靠近', text: '往後找' }
      ],
      dateOptions: [{
        showDate: false,
        policy: '',
        appointeddate: null,
        tempappointeddate: null,
        memo: ''
      }],
      coordsysSelectType: [
        { id: 4, title: 'WGS84經緯度(十進位)' },
        { id: 1, title: 'WGS84經緯度(度分秒)' },
        { id: 2, title: 'TWD97二度分帶平面直角' },
        { id: 3, title: 'TWD67二度分帶平面直角' }
      ],
      composing: false,
      AutoSelect: null,
      AutoSearch: null,
      Label1: '',
      Label2: '',
      Label3: '',
      // TextLabel1: '',
      // TextLabel2: '',
      Model1: null,
      Model2: null,
      Model3: null,
      Service1: [],
      Service2: [],
      Service3: [],
      zone: '121',
      TextModel1: '',
      TextModel2: '',
      TextModel3: '',
      TextLabel1: '',
      TextLabel2: '',
      TextLabel3: '',
      TextPlaceholder1: '',
      TextPlaceholder2: '',
      TextPlaceholder3: '',
      lonDMS: { d: null, m: null, s: null },
      latDMS: { d: null, m: null, s: null },
      ComboModel: '',
      getComboItems: null,
      ComboItems: [],
      ComboLabel: '',
      outTraceInfo: '',
      AutoItems: [],
      timeoutId: null,
      AutoLoading: false,
      overlay: false,
      magnify: {
        initMapView: null,
        initMapCenter: [],
        initMapZoom: 2,
        imageBase: [],
        // 保留快速定位當下的查詢方式與條件
        searchInfo: {
          multiplePin: {
            title: '',
            success: [],
            fail: []
          },
          method: '',
          center: []
        },
        showApplicationPopupV4: false,
        positionDesc: '',
        // 尚未完成的申請單：已定位之項目
        magnifyPositionLists: [],
        // 已選取，確定要加入申請單的定位點
        selectedPositionLists: [],
        showApplicationContactForm: {
          lists: false,
          popup: false
        },
        // 已完成的申請單
        applicationLists: [],
        // 已完成的申請單 > 查看內容 (popup) state.magnify.applicationList = list
        showApplicationList: false,
        applicationList: {},
        // 已完成的申請單 > 查看回覆 (popup)
        showApplicationReplyPopup: false,
        applicationReply: [],
        pageTab: 'magnigy-tabs-5-2'
      }
    }
  },
  setup: () => ({ v$: useVuelidate() }),
  components: {
    FrontHeader,
    FrontFooter,
    ApplicationPopup
    // PositionPin
  },
  computed: {
    // ...mapState(useLoginStore, ['magnify', 'appFormatType', 'userlogdata']),
    memoRules () {
      return [
        value => !value || /^[\w._~-]+$/.test(value) || '檔名或卷片號的組成為英文字母、數字或符號',
        value => !value || (value.length < 16) || '檔名或卷片號限定長度為15'
      ]
    },
    lonRules () {
      if (this.serviceType === 3 && this.Model1) {
        if (this.Model1 === 4) {
          return [
            value => !!value || '此欄位必填',
            value => (value >= 119.0000 && value <= 123.0000) || '範圍須介於119-123間',
            value => /^\d{3}\.\d{4,}/.test(value) || '請至輸入至小數第四位'
          ]
        } else {
          return [
            value => !!value || '此欄位必填',
            value => (value >= 43000 && value <= 355000) || '範圍須介於43000-355000間'
          ]
        }
      } else {
        return [
          value => !!value || '此欄位必填'
        ]
      }
    },
    latRules () {
      if (this.serviceType === 3 && this.Model1) {
        if (this.Model1 === 4) {
          return [
            value => !!value || '此欄位必填',
            value => (value >= 21.5000 && value <= 25.5000) || '範圍須介於21.5-25.5間',
            value => /^\d{2}\.\d{4,}/.test(value) || '請至輸入至小數第四位'
          ]
        } else {
          return [
            value => !!value || '此欄位必填',
            value => (value >= 2400000 && value <= 2800000) || '範圍須介於2423000-2800000間'
          ]
        }
      } else {
        return [
          value => !!value || '此欄位必填'
        ]
      }
    },
    Text3Rules () {
      return [
        value => !!value || '此欄位必填'
      ]
    },
    lonDRules () {
      return [
        value => !!value || '此欄位必填',
        value => (value >= 119 && value <= 122) || '範圍須介於119-122間',
        value => !Number.isInteger(value) || '必須為整數'
      ]
    },
    latDRules () {
      return [
        value => !!value || '此欄位必填',
        value => (value >= 22 && value <= 25) || '範圍須介於22-25間',
        value => !Number.isInteger(value) || '必須為整數'
      ]
    },
    comboRules () {
      if (this.serviceType === 1) {
        return [
          value => !!value || '此欄位必填'
        ]
      }
      return []
    },
    originalImgData () {
      return this.storeResults.table.data.map(img => {
        const extent = boundingExtent(this.transformCoordinate(img.bbox_wktstr))
        img.center = getCenter(extent)
        return img
      })
    }
  },
  watch: {
    async serviceType (val) {
      await this.resetForm()
      this.magnify.searchInfo.center = []
      if (!val) return
      switch (val) {
        case 1:
          this.Label1 = '縣市'
          this.Label2 = '鄉鎮市區'
          this.ComboLabel = '輸入門牌地址'
          this.getLandCity()
            .then(res => {
              if (res.success) {
                this.Service1 = res.results
              }
            })
          break
        case 2:
          this.Label1 = '縣市'
          this.Label2 = '鄉鎮市區'
          this.Label3 = '段名'
          this.TextLabel1 = '母地號'
          this.TextLabel2 = '子地號(若無，請填"0")'
          this.getLandCity()
            .then(res => {
              if (res.success) {
                this.Service1 = res.results
              }
            })
          break
        case 3:
          this.Label1 = '坐標系統'
          this.Service1 = this.coordsysSelectType
          this.TextLabel1 = 'X坐標'
          this.TextLabel2 = 'Y坐標'
          break
        case 999:
          this.Label1 = '縣市'
          this.Label2 = '鄉鎮市區'
          this.Label3 = '段名'
          this.TextLabel3 = '地號 (範例：0427-0013, 0427-0012, ...)'
          // this.storeResults.table.data = []
          this.getLandCity()
            .then(res => {
              if (res.success) {
                this.Service1 = res.results
              }
            })
          break
      }
    },
    Model1 (val) {
      this.Model2 = ''
      if (!val) return
      this.$refs.position.resetValidation()
      if (this.serviceType === 2 || this.serviceType === 999) {
        this.getLandTown(val).then(res => {
          this.Service2 = res
        })
      } else if (this.serviceType === 4) {
        this.getTownByCityid(val).then(res => {
          if (res) this.Service2 = res
        })
      } else if (this.serviceType === 3) {
        this.magnify.searchInfo.center = []
        if (this.Model1 === 1) {
          this.lonDMS = { d: null, m: null, s: null }
          this.latDMS = { d: null, m: null, s: null }
        }
        this.TextPlaceholder1 = val === 4 ? '範例：121.0000' : '範例：50000'
        this.TextPlaceholder2 = val === 4 ? '範例：25.0000' : '範例：2500000'
        this.TextModel1 = ''
        this.TextModel2 = ''
      }
    },
    Model2 (val) {
      this.Model3 = null
      if (!val) return
      if (this.serviceType === 2 || this.serviceType === 999) {
        this.getLandSec(val).then(res => {
          this.Service3 = res.map(item => {
            const lowercaseKeys = obj => Object.keys(obj).reduce((acc, key) => {
              acc[key.toLowerCase()] = obj[key]
              return acc
            }, {})
            return lowercaseKeys(item)
          })
        })
      } else if (this.serviceType === 4) {
        const desc = `${this.Model1.name}, ${this.Model2.name}`
        this.getLocVal = { desc, city: this.Model1, town: this.Model2 }
        this.getArea(this.getLocVal, 4).then(res => {
          if (!res) return
          this.getLocVal = { ...this.getLocVal, geometry: res.geo_json }
        })
      }
    },
    TextModel1 (val) {
      if (val) this.TextModel2 = ''
    },
    async TextModel2 (val) {
      if (val && this.serviceType === 2) {
        if (this.Model1 && this.Model2 && this.Model3) {
          const updatedLandModel1 = this.calLandNo(this.TextModel1)
          const updatedLandModel2 = this.calLandNo(val)
          const landNo = `${updatedLandModel1}${updatedLandModel2}`
          const Model3ItemCity = this.Service1.find(item => item.code === this.Model1)
          const Model3ItemTown = this.Service2.find(item => item.code === this.Model2)
          const Model3Item = this.Service3.find(item => item.sec === this.Model3)
          const desc = `${Model3ItemCity.name}, ${Model3ItemTown.name}, ${Model3Item.name}, ${landNo}`
          this.magnify.searchInfo.multiplePin.title = `${Model3ItemCity.name}, ${Model3ItemTown.name}, ${Model3Item.name}, ${landNo}`
          // this.getLocVal = { desc, city: this.Model1, town: this.Model2, sec: this.Model3, landNo }
          this.getLocVal = { desc, city: { code: this.Model1, name: `${Model3ItemCity.name}` }, town: { code: this.Model2, name: `${Model3ItemTown.name}` }, sec: Model3Item, landNo }
          await this.getArea(this.getLocVal, 2).then(res => {
            if (!res.success) {
              alert(res.message)
              // this.resetForm()
              this.serviceType = 2
            } else {
              this.getLocVal = { ...this.getLocVal, lon: res.results.center[1], lat: res.results.center[0], geometry: { type: 'Point', coordinates: res.results.center.reverse() } }
              this.magnify.searchInfo.multiplePin.success.push(`${updatedLandModel1}-${updatedLandModel2}`)
              if (this.magnify.searchInfo.center.length !== 0) {
                // this.magnify.searchInfo.center.splice(0, this.magnify.searchInfo.center.length)
                this.magnify.searchInfo.center = []
              }
              // this.magnify.searchInfo.center.push(this.getLocVal.geometry.coordinates);
              this.magnify.searchInfo.center = this.getLocVal.geometry.coordinates
            }
          })
        } else {
          alert('請先選擇縣市、鄉鎮市區、段名')
          this.TextModel2 = ''
        }
      } else if (val && this.serviceType === 3) {
        const coordTypeDetail = this.Model1 === 4 ? '經緯度' : '二度分帶'
        const desc = `${coordTypeDetail}[${this.TextModel1}, ${val}]`
        const x = Number(this.TextModel1)
        const y = Number(val)
        const lonlat = this.transferTolonlat(x, y, this.Model1)
        this.getLocVal = { desc, coordType: this.Model1, lon: lonlat[0], lat: lonlat[1], x, y, zone: this.zone, geometry: { type: 'Point', coordinates: lonlat } }
        if (this.Model1 === 4) {
          this.magnify.searchInfo.multiplePin.title = ` 經緯度 [${this.TextModel1}, ${val}] `
        } else {
          this.magnify.searchInfo.multiplePin.title = ` 二度分帶 [${this.TextModel1}, ${val}] `
        }
        if (val.length === 7) {
          this.checkMapType()
        }
      }
    },
    async TextModel3 (val) {
      if (val && this.serviceType === 999) {
        if (this.Model1 && this.Model2 && this.Model3) {
          const Model3Item = this.Service3.find(item => item.sec === this.Model3)
          const Model3ItemCity = this.Service1.find(item => item.code === this.Model1)
          const Model3ItemTown = this.Service2.find(item => item.code === this.Model2)
          const valFormat = this.formatTextModel3(val)
          const desc = `${Model3ItemCity.name}, ${Model3ItemTown.name}, ${Model3Item.name}, ${valFormat}`
          this.magnify.searchInfo.multiplePin.title = `${Model3ItemCity.name}, ${Model3ItemTown.name}, ${Model3Item.name}, ${valFormat}`

          this.getLocVal = { desc, city: { code: this.Model1, name: `${Model3ItemCity.name}` }, town: { code: this.Model2, name: `${Model3ItemTown.name}` }, sec: Model3Item, valFormat }
        } else {
          alert('請先選擇縣市、鄉鎮市區、段名')
          this.TextModel3 = ''
        }
      }
    },
    AutoSearch (val) {
      if (val === null || val === '') {
        this.AutoItems = []
        this.AutoLoading = false
      }
      if (val && val !== this.AutoSelect) {
        this.updateSearchInput(val)
      }
    },
    AutoSelect (val) {
      this.tmpAutoSearch = val

      if (val) {
        if (val.lat === null || val.lon === null) {
          this.magnify.searchInfo.center = []
          // confirm('未成功定位地址，故無法查看電子地圖，請先確認地址是否正確，若仍無法定位，您依然可送出申請單，後續將由相關人員為您處理該筆申請單，謝謝!')
        } else {
          this.getLocVal = {
            desc: val.full_addr,
            lon: val.x,
            lat: val.y,
            geometry: {
              type: 'Point',
              coordinates: [val.x, val.y]
            }
          }
          this.magnify.searchInfo.multiplePin.title = val.full_addr

          if (this.magnify.searchInfo.center.length === 0) {
            // this.magnify.searchInfo.center.push(this.getLocVal.geometry.coordinates);
            this.magnify.searchInfo.center = this.getLocVal.geometry.coordinates
          } else {
            this.magnify.searchInfo.center = []
            // this.magnify.searchInfo.center.push(this.getLocVal.geometry.coordinates);
            this.magnify.searchInfo.center = this.getLocVal.geometry.coordinates
          }
        }
      }
    }
  },
  methods: {
    // ...mapActions(useLoginStore, ['editApplyingPosition']),
    handleCompositionStart () {
      this.composing = true
    },
    handleCompositionEnd () {
      this.composing = false
    },
    removeSpaces () {
      this.TextModel3 = this.TextModel3.replace(/\s/g, '')
    },
    formatTextModel3 (input) {
      let groups = input.split(',')
      groups = groups.map(group => {
        let numbers = group.split('-')
        numbers = numbers.map(number => {
          return number.padStart(4, '0')
        })
        if (numbers.length === 1) {
          numbers.push('0000')
        }
        return numbers.join('-')
      })
      return groups.join(', ')
    },
    async DMSmarker () {
      const locationValid = await this.$refs.locationFilter.validate()
      const positionValid = await this.$refs.position.validate()
      if (!locationValid.valid) return
      if (!positionValid.valid) return

      this.checkMapType()
    },
    async addToMagnifyPositionLists () {
      const dateValid = await this.$refs.dateOptions.validate()
      if (dateValid.valid) {
        this.dateOptions.forEach(option => {
          const imgsbylength = this.originalImgData.sort((a, b) => {
            const searchCenter = transform(this.magnify.searchInfo.center, 'EPSG:4326', 'EPSG:3857')
            const aLength = getLength(new LineString([a.center, searchCenter]))
            const bLength = getLength(new LineString([b.center, searchCenter]))
            return aLength - bLength
          }).map(img => {
            return { filename: img.filename, shootingdate: img.shootingdate }
          }).splice(0, 5)

          const searchDate = new Date(option.tempappointeddate).getTime()
          const imgsbydate = this.originalImgData.filter(img => {
            if (option.policy === '往後找') {
              return new Date(img.shootingdate).getTime() - searchDate >= 0
            } else {
              return new Date(img.shootingdate).getTime() - searchDate <= 0
            }
          }).sort((a, b) => {
            let aDateDif, bDateDif
            if (option.policy === '往後找') {
              aDateDif = new Date(a.shootingdate).getTime() - searchDate
              bDateDif = new Date(b.shootingdate).getTime() - searchDate
            } else {
              aDateDif = searchDate - new Date(a.shootingdate).getTime()
              bDateDif = searchDate - new Date(b.shootingdate).getTime()
            }
            return aDateDif - bDateDif
          }).map(img => {
            return { filename: img.filename, shootingdate: img.shootingdate }
          }).splice(0, 5)

          const crypto = window.crypto || window.msCrypto
          const array = new Uint32Array(1)
          const matchingService = this.serviceList.find(service => service.id === this.serviceType)
          this.magnify.searchInfo.method = matchingService.title
          const applicationPosition = {
            id: crypto.getRandomValues(array)[0],
            ...this.magnify.searchInfo,
            ...option,
            imgsbylength,
            imgsbydate,
            applicationformat: this.appFormatType.filter(format => format.format === this.appFormatTypeSelection)[0].format_id
          }
          this.editApplyingPosition({ item: applicationPosition })
        })
      }
    },
    async checkMapType () {
      if (this.serviceType === 3 && this.magnify.searchInfo.center.length !== 0) {
        // this.magnify.searchInfo.center.splice(0, this.magnify.searchInfo.center.length)
        this.magnify.searchInfo.center = []
      }
      if (this.serviceType === 3 && this.Model1 === 1) {
        const lonlat = this.transferTolonlat(null, null, this.Model1)
        this.getLocVal = {
          desc: `度分秒 [${this.lonDMS.d}-${this.lonDMS.m}-${this.lonDMS.s}, ${this.latDMS.d}-${this.latDMS.m}-${this.latDMS.s}]`,
          coordType: this.Model1,
          lon: lonlat[0],
          lat: lonlat[1],
          x: this.lonDMS,
          y: this.latDMS,
          zone: this.zone,
          geometry: { type: 'Point', coordinates: lonlat }
        }
        // this.magnify.searchInfo.center.push(this.getLocVal.geometry.coordinates);
        this.magnify.searchInfo.center = this.getLocVal.geometry.coordinates
        this.magnify.searchInfo.multiplePin.title = this.getLocVal.desc
      } else if (this.serviceType === 3 && this.Model1 === 4) {
        // this.magnify.searchInfo.center.push(this.getLocVal.geometry.coordinates);
        this.magnify.searchInfo.center = this.getLocVal.geometry.coordinates
      } else if (this.serviceType === 3 && (this.Model1 === 2 || this.Model1 === 3)) {
        // this.magnify.searchInfo.center.push(this.getLocVal.geometry.coordinates);
        this.magnify.searchInfo.center = this.getLocVal.geometry.coordinates
      }

      if (this.serviceType === 1 && this.AutoSelect.lat === null && this.AutoSelect.lon === null) {
        this.getLocVal = {
          desc: this.AutoSelect.desc,
          lon: null,
          lat: null,
          geometry: {
            type: 'Point',
            coordinates: [null, null]
          }
        }
        this.magnify.searchInfo.multiplePin.title = this.AutoSelect.desc
      } else if (this.serviceType === 999) {
        this.magnify.searchInfo.center = []
      }
      if (this.serviceType !== 999) {
        await this.getImage({ btnType: '申請放大航空照片', criteria: { ...this.getLocVal, type: this.serviceType } })
      }
    },
    async searchImg (type) {
      if (type === 'map') {
        const locationValid = await this.$refs.locationFilter.validate()
        const positionValid = await this.$refs.position.validate()
        if (!locationValid.valid) return
        if (!positionValid.valid) return

        if (!(this.serviceType === 3 && this.Model1 === 1)) {
          await this.checkMapType()
        }
        if (this.magnify.searchInfo.center.length > 0) { this.ImgMapDialog = true }
      } else if (type === 'addList') {
        const locationValid = await this.$refs.locationFilter.validate()
        const positionValid = await this.$refs.position.validate()
        const dateValid = await this.$refs.dateOptions.validate()
        if (!locationValid.valid) return
        if (!positionValid.valid) return
        if (!dateValid.valid) return

        await this.checkMapType()
        // const roleid = JSON.parse(localStorage.getItem('ldata'))?.roleid //身份
        // const roleid = this.userlogdata?.roleid //身份
        this.overlay = !this.overlay
        await new Promise(resolve => setTimeout(resolve, 5000))
        await this.addToMagnifyPositionLists()
        await new Promise(resolve => {
          setTimeout(() => {
            this.overlay = false
            resolve()
          }, 200)
        })
        await this.$router.push('/admin/location-filter')
      }
    },
    async getImage (info) {
      const searchInfo = {
        imgtype: ['original'],
        searchType: info.btnType,
        since: '1973-01-01',
        till: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      }
      await this.getImageList('Coordinate', searchInfo, info)
    },
    clearAutoSearch () {
      this.AutoSearch = ''
      this.AutoItems = []
      this.AutoLoading = false
    },
    updateFocused (val) {
      if (val === false) {
        if (this.tmpAutoSearch && this.tmpAutoSearch.lat === null) {
          this.tmpAutoSearch = { desc: this.AutoSearch, full_addr: this.AutoSearch, lat: null, lon: null, x: null, y: null }
          this.AutoSelect = this.tmpAutoSearch
        }
      } else {
        this.tmpAutoSearch =
        {
          desc: '',
          full_addr: '',
          lat: null,
          lon: null,
          x: null,
          y: null
        }
      }
    },
    updateSearchInput (val) {
      clearTimeout(this.timeoutId)
      this.AutoLoading = true
      this.timeoutId = setTimeout(() => {
        if (val && this.serviceType === 1 && val.length > 8 && this.composing === false) {
          this.getAddress(val).then(res => {
            if (res) {
              this.outTraceInfo = res.out_trace_info
              if (res && Array.isArray(res.data)) {
                this.AutoItems = res.data.map(addr => {
                  const desc = addr.full_addr
                  return Object.assign({}, addr, { desc, lon: addr.x, lat: addr.y })
                })
              }
            }
            this.AutoLoading = false
          })
        }
      }, 300)
    },
    filterObject (itemText, queryText, item) {
      if (queryText === '') {
        return undefined
      }
      if (item && this.serviceType === 1) {
        return true
      }
      return (item && (item.frameindex.indexOf(queryText) > -1 || item.frameno.indexOf(queryText) > -1))
    },
    transferTolonlat (x, y, typeId) {
      let epsgType
      if (typeId === 2) epsgType = this.zone === '121' ? 'EPSG:3826' : 'EPSG:3825'
      else if (typeId === 3) epsgType = this.zone === '121' ? 'EPSG:3828' : 'EPSG:3827'

      if (typeId === 4) return [parseFloat(x), parseFloat(y)]
      else if (typeId === 1) return [parseFloat((parseFloat(this.lonDMS.d) + (parseFloat(this.lonDMS.m) / 60) + (parseFloat(this.lonDMS.s) / 3600)).toFixed(8)), parseFloat((parseFloat(this.latDMS.d) + (parseFloat(this.latDMS.m) / 60) + (parseFloat(this.latDMS.s) / 3600)).toFixed(8))]
      else return this.Proj4Transfer([parseFloat(x), parseFloat(y)], epsgType, 'EPSG:4326')
    },
    getArea (val, id) {
      switch (id) {
        case 2:
          return this.getLocationLandQuery(val.sec.unit, val.sec.sec, val.landNo)
        case 4:
          return this.getAdminRegionGeo(val.town.id)
        case 5:
          return this.getFrame5kGeo(val.frameno)
      }
    },
    calLandNo (val) {
      const valArray = val ? val.split('') : []
      const num = valArray.length
      for (let i = 0; i < (4 - num); i++) {
        valArray.unshift('0')
      }
      return valArray.join('')
    },
    async resetForm () {
      await this.$refs.position.reset()
      await this.$refs.dateOptions.reset()
      await this.$refs.position.resetValidation()
      await this.$refs.dateOptions.resetValidation()
      // this.magnify.searchInfo.multiplePin.success = []
      this.AutoItems = []
      this.outTraceInfo = ''
      this.getLocVal = null
    },
    updateTmpDate (i) {
      const val = this.dateOptions[i].appointeddate
      const startD = new Date(val)
      startD.setDate(new Date(val).getDate() + 1)
      this.dateOptions[i].tempappointeddate = startD.toISOString().substr(0, 10)
      this.dateOptions[i].showDate = false
    },
    async addShootingOptions () {
      const { valid } = await this.$refs.dateOptions.validate()
      if (!valid) return
      this.dateOptions.push({
        showDate: false,
        policy: '',
        appointeddate: null,
        applicationformat: 2
      })
    },
    deletedateOptions (index) {
      this.dateOptions.splice(index, 1)
    },
    openMapInfo () {
      this.ImgMapDialog = true
      this.initMap()
    },
    closeApplicationPopup () {
      this.ImgMapDialog = false
    },
    searchInfoReset () {
      this.magnify.searchInfo = {
        center: [],
        method: '',
        multiplePin: {
          title: '',
          success: [],
          fail: []
        }
      }
    }
  },
  mounted () {
    this.resetForm()
    // this.searchInfoReset()
  }
}
</script>

<style scoped lang="scss">
.v-select :deep(.v-field--variant-solo-filled) {
  box-shadow: none !important;
}
.v-input :deep(.v-input__details) {
  padding-top: 3px !important;
  padding-bottom: 3px !important;
  // margin-bottom: 10px !important;
  padding-left: 6px !important;
  padding-right: 0px !important;
}
.v-select :deep(.v-field--variant-solo-filled .v-field__overlay) {
  background-color: #00695C !important;
}
.v-slide-group :deep(.v-slide-group__content) {
  justify-content: center !important;
}
.ImgMapDialog :deep(.v-overlay__content) {
  margin: 0px !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100% !important;
  max-height: 100% !important;
}
@media screen and (min-width: 600px) {
  .smallup-btn-verify{
    height: 65px !important;
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
  .v-input :deep(.v-text-field__suffix__text) {
    font-size: 28px !important;
  }
  .v-date-input :deep(.v-field__input) {
    padding-top: 16px !important;
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
  .smallup-reload-h{
    height: 50px !important;
  }
  .smallup-chip-h{
    height: 70px !important;
  }
  .menu-date-left :deep(.v-date-picker) {
    width: auto !important;
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
@media screen and (max-width: 380px) {
  .menu-date-left :deep(.v-overlay__content) {
    left: 7.5px !important;
  }
  .px-xxs-6{
    padding: 6px !important;
  }
}
</style>
