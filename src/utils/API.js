import axios from "axios";
import { configure } from "axios-hooks";
import LRU from 'lru-cache'

export const axiosInstance =  axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  responseType: "json"
});
const cache = new LRU({ max: 10 })

configure({ axios, cache })
