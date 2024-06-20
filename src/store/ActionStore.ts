import { Item } from "@/type/types";
import { defineStore } from "pinia";
import { setDocumentRandomId } from "@/firebase/Functions";
import { useMainStore } from "./MainStore";
import { ref } from "vue";
export const useActionStore = defineStore('actionStore',()=>{
    const imageUrl = ref()
    
    const addItem = async  (object:Item)=>{
        try{
            const mainStore = useMainStore()
            console.log(object,'here')
            await setDocumentRandomId('items',{
                name: object.name,
                description:object.description,
                price:object.price,
                quantity: object.quantity,
                id: object.id,
                image:  imageUrl.value,
            })
        }catch(error:any){
            console.log(error)
        }
    }

    return {addItem,imageUrl}
})