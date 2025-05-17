import AgeGroups from "./ages.enum";
import { EventStatus } from "./status.enum";

export interface Event1 {
  _id?: string;
  age: AgeGroups;
  numOfParticipants: Number;
  date: Date;
  place: string;
  service: string;
  user: string;
  duration: number;
  description: string;
  status: EventStatus;
}
