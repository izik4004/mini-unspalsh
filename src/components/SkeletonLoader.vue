<template>
    <div class="skeleton-photo-card">
        <div class="skeleton-img"></div>
        <div class="skeleton-info">
            <div class="skeleton-name"></div>
            <div class="skeleton-location"></div>
        </div>
    </div>
</template>

<style scoped>
.skeleton-photo-card {
    background: #f0f0f0;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

.skeleton-img {
    width: 100%;
    height: 200px;
    background-color: #dcdcdc;
    border-radius: 8px;
}

.skeleton-info {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.skeleton-name,
.skeleton-location {
    height: 16px;
    background-color: #e0e0e0;
    border-radius: 4px;
}

.skeleton-name {
    width: 70%;
    margin: 0 auto;
}

.skeleton-location {
    width: 50%;
    margin: 0 auto;
}


</style>
