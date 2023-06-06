import { BASE_URL } from "./base_url";
import axios from "axios";

//get all Products
export const getAllProducts = async (name) => {
  let globalData;
  let URL;
  if (!name) {
    URL = BASE_URL+'/products';
  }
  else{
    URL = BASE_URL+'/products'+`?name=${name}`;
  }
  await axios.get(URL).then((res) => {
    globalData = res.data.data;
  });
  return globalData;
};
//get Product by ID
export const getProductByID = async (ID) => {
  let globalData;
  await axios.get(`${BASE_URL}/products/${ID}`).then((res) => {
    globalData = res.data.data;
  });
  return globalData;
};

//delete Product by  ID
export const deleteProductByID = async (ID) => {
  let deletedProduct;
  await axios.delete(`${BASE_URL}/products/${ID}`).then((res) => {
    deletedProduct = res.data.data;
  });

  return deletedProduct;
};
//post product
export const postProduct = (payload) => {
  axios.post(`${BASE_URL}/products`, payload);
};
//edit product
export const editProduct = (id,payload)=>{
  axios.put(`${BASE_URL}/products/${id}`,payload);
}


//get All songs
export const getProductSongs = async(id) => {
  let globalData;
  await axios.get(`${BASE_URL}/songs/${id}`)
  .then(res=>{
    globalData = res.data;
  })
  return globalData
}
export const getAllSongs = async() => {
  let globalData;
  await axios.get(`${BASE_URL}/songs`)
  .then(res=>{
    globalData = res.data;
  })
  return globalData
}
export const deleteSongByID = async(id)=>{
  let deletedSong;
  await axios.delete(`${BASE_URL}/songs/${id}`)
  .then(res=>{
    deletedSong = res.data.data;
  })
  return deletedSong;
}
export const postSong =  (payload)=>{
  axios.post(`${BASE_URL}/songs`,payload);
}