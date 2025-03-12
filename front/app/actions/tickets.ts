import { AxiosResponse } from "axios";
import { api } from "../../lib/api";
import { User } from "./user";

export interface Ticket {
  id: number;
  title: string;
  content: string;
  status: "TODO" | "IN_PROGRESS" | "BLOCKED" | "DONE";
  createdAt: Date;
  updatedAt: Date;
  participants: User[];
  reviewers: User[];
}

export const findAllTickets = async (): Promise<AxiosResponse<Ticket[]>> => {
  return api.get("tickets");
};

export const findOneTicket = async (
  id: number
): Promise<AxiosResponse<Ticket>> => {
  return api.get(`tickets/${id}`);
};
