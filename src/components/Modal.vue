<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isVisible: Boolean,
    photo: Object
});

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};
</script>

<template>
    <div class="modal-overlay" v-if="isVisible" @click.self="closeModal">
        <div class="modal-content">
            <button class="close-btn" @click="closeModal">X</button>
            <img :src="photo.imageUrl" alt="Large Photo"  />
            <div class="modal-footer">
                <h4>{{ photo.name }}</h4>
                <p>{{ photo.location }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    /* Ensure vertical centering */
    z-index: 1000;
    /* Ensure modal is on top */
}

.modal-content {
    max-width: 700px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;

    img {
        width: 100%;
        height: 500px;
        object-fit: cover;
    }

    .modal-footer{
        padding: 16px;
        background-color: #ffffff;

        h4 {
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 8px 0;
        }

        p {
            font-size: 16px;
            color: #666666;
            margin: 0;
        }
    }
}

.close-btn {
    position: absolute;
    top: 40px;
    right:282px;
    padding: 10px;
    // background-color: #dc3545;
    background: none;
    color: rgb(233, 228, 228);
    border: none;
    cursor: pointer;
    border-radius: 50%;
    font-size: 18px;
    width: 30px;
    height: 30px;
    line-height: 10px;
    text-align: center;
}


</style>
