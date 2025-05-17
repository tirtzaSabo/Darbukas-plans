import Axios from "./axios";
import config from "../config";
import { Business } from "../models/business.model";
export class BusinessService {
  
   async createBusiness(newBusiness: Business,token:string|undefined): Promise<Business> {
    try {
      const res = await Axios.post(`${config.api}/business`,{newBusiness}, {headers: {
        Authorization: `${token}`
    }});
      if (res.status === 201) {
        console.log("The business has been added to the list");
        return res.data;
      }
      throw new Error(`Unexpected status code: ${res.status}`);
    } catch (error) {
      console.error("Error adding business:", error);
      throw error;
    }
  }
    async getAllBusiness(token:string|undefined): Promise<Business[]> {
    try {
      const res = await Axios.get(`${config.api}/business/`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  console.log(res);
  
      if (res.status === 200) {
        return res.data;
      }
      throw new Error(`Unexpected status code: ${res.status}`);
    } catch (error) {
      console.error("Error getting all business:", error);
      throw error;
    }}
     async deleteUser(id:string,token:string|undefined): Promise<Business[]> {
    try {
      const res = await Axios.delete(`${config.api}/business/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
      if (res.status === 200) {
        return res.data;
      }
      throw new Error(`Unexpected status code: ${res.status}`);
    } catch (error) {
      console.error("Error getting all events:", error);
      throw error;
    }}
    async updateBusiness(id: string, newBusiness: Partial<Business>, token: string | undefined): Promise<Business[]> {
    try {
      const res = await Axios.put(`${config.api}/business/${id}`,{newBusiness}, {
    headers: {
      Authorization: `${token}`,
    },
  });
  function ensureArray<T>(data: T | T[]): T[] {
  return Array.isArray(data) ? data : [data];
}
      if (res.status === 200) {
            const arrayData = ensureArray(res.data); 

        return arrayData;
      }
      throw new Error(`Unexpected status code: ${res.status}`);
    } catch (error) {
      console.error("Error update business:", error);
      throw error;
    }}
}
export const businessService = new BusinessService();
