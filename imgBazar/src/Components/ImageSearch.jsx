import React,{useState,useEffect} from "react";
import axios from "axios";

console.log("imageSearchjs",import.meta.env.VITE_UPSPLASH_ACCESS_KEY);


const ImageSearch= ({setImageList})=>{
  //here setImage is a prop 
  const[searchText,setSearchText]=useState('');

  
   useEffect(()=>{
    handleSearch();
   },[])

   function handleSearch(e){
   if(e){
     e.preventDefault();
   }
 
    console.log(searchText);
    axios.get("https://api.unsplash.com/search/photos",{
      headers:{
        "Accept-Version" : "v1",
        Authorization: `Client-ID ${import.meta.env.VITE_UPSPLASH_ACCESS_KEY}` //this is a private key
      },
      params:{
        query:searchText || "random"
      }
    }).then((response)=>{
      console.log(response.data.results);
    // setImageList(response.data.results.urls.small);
    setImageList(response.data.results)}).catch((err)=>{
    console.log(err);
    })
  }

  const inputField = {
    backgroundColor:"Black",
    padding:"10px",
    color:"white",
    boxShadow:"2px 2px 10px yellow"
  }
  return (
    <div>
      <form action="#" onSubmit={handleSearch}>
      <input style={inputField} type="text" placeholder="Enter Search" value={searchText} onChange={e=>setSearchText(e.target.value)}/>
      <button type="submit"> Search</button>
      </form>
      {/* {searchText?<img src={searchText} alt="dogImages" />:null} */}
    </div>
  )

}

export  default ImageSearch;



// Bhai, headers ka kaam basically request ko server ko batane ka hota hai ki humari request ka context kya hai. Agar tum headers nahi likhte, to kuch problems ho sakti hain, especially Unsplash jaise APIs ke saath. Chalo step-by-step samjhata hoon headers ki zaroorat:

// 1. Authorization: "Client-ID"
// js
// Copy code
// Authorization: "Client-ID xndjgANruDDpNO_AESYz7n2azHCMz-GQIfPgd7pl1HU"
// Kya ye zaroori hai?: Haan, yeh bahut zaroori hai! Unsplash API ke liye authorization mandatory hai, jo tumhari app ko authenticate karta hai ki tumko data access karne ki permission hai.
// Agar yeh nahi likha: Agar tum authorization header nahi doge, to Unsplash tumhe access nahi dega. Tumhe "401 Unauthorized" error milega, aur tumhe API se koi response nahi milega.
// So, without the Authorization: "Client-ID ...", API se data milega hi nahi.

// 2. Accept-Version: "v1"
// js
// Copy code
// "Accept-Version": "v1"
// Kya yeh zaroori hai?: Ye header tum API ke version ko specify karte ho, jisse API ko pata chale ki kaunsa version tum use kar rahe ho.
// Agar yeh nahi likha: Agar tum version nahi specify karte, toh kuch cases mein API default version use karegi. Lekin agar Unsplash future mein koi naya version release karta hai aur tum version nahi specify karte ho, to kuch unexpected behavior aa sakta hai, ya tumhari request break ho sakti hai.
// Agar headers nahi likhe:
// Without Authorization: Tum API ko access hi nahi kar paoge.
// Without Accept-Version: API tumhare liye default version use karegi, but future mein koi breaking changes ho sakti hai.
// Summary:
// Authorization header nahi doge to API request fail ho jayegi (401 error).
// Accept-Version zaroori hai to make sure tum sahi version ke saath kaam kar rahe ho, varna future mein problems ho sakti hain.
// Isliye, headers dalna zaroori hai jab tum specific APIs ke saath kaam kar rahe ho, jisme authentication aur versioning ka role hota hai.