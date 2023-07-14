<template>
  <div class="container">
    <div class="resizeable" ref="div1">
      <!-- Nội dung của div 1 -->
    </div>
    <div class="resizeable" ref="div2">
      <!-- Nội dung của div 2 -->
    </div>
  </div>
</template>
  
  <style>

.container {
  display: flex;
  height: 400px; /* Chiều cao của container */
}

.resizeable {
  flex: 1;
  border: 1px solid black;
  resize: vertical; /* Cho phép thay đổi kích thước theo chiều dọc */
  overflow: auto; /* Hiển thị thanh cuộn nếu nội dung vượt quá kích thước */
}
</style>
<script>
export default {
  name: 'DemoResizeable',
  mounted() {
    const div1 = this.$refs.div1
    const div2 = this.$refs.div2

    let isResizing = false
    let startY = 0
    let startHeight = 0

    div1.addEventListener('mousedown', startResize)
    div2.addEventListener('mousedown', startResize)

    function startResize(event) {
      isResizing = true
      startY = event.clientY
      startHeight = parseFloat(
        getComputedStyle(event.target, null).getPropertyValue('height')
      )

      document.addEventListener('mousemove', resize)
      document.addEventListener('mouseup', stopResize)
    }

    function resize(event) {
      if (!isResizing) return

      const deltaY = event.clientY - startY
      div1.style.height = `${startHeight + deltaY}px`
      div2.style.height = `${startHeight - deltaY}px`
    }

    function stopResize() {
      isResizing = false
      document.removeEventListener('mousemove', resize)
      document.removeEventListener('mouseup', stopResize)
    }
  },
}
</script>
  