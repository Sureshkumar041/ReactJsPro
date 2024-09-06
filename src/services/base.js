import { BACKEND_BASE_URL } from "./apiEndPoints";
import axios from "axios";

const axoisConfig = { baseURL: BACKEND_BASE_URL };
const BaseService = axios.create(axoisConfig);

const insertToken=()=>{
    if(typeof window !== undefined && window?.localStorage.getItem("accessToken") !== undefined){
        BaseService.defaults.headers.common.Authorization = "Bearer " + window.localStorage.getItem("accessToken")
    }
}

BaseService.defaults.responseType = "json";

export default BaseService;
