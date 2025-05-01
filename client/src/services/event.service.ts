import { Event1 } from "../models/event.model";
import Axios from './axios';
import config from '../config';

export class EventService {
  async createEvent(newEvent: Event1,token:string|undefined): Promise<Event1> {
    try {
      const res = await Axios.post(`${config.api}/events`,{newEvent,token});
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
}

export const eventService = new EventService();
