import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'

import { getFirestore} from 'firebase/firestore'



// ... other firebase imports

export const firebaseApp = initializeApp({
 

        apiKey: "AIzaSyCYMC0Wg9hWJ3vSXZth_p1l3D-NkaWfzKM",
      
        authDomain: "mhamadweb-7b68f.firebaseapp.com",
      
        projectId: "mhamadweb-7b68f",
      
        storageBucket: "mhamadweb-7b68f.appspot.com",
      
        messagingSenderId: "1018686798545",
      
        appId: "1:1018686798545:web:6f79c05186d4ffa6ea23f0"
   
      
})

// used for the firestore refs
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)

// here we can export reusable database references
// export const todosRef = collection(db, 'todos')