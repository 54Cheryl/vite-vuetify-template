<template>
  <div class="d-flex align-center btn-icon-v-img">
    <v-img
      width="100%"
      height="100%"
      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
    ></v-img>
  </div>
  <v-data-table
    v-model:expanded="expanded"
    :headers="dessertHeaders"
    :items="desserts"
    item-value="name"
    show-expand
    show-select
    no-data-text="沒有資料"
    items-per-page-text="每頁列數："
    :items-per-page-options="[{value: 5, title: '5'}, {value: 10, title: '10'}, {value: 15, title: '15'}, {value: -1, title: '全部'}]"
    :pageText="'{2} 條中的 {0}~{1} 條'"
  >
    <template v-slot:headers="{ columns, allSelected, selectAll, someSelected }">
      <tr>
        <template v-for="column in columns" :key="column.key">
          <th class="px-0" v-if="column.key === 'data-table-select'">
            <v-checkbox-btn
              :indeterminate="someSelected && !allSelected"
              :model-value="allSelected"
              color="primary"
              @update:model-value="selectAll(!allSelected)"
            ></v-checkbox-btn>
          </th>
          <th class="px-0" v-else>
            <span class="mr-2 cursor-pointer">{{ column.title }}</span>
          </th>
        </template>
      </tr>
    </template>
    <!-- <template v-slot:header="{ column }">
      <span class="mr-2 cursor-pointer">{{ column.title }}</span>
    </template>
    <template v-slot:[`header.data-table-select`]="{ allSelected, selectAll, someSelected }">
      <v-checkbox-btn
        :indeterminate="someSelected && !allSelected"
        :model-value="allSelected"
        color="primary"
        @update:model-value="selectAll(!allSelected)"
      ></v-checkbox-btn>
    </template> -->
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          More info about {{ item.name }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
// import { mapState } from 'pinia'
// import newsStore from '@/stores/newsStore'
export default {
  data () {
    return {
      expanded: [],
      dessertHeaders: [
        { title: '', key: 'data-table-select', scope: 'col' },
        {
          title: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          key: 'name',
          scope: 'col'
        },
        { title: 'Calories', key: 'calories', scope: 'col' },
        { title: 'Fat (g)', key: 'fat', scope: 'col' },
        { title: 'Carbs (g)', key: 'carbs', scope: 'col' },
        { title: 'Protein (g)', key: 'protein', scope: 'col' },
        { title: 'Iron (%)', key: 'iron', scope: 'col' },
        { title: '', key: 'data-table-expand', scope: 'col' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6
        }
      ]
    }
  },
  components: {
  },
  computed: {
    // ...mapState(newsStore, ['news'])
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.v-input :deep(.v-input__prepend) {
  margin-inline-end: 8px !important;
}
.v-autocomplete :deep(.v-messages) {
  color: #B71C1C !important;
  opacity: 1 !important;
  font-weight: 500 !important;
}
.v-input :deep(.v-input__details) {
  padding-bottom: 6px !important;
  min-height: auto !important;
}
.v-table :deep(.v-data-table-header__content > span) {
  font-size: 16px !important;
  font-weight: bold !important;
}
.v-table :deep(.v-data-table-footer) {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
.v-table :deep(.mdi-chevron-down) {
  font-size: 35px !important;
  // color: #006064 !important;
  color: white !important;
}
.v-table :deep(.mdi-chevron-up) {
  font-size: 35px !important;
  // color: #006064 !important;
  color: white !important;
}
// .v-table :deep(.v-data-table__tr > td > button) {
//   width: calc(var(--v-btn-height)) !important;
//   height: calc(var(--v-btn-height)) !important;
// }
.v-table :deep(.v-data-table-footer){
  .v-pagination__list{
    color: #006064 !important;
  }
}
.v-table :deep(.v-data-table-footer__items-per-page > span) {
  font-size: 16px !important;
}
.v-table :deep(.v-data-table-footer__info) {
  font-size: 16px !important;
}
.v-table :deep(.v-data-table__tr:nth-child(2n)) {
  background-color: #F5F5F5 !important;
}
.v-table :deep(.v-data-table__td) {
  padding: 0 0 !important;
  border-bottom: 1px solid #9e9e9e !important;
}
.v-table :deep(.v-data-table__td > p) {
  padding: 8px 16px !important;
}
.orderText > p {
  padding: 2px 0 !important;
}
.v-table :deep(thead) {
  background-color: rgb(237, 247, 247) !important;
}
.v-table :deep(.v-data-table-header__content) {
  padding: 0 16px !important;
}
.v-table :deep(.v-table__wrapper) {
  border-end-end-radius: 0px !important;
  border-end-start-radius: 0px !important;
}
.v-table {
  border: 1px solid #9e9e9e !important;
}
.CouponDialog :deep(.v-overlay__content) {
  margin: 0px !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100% !important;
  max-height: 100% !important;
}
.CouponTable :deep(.v-data-table__td) {
  font-size: 24px !important;
}
.v-table :deep(.v-data-table__td--expanded-row){
  button {
    background-color: #0097a7 !important;
  }
}
.btn-icon-v-img{
  width: 88px !important;
  height: 88px !important;
  padding: 0 !important;
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
  .page-select-pt :deep(.v-field__input) {
    font-size: 35px !important;
    padding-top: 12px !important;
    min-height: auto !important;
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
  .v-list-item :deep(.v-list-item-title) {
    font-size: 24px !important;
  }
  .smallup-reload-h{
    height: 55px !important;
  }
  .v-date-picker {
    width: 500px !important;
  }
  .v-table :deep(.v-data-table-header__content > span) {
    font-size: 28px !important;
    font-weight: bold !important;
    padding: 10px 0;
  }
  .v-table :deep(.v-data-table-footer) {
    padding-top: 15px !important;
    padding-bottom: 15px !important;
  }
  .v-table :deep(.v-data-table-footer__items-per-page > span) {
    font-size: 24px !important;
  }
  .v-table :deep(.v-data-table-footer__info) {
    font-size: 24px !important;
  }
  .v-table :deep(.v-select__selection-text) {
    font-size: 24px !important;
  }
  .v-table :deep(.v-list > .v-list-item > .v-list-item__content > .v-list-item-title) {
    font-size: 24px !important;
  }
  .v-data-table-footer :deep(.v-list > .v-list-item > .v-list-item__content > .v-list-item-title) {
    font-size: 24px !important;
  }
  .orderText > p {
    padding: 5px 0 !important;
  }
  .v-table :deep(.mdi-chevron-down) {
    font-size: 35px !important;
  }
  .v-table :deep(.mdi-chevron-up) {
    font-size: 35px !important;
  }
  .v-table :deep(.v-btn__content) {
    font-size: 24px !important;
  }
  .CouponDialog :deep(.v-overlay__content) {
    width: auto !important;
    height: auto !important;
  }
  .v-table :deep(.v-data-table__td > p) {
    padding: 16px !important;
  }
  .payTitle {
    font-size: 2.125rem !important;
  }
  .payMemo{
    font-size: 1.5rem !important;
    line-height: 2.2rem !important;
  }
  .btn-icon-v-img{
    width: 130px !important;
    height: 130px !important;
  }
}
@media screen and (max-width: 380px) {
  .menu-date-left :deep(.v-overlay__content) {
    left: 7.5px !important;
  }
  .v-table :deep(.v-data-table__td) {
    max-width: 295px !important;
  }
  .v-table :deep(.detail-width) {
    max-width: 295px !important;
  }
  .v-table :deep(.v-data-table-footer) {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
  .v-table :deep(.v-data-table-footer__info) {
    padding-top: 5px !important;
  }
  .v-col-10 {
    max-width: 100% !important;
    flex-basis: 100% !important;
  }
  .v-col-9 {
    max-width: 92% !important;
    flex-basis: 92% !important;
  }
}
</style>
