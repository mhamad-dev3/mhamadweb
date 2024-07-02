import { defineStore } from "pinia";

import {  signInWithEmailAndPassword ,sendPasswordResetEmail } from "firebase/auth";
import {auth } from "@/firebase/firebase"
import { ref } from "vue";
import { Item } from "@/type/types";
import { getCollection } from "@/firebase/Functions";
const listItem = ref<Item | []>([])
export const useMainStore = defineStore('mainStore',()=>{
    // @ts-ignore
    const user =ref<any>(window.localStorage.getItem('userT')?JSON.parse((window.localStorage.getItem('userT'))):null)
    const isLogged = ref<boolean>(false)
    const isSeller = ref<boolean>(false)
    const login = async(email:string,password:string)=>{
        try {
            const userCredential = await  signInWithEmailAndPassword(auth, email, password)
            // @ts-ignore
              user.value  = userCredential.user;
              window.localStorage.setItem('userT',JSON.stringify(user.value))
            isLogged.value = !isLogged.value
             
          const us = await getCollection('user')
          us.forEach((obj)=>{
            if(obj.role ==='seller'){
              console.log('ddd',obj.role)
              isSeller.value = true
              console.log(isSeller.value,'s')
            } else {
            
            }
          })
           }catch(error:any){
             throw error.message
           }
         
    }

    const forgotPassword = async (email:string)=>{
        await sendPasswordResetEmail(auth,email).then(()=>{alert("A Password Rest Link sent toyour email")})
        .catch((error)=>{
            alert(error.message)
        })
    }
    return {listItem,user,isSeller,isLogged,login,forgotPassword}
})