
import axios from "axios";

import { word, showLoading, page, limit } from "../main";

export async function fetchingFrom() {

  const params = new URLSearchParams({
    key: '42957626-41f27679caf00334274850a6e',
    q: word,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: limit,
  });

  const response = await axios.get(`https://pixabay.com/api/?${params}`);

  showLoading();

  return response.data;
};



