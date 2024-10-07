<template>
    <div class="hero-section">
        <!-- Search bar input -->
        <div class="search-bar">
            <input :value="searchQuery" type="text" placeholder="Search for photos" @input="updateSearchQuery"
                @keyup.enter="handleSearch" />
        </div>
        <div class="search-text">
            <div v-if="isLoadingText && !isDefaultSearch">
                <h3>Searching for "{{ searchQuery }}"</h3>
            </div>

            <div v-if="isCompletedText && !isDefaultSearch">
                <h3>Search Results for "{{ searchQuery }}"</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
// Accept props
const props = defineProps({
    searchQuery: {
        type: String,
        required: true,
    },
    isLoadingText: {
        type: Boolean,
        required: true,
    },
    isCompletedText: {
        type: Boolean,
        required: true,
    },
    isDefaultSearch: {
        type: Boolean,
        required: true, // New prop to track if it's the default search
    },
});

// Emit events to parent
const emit = defineEmits(['update:searchQuery', 'search']);

const updateSearchQuery = (event) => {
    emit('update:searchQuery', event.target.value);
};

// Handle the search action triggered by Enter key
const handleSearch = () => {
    emit('search', props.searchQuery); // Emit search event to parent
};
</script>

<style lang="scss" scoped>
.hero-section {
    background-color: #f0f0f0;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;

    .search-bar {
        width: 75%;
        display: flex;
        justify-content: center;

        input {
            width: 100%;
            padding: 15px 25px;
            border-radius: 8px;
            border: 1px solid #ccc;
            font-size: 16px;
        }
    }

    .search-text {
        gap: 40px;
        max-width: 1050px;
        margin: 0 auto;
        width: 100%;
        text-align: left;
    }

    h3 {
        margin-top: 45px;
        text-align: left;
        
        font-size: 2rem;
        color: #2C365E;
   
    }
}
</style>

