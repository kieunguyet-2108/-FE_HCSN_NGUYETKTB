<template>
  <div class="loading-overlay">
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <div class="loading-text">Đang tải...</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MISALoading",
  props: {},
};
</script>
<style>
/* loading */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
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
  border-top: 4px solid #3498db;
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
  color: #fff;
}
</style>