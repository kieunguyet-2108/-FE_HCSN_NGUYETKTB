<template>
  <div class="loading-overlay" :style="style">
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <div class="loading-text">Đang tải...</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MISALoading",
  props: {
    style:{
      type: Object,
      default: () => {
        return {
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }
      }
    }
  },
};
</script>
<style>
/* loading */
.loading-overlay {
  position: absolute;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1aa4c8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-top: 10px;
  font-size: 14px;
  color: #1aa4c8;
}
</style>