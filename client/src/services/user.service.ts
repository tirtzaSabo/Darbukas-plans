import { User } from "../models/user.model";
import Axios from "./axios";
import config from "../config";
import {jwtDecode} from 'jwt-decode';

export class UserService {
  async signup(
    name: string,
    password: string,
    phone: string,
    email: string
  ): Promise<User> {
    try {
      const res = await Axios.post(`${config.api}/users/signup`, {
        name,
        password,
        phone,
        email,
      });
      if (res.status != 201) {
        throw new Error(`Unexpected status code: ${res.status}`); 
      }
      if (!res.data) {
        alert("Name or password is incorrect");
      }
      return res.data;
    } catch (error) {
      console.error("Error signup:", error);
      throw error;
    }
  }
  async signin(password: string, email: string): Promise<User> {
    try {
      const res = await Axios.post(`${config.api}/users/signin`, {
        email,
        password,
      });
      if (res.status === 200) {
        if (!res.data) {
          alert("Name or password is incorrect");
        }
        return res.data;
      }
      throw new Error(`Unexpected status code: ${res.status}`);
    } catch (error) {
      console.error("Error signin:", error);
      throw error;
    }
  }
  async getStoredUser(token:string): Promise<User> {
    try {      
      const res = await Axios.post(`${config.api}/users/bytoken`, {
    headers: {
      Authorization: `${token}`,
    },
  });;
      if (res.status === 200) {
        if (res.data) {
          return await res.data.user;
        }
      }
      throw new Error(`Unexpected status code: ${res.status}`);
    } catch (error) {
      console.error("Error getStoredUser:", error);
      throw error;
    }
  }
  
    async getAllUsers(token:string|undefined): Promise<User[]> {
    try {
      const res = await Axios.get(`${config.api}/users/`, {
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
     async deleteUser(id:string,token:string|undefined): Promise<User[]> {
    try {
      const res = await Axios.delete(`${config.api}/users/${id}`, {
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
    async updateUser(id: string, newUser: Partial<User>, token: string | undefined): Promise<User[]> {
      console.log(id);
      
    try {
      const res = await Axios.put(`${config.api}/users/${id}`,{newUser}, {
    headers: {
      Authorization: `${token}`,
    },
  });
      if (res.status === 200) {
        return res.data;
      }
      throw new Error(`Unexpected status code: ${res.status}`);
    } catch (error) {
      console.error("Error update user:", error);
      throw error;
    }}
     decodeToken (token: string) {
      try {
        return jwtDecode(token); // פענוח הטוקן
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    
    
    }
      isTokenValid (token: string): boolean{
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // זמן נוכחי בשניות
      return decoded.exp > currentTime; // בדיקת תוקף
    } catch {
      return false;
    }
  }
  }

export const userService = new UserService();
