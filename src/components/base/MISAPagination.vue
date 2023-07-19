<template>
  <div class="pagination__main">
    <MISATooltip content="Trang trước">
      <div
        class="pagination__prev ms-20"
        @click="handleChange('previous')"
        :class="{
          'ms-icon--disable': numberOfPage <= 1,
        }"
      >
        <div class="ms-icon ms-12 ms-icon-arrow-left"></div>
      </div>
    </MISATooltip>

    <div
      class="pagination__item"
      v-for="(page, index) in getPaging()"
      :key="index"
      :class="{
        'btn-page': page != '...',
        'btn-page--active': page == pageNumber,
      }"
      @click="handleChange(page)"
    >
      {{ page }}
    </div>
    <MISATooltip content="Trang sau">
      <div
        class="pagination__next ms-20"
        @click="handleChange('next')"
        :class="{
          'ms-icon--disable': numberOfPage >= getTotalPage(),
        }"
      >
        <div class="ms-icon ms-12 ms-icon-arrow-right"></div>
      </div>
    </MISATooltip>
  </div>
</template>
    
<script>
/* eslint-disable */
import MISATooltip from './MISATooltipV1.vue'
export default {
  name: 'MISAPagination',
  components: {
    MISATooltip,
  },
  props: {
    pageNumber: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    totalRecord: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      numberOfPage: 1,
    }
  },
  methods: {
    /**
     * @description: Tính toán tổng số trang
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 21/05/2023
     */
    getTotalPage() {
      return Math.ceil(this.totalRecord / this.pageSize)
    },
    /**
     * @description: Tính toán hiển thị paging
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 21/05/2023
     */
    getPaging() {
      let pages = []
      for (let i = 1; i <= this.getTotalPage(); i++) {
        if (
          i == 1 ||
          i == this.getTotalPage() ||
          (i >= this.pageNumber - 2 && i <= this.pageNumber + 2)
        ) {
          pages.push(i)
        } else if (i == this.pageNumber - 3 || i == this.pageNumber + 3) {
          pages.push('...')
        }
      }
      return pages
    },
    /**
     * @description: Thực hiện xử lí khi người dùng click vào button paging
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 21/05/2023
     */
    handleChange(page) {
      let pageNum = this.pageNumber
      // kiểm tra xem người dùng có click vào button previous hay next hay không
      if (page == 'previous' && pageNum <= 1) {
        return
      } else if (page == 'next' && pageNum >= this.getTotalPage()) {
        return
      } else if (page == '...') {
        return
      } else if (page == 'previous') {
        pageNum--
      } else if (page == 'next') {
        pageNum++
      } else {
        pageNum = page
      }
      this.numberOfPage = pageNum
      this.$emit('changePaging', pageNum)
    },
  },
}
</script>
    
<style>
/* style riêng cho button page */
.btn-page {
  width: 22px;
  height: 22px;
  background-color: #ffffff;
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
}
.btn-page:hover {
  background-color: #f5f5f5;
  overflow: hidden;
  font-weight: 600;
  cursor: pointer;
}
/* khi button page có class active (người dùng hiện đang ở page đó) -> background color sẽ thay đổi */
.btn-page--active {
  background-color: #f5f5f5;
  border-radius: 3px;
  width: 22px;
  height: 22px;
  overflow: hidden;
  font-weight: 600;
}
.pagination__main {
  display: flex;
  align-items: center;
}
.ms-20 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ms-icon--disable {
  cursor: not-allowed;
  opacity: 0.5;
}
.ms-icon--disable .ms-icon {
  cursor: not-allowed;
}
</style>