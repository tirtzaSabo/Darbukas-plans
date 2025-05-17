import { Event1 } from "../models/event.model";
import Axios from './axios';
import config from '../config';

export class EventService {
  async createEvent(newEvent: Event1,token:string|undefined): Promise<Event1> {
    try {
      const res = await Axios.post(`${config.api}/events`,{newEvent}, {headers: {
        Authorization: `${token}`
    }});
      if (res.status === 201) {
        console.log("The event has been added to the list");
        return res.data;
      }
      throw new Error(`Unexpected status code: ${res.status}`);
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  }
  async gatAllEvents(token:string|undefined): Promise<Event1[]> {
    try {
      const res = await Axios.get(`${config.api}/events`, {
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
     async deleteEvent(id:string,token:string|undefined): Promise<Event1[]> {
        try {
          const res = await Axios.delete(`${config.api}/events/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
          if (res.status === 200) {
            return res.data;
          }
          throw new Error(`Unexpected status code: ${res.status}`);
        } catch (error) {
          console.error("Error delete event:", error);
          throw error;
        }}
     async updateEvent(id: string, newEvent: Partial<Event1>, token: string | undefined): Promise<Event1[]> {
          console.log(id);
          
        try {
          const res = await Axios.put(`${config.api}/events/${id}`,{newEvent}, {
        headers: {
          Authorization: `${token}`,
        },
      });
          if (res.status === 200) {
            return res.data;
          }
          throw new Error(`Unexpected status code: ${res.status}`);
        } catch (error) {
          console.error("Error update event:", error);
          throw error;
        }}
}

export const eventService = new EventService();
