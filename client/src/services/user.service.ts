import { User } from "../models/user.model";
import Axios from "./axios";
import config from "../config";
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
        withCredentials: true,
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
        withCredentials: true,
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
      const res = await Axios.post(`${config.api}/users/bytoken`, {token},);
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
  async logout() {
    try {
      const res = await Axios.post(`${config.api}/users/logout`, {
        withCredentials: true,
      });
      if (res.status != 200) {
        throw new Error(`Unexpected status code: ${res.status}`);
      }      
    } catch (error) {
      console.error("Error logout:", error);
      throw error;
    }
  }
}
export const userService = new UserService();
