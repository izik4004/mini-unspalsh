<script setup>
import { ref, onMounted, watch } from 'vue';
import { usePhotoSearch } from './composables/usePhotoSearch';
import PhotoCard from './components/PhotoCard.vue';
import SkeletonPhotoCard from './components/SkeletonLoader.vue';
import PhotoSearchBar from './components/PhotoSearchBar.vue';
import Modal from './components/Modal.vue';

const searchQuery = ref('');
const isModalVisible = ref(false);
const selectedPhoto = ref(null);
const isLoadingText = ref(false); // To show "Loading search query"
const isCompletedText = ref(false); // To show "Completed search query"
const isDefaultSearch = ref(false); // New state for default search

const { photos, isLoading, error, loadedPhotos, fetchPhotos } = usePhotoSearch();

// Mark photo as loaded when the image load event fires
const markAsLoaded = (photoId) => {
  loadedPhotos.value[photoId] = true;

  // Check if all photos are loaded
  const allPhotosLoaded = photos.value.every(photo => loadedPhotos.value[photo.id]);
  if (allPhotosLoaded) {
    isCompletedText.value = true;
    isLoadingText.value = false;
  }
};

// Handle the search action triggered by the Enter key
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    isLoadingText.value = true; // Start showing "Loading search query"
    isCompletedText.value = false; // Hide completed message when starting a new search
    isDefaultSearch.value = searchQuery.value.toLowerCase() === 'african'; // Check if default search
    fetchPhotos(searchQuery.value); // Fetch the photos with the query
  } else {
    isDefaultSearch.value = true; // It's the default search
    fetchPhotos('african'); // Default to "african" if no query
  }
};

// Watch for changes in searchQuery and trigger handleSearch
watch(searchQuery, (newValue) => {
  if (!newValue) {
    handleSearch();
  }
});

// Debounce function for search input
// let debounceTimeout;
// const debounceFetchPhotos = (query) => {
//   if (debounceTimeout) clearTimeout(debounceTimeout);
//   debounceTimeout = setTimeout(() => {
//     fetchPhotos(query);
//   }, 500); // 500ms delay
// };

// Watch for search query changes and fetch photos
watch(searchQuery, (newValue) => {
  if (newValue.trim()) {
    debounceFetchPhotos(newValue);
  } else {
    fetchPhotos('african');
  }
});

// Modal handlers
const showModal = (photo) => {
  selectedPhoto.value = photo;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

// Fetch default photos on mount
onMounted(() => {
  isDefaultSearch.value = true;
  fetchPhotos();
});
</script>

<template>
  <PhotoSearchBar :searchQuery="searchQuery" :isLoadingText="isLoadingText" :isCompletedText="isCompletedText"
    @update:searchQuery="searchQuery = $event" :isDefaultSearch="isDefaultSearch" @search="handleSearch" />

  <div>
    <!-- Show error message if there's an error -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Photo grid with skeleton loaders -->
    <div class="photo-grid">
      <template v-for="photo in photos" :key="photo.id">
        <div>
          <SkeletonPhotoCard v-if="!loadedPhotos[photo.id]" />
          <PhotoCard v-if="loadedPhotos[photo.id]" :photo="photo" @click="showModal(photo)" />
          <img :src="photo.imageUrl" @load="markAsLoaded(photo.id)" style="display: none;" />
        </div>
      </template>
    </div>

  </div>

  <Modal :isVisible="isModalVisible" :photo="selectedPhoto" @close="closeModal" />
</template>

<style lang="scss" scoped>
.photo-grid {
  padding: 50px;
  columns: 3;
  gap: 40px;
max-width: 900px;
margin: 0 auto;
  @media (max-width: 1200px) {
    columns: 3;
  }

  @media (max-width: 768px) {
    columns: 2;
  }

  @media (max-width: 480px) {
    columns: 1;
  }

  &>* {
    margin-bottom: 20px;
  }
}

.error {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #dc3545;
}
</style>
