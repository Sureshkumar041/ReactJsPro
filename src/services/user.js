import { ApiEndPoints } from "./apiEndPoints";
import BaseService from "./base";

export const UploadExcelService = async (payload) => {
  try {
    const res = await BaseService.post(ApiEndPoints?.uploadExcel, payload);
    return res?.data;
  } catch (error) {
    return new Error(error?.message);
  }
};

export const InsertDataService = async (payload) => {
  try {
    const res = await BaseService.post(ApiEndPoints?.insertData, payload);
    return res?.data;
  } catch (error) {
    return new Error(error?.message);
  }
};

export const GetFileService = async () => {
  try {
    const res = await BaseService.get(ApiEndPoints?.getFile);
    return res?.data;
  } catch (error) {
    return new Error(error?.message);
  }
};

export const GetWaterDataService = async (payload) => {
  try {
    const res = await BaseService.post(ApiEndPoints?.getWaterData, payload);
    return res?.data;
  } catch (error) {
    return new Error(error?.message);
  }
};

export const DeleteFileService = async (payload) => {
  try {
    const res = await BaseService.delete(ApiEndPoints?.deleteFile, payload);
    return res?.data;
  } catch (error) {
    return new Error(error?.message);
  }
};
