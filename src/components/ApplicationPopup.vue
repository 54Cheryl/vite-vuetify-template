<template>
<v-card class="px-sm-4 h-screen w-100 d-flex flex-column">
  <v-card-title class="d-flex align-center pa-0 my-1 px-2 py-2 px-sm-4 py-sm-4">
    <p class="text-h5 text-sm-h4 ps-4 ps-sm-0 text-cyan-darken-4 font-weight-bold">電子地圖資訊：</p>
  </v-card-title>
  <v-card-text class="py-0 px-2 px-sm-0 flex-grow-1 d-flex flex-column">
    <div class="flex-grow-1">
      <div id="eMap" class="magnifyMap" ref="eMapContainer"></div>
      <div id="positioningMarkerEMap0" class="positioningMarkerEMap">
        <p class="text-center font-weight-bold">{{ this.magnify.searchInfo.multiplePin.success[0] }}</p>
        <PositionPin/>
      </div>
    </div>
    <div class="mt-4 px-sm-4 overflow-auto MapHeight">
      <p class="text-h5 text-sm-h4 px-4 px-sm-0 text-cyan-darken-4 font-weight-bold d-flex align-center">定位資訊(標記<v-icon color="red-accent-4" class="text-h5">mdi-pin</v-icon>處)：</p>
      <p class="text-h6 text-sm-h5 px-4 px-sm-0 text-cyan-darken-4 font-weight-bold mt-2">
        {{ this.serviceType === 2 ? '地籍位置' : this.serviceType === 1 ? '門牌位置' : '坐標位置' }}-
        <span>{{ this.magnify.searchInfo.multiplePin.title }}</span>
      </p>
      <v-sheet class="pa-2 mx-4 mx-sm-0 mt-2" color="red-lighten-5 rounded-lg" v-if="this.magnify.searchInfo.multiplePin.fail.length !== 0">
        <v-row class="ma-0 pa-0">
          <v-col cols="auto" class="pa-0 pe-1">
            <v-icon color="red-accent-4">
              mdi-alert-octagram
            </v-icon>
          </v-col>
          <v-col class="pa-0">
            <p class="text-body-1 text-sm-h6 text-red-accent-4 font-weight-bold">找不到 {{ this.magnify.searchInfo.multiplePin.title }} <span v-for="(item, index) in this.magnify.searchInfo.multiplePin.fail" :key="index">{{ item }}, </span></p>
          </v-col>
        </v-row>
      </v-sheet>
    </div>
  </v-card-text>
  <v-card-actions class="d-flex justify-center my-2 mb-sm-4">
    <v-btn color="cyan-darken-3" variant="flat" rounded="xl" size="x-large" class="text-h6 text-sm-h5" @click="closeApplicationPopup">關閉</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
// import { mapState } from 'pinia'
// import { useLoginStore } from '@/store/login'
import PositionPin from '@/components/PositionPin.vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { defaults } from 'ol/control'
import Overlay from 'ol/Overlay'
import { transform } from 'ol/proj'

export default {
  props: ['serviceType'],
  data () {
    return {
      eMapContainer: null,
      eMap: null,
      eView: null,
      vectorLayer: null,
      positioningMarkerEMap: null,
      eLayer: {
        type: 'baselayer',
        title: '電子地圖',
        name: 'EMap12',
        label: '通用版電子地圖',
        zIndex: 1,
        visible: true,
        opacity: 1,
        readonly: false,
        desc:
          '為政府機關自行產製的電子地圖，於民國100年建置完成並持續辦理更新維護，更新頻率以2年為週期，並針對全國重要道路與地標、重大工程及使用者反應局部區域變動部分進行動態更新。',
        reflect:
          'https://wmts.nlsc.gov.tw/wmts/EMAP12/default/GoogleMapsCompatible/6/27/53',
        source: new XYZ({
          url: 'https://wmts.nlsc.gov.tw/wmts/EMAP12/default/GoogleMapsCompatible/{z}/{y}/{x}',
          wrapX: false
        })
      },
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
          center: [121.515353, 25.027461]
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
  computed: {
    // ...mapState(useLoginStore, ['magnify'])
  },
  components: {
    PositionPin
  },
  methods: {
    closeApplicationPopup () {
      this.$emit('close')
    },
    initMap () {
      // this.magnify.searchInfo.center = [121.744227, 25.131598]
      // let positioningCoord = transform(this.magnify.searchInfo.center, 'EPSG:4326', 'EPSG:3857')
      // this.positioningMarkerEMap = new Overlay({
      //   id: 'positioningMarkerEMap',
      //   element: document.getElementById('positioningMarkerEMap'),
      //   positioning: 'bottom-center'
      // })
      // this.positioningMarkerEMap.setPosition(positioningCoord)
      this.eView = new View({
        zoom: 15,
        // center: transform(this.magnify.searchInfo.center[0], 'EPSG:4326', 'EPSG:3857')
        center: transform(this.magnify.searchInfo.center, 'EPSG:4326', 'EPSG:3857')
      })
      this.eMap = new Map({
        layers: [
          new TileLayer({
          // ...this.eLayer[0]
            ...this.eLayer
          })
        ],
        target: this.$refs.eMapContainer,
        view: this.eView,
        controls: defaults({ attribution: false })
      })
      const olCenter = []
      olCenter.push(this.magnify.searchInfo.center)

      olCenter.forEach((center, index) => {
        const positioningCoord = transform(center, 'EPSG:4326', 'EPSG:3857') // 直接使用 center 陣列
        const positioningMarkerEMap = new Overlay({
          id: 'positioningMarkerEMap' + index, // 為每個標記創建一個唯一的 ID
          element: document.getElementById('positioningMarkerEMap' + index), // 為每個標記創建一個唯一的元素
          positioning: 'bottom-center'
        })
        positioningMarkerEMap.setPosition(positioningCoord)
        this.eMap.addOverlay(positioningMarkerEMap) // 將標記添加到地圖上
      })

      this.eMap.getLayers().getArray()[0].setVisible(true)
      this.eMap.getLayers().getArray()[0].setOpacity(1)
      // this.eMap.addOverlay(this.positioningMarkerEMap)
    }
  },
  mounted () {
    this.initMap()
  }
}
</script>

<style scoped lang="scss">
.ImgMapDialog :deep(.v-overlay__content) {
  margin: 0px !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100% !important;
  max-height: 100% !important;
}
.magnifyMap {
  width: 100%  !important;
  height: 100% !important;
}
#eMap :deep(.ol-zoom > button) {
  font-size: 2em !important;
  color: white !important;
  background-color: #00838F !important;
}
.MapHeight {
  height: 25vh !important;
}
#eMap :deep(.ol-attribution img) {
    max-height: 2em;
    max-width: calc(100% - 1.3em);
    vertical-align: middle;
}
@media screen and (min-width: 600px) {
  .MapHeight {
    height: 20vh !important;
  }
}
</style>
