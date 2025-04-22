import AgeGroups from "./ages.enum";
import { EventStatus } from "./status.enum";

export interface Event1 {
    age: AgeGroups;
    numOfParticipants: number;
    date: Date;
    place: string;
    service: string;
    user: string;
    duration: number;
    description: string;
    status: EventStatus;
  }