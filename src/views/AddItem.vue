<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center py-10">
    <v-container>
      <v-card class="mx-auto" max-width="600" outlined>
        <v-card-title class="text-2xl font-bold text-center text-blue-700">
          Add New Item
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              label="Item Name"
              v-model="form.name"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="Price"
              v-model="form.price"
              type="number"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="quantity"
              v-model="form.quantity"
              type="number"
              required
              outlined
              dense
            ></v-text-field>
            <v-file-input
              label="Item Image"
              v-model="form.image"
              prepend-icon="mdi-camera"
              accept="image/*"
              required
              outlined
              dense
              @change="handleUploadImage"
            ></v-file-input>
            <v-text-field
              label="Description"
              v-model="form.description"
              required
              outlined
              dense
              textarea
              rows="3"
            ></v-text-field>
            <div class="text-center mt-6">
              <v-btn color="blue darken-1" class="white--text" type="submit">Submit</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup >
import { ref } from 'vue';

import { useActionStore } from '@/store/ActionStore';
import { useMainStore } from '@/store/MainStore';
import { uploadImage } from '@/firebase/Functions';



const actionStore = useActionStore()
const mainStore = useMainStore()
const form = ({
  description: '',
  id: mainStore.user.uid,
  name: '',
  price: 0,
  quantity: 0,
  image: ''
});


const handleUploadImage = (event)=>{
  form.value.image = event.target.files[0]
}
const submitForm = async () => {
  await uploadImage(form.value.image)
 await  actionStore.addItem(form.value)
};
</script>

<style scoped>
.v-application--wrap {
  min-height: 100vh;
}
</style>
