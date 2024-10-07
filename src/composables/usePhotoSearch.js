import { ref } from 'vue';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'QU7EIZ2DRHtK70O0pFls1SdDzpydC64hKpnKxosW3nQ'; // Replace with your actual Unsplash access key
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

export const usePhotoSearch = () => {
  const photos = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const loadedPhotos = ref({});

  const fetchPhotos = async (query = 'african') => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(UNSPLASH_API_URL, {
        params: {
          query,
          per_page: 20,
          client_id: UNSPLASH_ACCESS_KEY,
        },
      });

      photos.value = response.data.results.map(photo => ({
        id: photo.id,
        name: photo.user.name,
        location: photo.user.location || 'Unknown',
        imageUrl: photo.urls.regular,
      }));

      // Reset loaded state
      photos.value.forEach(photo => {
        loadedPhotos.value[photo.id] = false;
      });
    } catch (err) {
      error.value = 'Failed to fetch photos. Please try again later.';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    photos,
    isLoading,
    error,
    loadedPhotos,
    fetchPhotos,
  };
};
