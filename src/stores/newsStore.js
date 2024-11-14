import { defineStore } from 'pinia'
const newsStore = defineStore('new', {
  state: () => {
    return {
      news: [
        {
          news_id: 202211300,
          new_arrivals: true,
          news_img: 'https://storage.googleapis.com/vue-course-api.appspot.com/cheryl-hexschool/1678648054156.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=PW4bi0hxb9ycCFLT6eQUXJCoqw0GVy8yErDD57OJV9yPRgp1aF3k5BWhAev7w7G9utoG%2FORYFFelcJ8VXfewdq2YzJC5hVq1E17b8m9nhH6HhDbx9TTjZeQ%2Bt7G1N7mzhFHAP64aAetngbLBBuFq4wsHbJF2M2gbpJ8IVeVk%2BmRxSqfmXdpKoGZOHNs7b092TtZG1%2FeM5%2B3aspWJ5SwBfhPAPpks8m1NAdx4o27%2F2c%2F1CfH0CDD0jkkp8ft4uonK%2Bh2nY%2FoEnn4OWMAv2gipkZpwXKNe10p%2Bz9U8fTs%2FyqnozWxEgfOWAHdHjt791JwNexVI8fNVkk%2BiG%2BWHdhpTsA%3D%3D',
          news_title: '新品正式開賣',
          en_title: 'New products on sale',
          news_date: '2022年11月30日',
          content_title: '凍頂烏龍',
          news_content: '我們很榮幸向您介紹我們最新的茶葉產品 - 凍頂烏龍！這款茶葉來自台灣南投縣鹿谷鄉，以其湯味醇厚甘潤、耐泡。這種茶葉是由精選的嫩芽和葉製成，具有淡綠色的外觀和優雅的香氣。品嚐凍頂烏龍，滋味上重視喉韻，圓滑順口、甘甜醇厚，您會感受到在喉嚨有著清爽的餘韻。無論您是茶葉愛好者還是想要嚐試新口味的人，我們的凍頂烏龍都是您不可錯過的茶葉之一。立即瀏覽我們的網站，了解更多關於凍頂烏龍的詳細資訊，並在家中享受最好的品質和味道。'
        },
        {
          news_id: 202212121,
          new_arrivals: false,
          news_img: 'https://storage.googleapis.com/vue-course-api.appspot.com/cheryl-hexschool/1678648579838.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=KzyYtLglR69iKpV6EYcng16Wc5g6eoGZhQy5iGKDwxJjhCh4gM%2FktPIolpxYG9SZAxzcZaqM0xFbjhkEp7HWUvsly%2FKK6rgoF47%2F8azRm%2BP4wInR%2Bu%2FKRvXnOA9HqY6TWrc%2Fyj5XaAHdd%2BQAKkwLc69FNLXJMnKodRa97she7Hwt5pC6CIZM0UQxtIFYFehZc5EWS%2ByadlhMwPVQ5jQqi%2Bx8LkRQqWxOZq4G1Rm%2B8b%2BmAh%2FO9lxHvMw0NdYAsyBYYtgUhYdPsRpdz6Zzh7zUgXswk54dO025B3biZUkMwzE31E9QawxofAPnrWn6zuTjG4hRjFy51cRaDGjom%2FDvcQ%3D%3D',
          news_title: '年度暢銷產品',
          en_title: 'Best seller of the year',
          news_date: '2022年12月12日',
          content_title: '阿里山烏龍茶',
          news_content: '「品味絕佳，享受舌尖饗宴」。阿里山烏龍茶將帶你走進一場味覺盛宴。我們獨家挑選高山茶園最優質的茶葉，以傳統烘焙技法製成，帶有獨特的花香和果香，入口柔和順滑，回甘悠長。適合搭配各式美食，讓你的餐桌增添無限美味。現在購買，還可享受限時優惠！趕快選購，開啟美味之旅！'
        },
        {
          news_id: 202301162,
          new_arrivals: false,
          news_img: 'https://storage.googleapis.com/vue-course-api.appspot.com/cheryl-hexschool/1678649830585.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Df4NIesJG1a2lfCuUQ%2F44I1mx7%2FsQgzo6XvudjtIp132XCJRzwtfW8EW4r7NZiDsQa70apDDYZ9f3GzBS7K75UtCQHMAd0KHh%2Bqrchy4UecstdfBk77vJC0PyNPF2rGjaEYXTPYxT2iN3sBoS2F4oqMvuyAkeaOKyRHZ%2BUZdoQcMdZ%2BX91J%2F7h9O7oxZL3ii%2BM6J8F74aqpgwfR6y4nX%2FU5hh9IVntNG7hbit6iFu%2BL7iKJimpeqWKWV774uZ6NYtSb9nlOvwVIbPyyYLi48JxpkkP5Ae0Af1oyKoliHMvLfnufKr4prBG9NXOrwca7DT4swZbx8%2BqN0lW6jXuiamA%3D%3D',
          news_title: '新春禮盒上市',
          en_title: 'New Year’s gifts listed',
          news_date: '2023年01月16日',
          content_title: '癸卯新春禮盒',
          news_content: '「祝福新年，品味好茶」。癸卯新春禮盒上市啦！我們精選高山茶、烏龍茶、普洱茶等多種茶葉，以精美包裝送至你手中。每一口，都是對新年美好祝福的傳遞。無論是與摯愛分享，還是獨自品味，都能感受茶香濃郁，韻味無窮。趕快選購，與親朋好友一起開啟幸福新年！'
        }
      ]
    }
  }
})
export default newsStore
