<script setup>
import { ref } from 'vue';
import axios from 'axios';

const selectedFile = ref(null);
const isUploading = ref(false);
const uploadedImageUrl = ref('');

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadImage = async () => {
  if (!selectedFile.value) return;

  isUploading.value = true;
  try {
    // 1. Get the secure SAS URL from your backend API
    const { data } = await axios.get('/api/get-upload-url', {
      params: {
        fileName: selectedFile.value.name,
        fileType: selectedFile.value.type
      }
    });

    // 2. Upload file directly to Azure Blob Storage
    await axios.put(data.uploadUrl, selectedFile.value, {
      headers: {
        'Content-Type': selectedFile.value.type,
        'x-ms-blob-type': 'BlockBlob' // Required by Azure
      }
    });

    // 3. Save the final image location
    uploadedImageUrl.value = data.imageUrl;
    alert('Upload successful!');
  } catch (error) {
    console.error('Upload failed:', error);
  } finally {
    isUploading.value = false;
  }
};
</script>

<template>
  <div class="upload-container">
    <input type="file" accept="image/*" @change="handleFileChange" />
    <button :disabled="!selectedFile || isUploading" @click="uploadImage">
      {{ isUploading ? 'Uploading...' : 'Upload Image' }}
    </button>
    
    <div v-if="uploadedImageUrl" class="preview">
      <p>Uploaded Image:</p>
      <img :src="uploadedImageUrl" alt="Uploaded asset" />
    </div>
  </div>
</template>