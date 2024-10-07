<template>
    <div class="photo-card">
        <img :src="photo.imageUrl" :alt="photo.name" />
        <div class="photo-info">
            <h3>{{ photo.name }}</h3>
            <p>{{ photo.location }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    photo: {
        type: Object,
        required: true,
    },
});
</script>

<style lang="scss" scoped>
.photo-card {
    top: -100px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .photo-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 15px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
        color: white;

        h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }

        p {
            margin: 5px 0 0;
            font-size: 14px;
            opacity: 0.8;
        }
    }
}
</style>