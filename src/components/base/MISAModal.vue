<template>
    <div class="modal">
        <div class="modal-content "
        :style="style">
            <slot></slot>
        </div>
    </div>
</template>


<script>
export default {
    name: "MISAModal",
    props:{
        isShow: {
            type: Boolean,
            default: false,
        },
        style: {
            type: String,
            default: "",
        },
    }
}
</script>
<style scoped>
@import url(@/css/components/modal.css);
</style>