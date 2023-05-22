<template>
  <div class="pagination">
    <div class="pagination__content">
      <div class="total-record">Tổng số: 20 bản ghi</div>
      <div class="pagination__combobox">
        <MISADropdown
          :options="pagingOptions"
          :itemSelected="pagingInfo.pageSize"
          @change="pagingInfo.pageSize = $event"
        ></MISADropdown>
      </div>
      <div class="pagination__main">
        <div class="pagination__prev ms-20" @click="handleChange('previous')">
          <div class="ms-icon ms-12 ms-icon-arrow-left"></div>
        </div>
        <div
          class="pagination__item"
          v-for="(page, index) in getPaging()"
          :key="index"
          :class="{
            'btn-page': page != '...',
            'btn-page--active': page == pagingInfo.pageNumber,
          }"
          @click="handleChange(page)"
        >
          {{ page }}
        </div>
        <div class="pagination__next ms-20" @click="handleChange('next')">
          <div class="ms-icon ms-12 ms-icon-arrow-right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MISADropdown from "./MISADropdown.vue";
export default {
  name: "MISAPagination",
  components: {
    MISADropdown,
  },
  data() {
    return {
      pagingOptions: [
        { key: 10, value: 10 },
        { key: 20, value: 20 },
        { key: 30, value: 30 },
        { key: 40, value: 40 },
        { key: 50, value: 50 },
        { key: 60, value: 60 },
      ],
      pagingInfo: {
        pageSize: {},
        totalRecord: 100,
        pageNumber: 1,
      },
    };
  },
  created() {
    this.pagingInfo.pageSize = this.pagingOptions[0];
  },
  methods: {
    /**
     * @description: Tính toán tổng số trang
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 21/05/2023
     */
    getTotalPage() {
      return Math.ceil(this.pagingInfo.totalRecord / this.pagingInfo.pageSize.value);
    },
    /**
     * @description: Tính toán hiển thị paging
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 21/05/2023
     */
    getPaging() {
      let pages = [];
      for (let i = 1; i <= this.getTotalPage(); i++) {
        if (
          i == 1 ||
          i == this.getTotalPage() ||
          (i >= this.pagingInfo.pageNumber - 2 &&
            i <= this.pagingInfo.pageNumber + 2)
        ) {
          pages.push(i);
        } else if (
          i == this.pagingInfo.pageNumber - 3 ||
          i == this.pagingInfo.pageNumber + 3
        ) {
          pages.push("...");
        }
      }
      return pages;
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 21/05/2023
     */
    handleChange(page) {
      // kiểm tra xem người dùng có click vào button previous hay next hay không
      if (page == "previous" && this.pagingInfo.pageNumber <= 1) {
        return;
      } else if (
        page == "next" &&
        this.pagingInfo.pageNumber >= this.getTotalPage()
      ) {
        return;
      } else if (page == "...") {
        return;
      } else if (page == "previous") {
        this.pagingInfo.pageNumber--;
      } else if (page == "next") {
        this.pagingInfo.pageNumber++;
      } else {
        this.pagingInfo.pageNumber = page;
      }
      this.$emit("changePaging", this.pagingInfo.pageNumber , this.pagingInfo.pageSize.value);
    },
  },
};
</script>

<style>
.pagination {
  background-color: #fff;
  z-index: 11;
  height: 40px;
  display: flex;
}
.pagination__content {
  display: flex;
  gap: 20px;
}
.pagination__info {
  display: flex;
}
.pagination__main {
  display: flex;
  align-items: center;
}
.total-record {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.pagination__combobox {
  display: flex;
  align-items: center;
}
.ms-20 {
  display: flex;
  align-items: center;
  justify-content: center;
}
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
</style>