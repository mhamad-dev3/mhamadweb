<template>
  <body class="flex flex-col gap-10 pt-10 items-center ">
    <!-- <img src="/images/shopping-3d-illustration-1024x768.jpg" class="rounded-full w-52 h-52" alt=""> -->
    <h3 class="text-3xl ">Login</h3>
    <v-sheet class="mx-auto w-full" max-width="300">
    <v-form  @submit.prevent="submit">
      <v-text-field
      required type="email"
        v-model="email"
        label="your email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="your password"
        type="password"
      ></v-text-field>
      
     <div class="flex flex-col-reverse ">
      <v-btn
        :loading="loading"
        class="mt-2"
        text="Submit"
        type="submit"
        block
      ></v-btn>
<div class="flex justify-between">
  <button class=" self-start pb-5 hover:text-blue-500 text-ase">forget password</button>
  <RouterLink type="button" :to="{name:'register'}" class=" self-start pb-5 hover:text-blue-500 text-ase">Register</Routerlink>
</div>
     </div>
    </v-form>
  </v-sheet> 
  <!-- <button @click="logOut">ss</button> -->
  </body>
</template>
<script setup lang="ts">
import {ref, watch} from "vue"
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { useMainStore } from "@/store/MainStore";
const email = ref<string>('')
const password = ref<string>('')
const loading =ref<boolean>(false)
const mainStore = useMainStore()
const router = useRouter()
// variables


// const logOut = async ()=>{
//   try {
//     await signOut(auth);
//     console.log('User logged out successfully'); // Optional for logging
//   } catch (error) {
//     console.error('Error logging out:', error); // Handle errors if needed
//   }
// }
// methods

const submit = async ()=>{
  await mainStore.login(email.value,password.value)
}


// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is logged in
//    console.log('logged',user)
//   } else {
//     // User is not logged in
//     console.log('false')
//   }
// });
watch(()=>mainStore.isLogged,(newval:boolean)=>{
  newval === true?router.push({name:'dashboard'}):false
})
</script>