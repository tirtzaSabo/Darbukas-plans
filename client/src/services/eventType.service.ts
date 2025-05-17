import Axios from "./axios";
import config from "../config";
import { EventType } from "../models/eventType.model";
export class EventTypeService {
 
async createEventType(newEventType: EventType,token:string|undefined): Promise<EventType> {
    try {
      const res = await Axios.post(`${config.api}/event-types`,{ newEventType}, {headers: {
        Authorization: `${token}`
    }});
      if (res.status === 201) {
        console.log("The type has been added to the list");
        return res.data;
      }
      throw new Error(`Unexpected status code: ${res.status}`);
    } catch (error) {
      console.error("Error adding type:", error);
      throw error;
    }
  }

  
    async getAllEventTypes(token:string|undefined): Promise<EventType[]> {
    try {
      const res = await Axios.get(`${config.api}/event-types/`, {
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
     async DeleteEventType(id:string,token:string|undefined): Promise<EventType[]> {
    try {
      const res = await Axios.delete(`${config.api}/event-types/${id}`, {
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
    async UpdateEventType(id: string, newEventType: EventType, token: string | undefined): Promise<EventType[]> {
      console.log(id);
      
    try {
      const res = await Axios.put(`${config.api}/event-types/${id}`,{ newEventType}, {
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
}
export const eventTypeService = new EventTypeService();
