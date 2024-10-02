import React,{useState} from "react";
import ImageGallery from "./Components/ImageGallery";
import ImageSearch from "./Components/ImageSearch";
import "./App.css";

const App=()=>{
  const[imageList,setImageList]= useState([]);
  return (
    <div>
      <h1>Imaze Bazar App</h1>
     
      <ImageSearch setImageList={setImageList} />
      <ImageGallery imageList={imageList}/>
    </div>
  )
}

export default App; 