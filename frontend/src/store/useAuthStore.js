import {create} from 'zustand';
export const useAuthStore = create((set)=>({
    authUser:{name: "john" ,_id:123 , age:24 },
   
    isLoggedIn:false ,
    isLoading:false ,
    login:()=>{
        console.log("we just logged in ")
        set({isLoggedIn:true , isLoading:true});
        //call the function you want

    }

}))

// we crate a type of box which contains all type of state using zustand ...
