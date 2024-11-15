<template>
  <div class="d-flex align-center btn-icon-v-img">
    <v-img
      width="100%"
      height="100%"
      alt="放大航空照片icon"
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
  >
    <template v-slot:[`header.data-table-select`]="{ allSelected, selectAll }">
      <v-checkbox v-model="selectAll" @change="allSelected"></v-checkbox>
    </template>
    <template v-slot:headers="{ columns }">
      <tr>
        <template v-for="column in columns" :key="column.key">
          <th :scope="column.scope">
            <span class="mr-2 cursor-pointer">{{ column.title }}</span>
          </th>
        </template>
      </tr>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Expandable Table</v-toolbar-title>
      </v-toolbar>
    </template>
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

.btn-icon-v-img{
  width: 88px !important;
  height: 88px !important;
  padding: 0 !important;
}
@media screen and (min-width: 600px) {
  .btn-icon-v-img{
    width: 130px !important;
    height: 130px !important;
  }
}
</style>
