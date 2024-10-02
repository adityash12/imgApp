import React from "react";

const ImageGallery =({imageList})=>{
   

  return(
    <div>
    {
      imageList.map((item)=>(
      <img key={item.id} src={item.urls.small_s3} alt={item.alt_description
        } />
      ))
    }
    </div>
  )
}

export default ImageGallery;