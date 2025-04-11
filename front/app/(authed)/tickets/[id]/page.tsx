"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  findOneTicket,
  handleUpdateTicket,
  Ticket,
} from "@/app/actions/tickets";
import { getAll, User } from "@/app/actions/user";
import { MultiSelect } from "@/components/ui/multi-select";

export default function TicketInfo() {
  const { id } = useParams<{ id: string }>();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);

  const fetchTicket = async (id: number) => {
    const ticket = await findOneTicket(id);
    setTicket(ticket.data);
  };

  const fetchUsers = async () => {
    const users = await getAll();
    setUsers(users.data);
  };

  const handleChangeParticipants = (ids: string[]) => {
    if (ticket) {
      handleUpdateTicket(+id, {
        participants: ids,
      });
    }
  };
  const handleChangeReviewers = (ids: string[]) => {
    if (ticket) {
      handleUpdateTicket(+id, {
        reviewers: ids,
      });
    }
  };

  useEffect(() => {
    fetchTicket(+id);
    fetchUsers();
  }, [id]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {ticket.filePath && (
        <Image
          src={`/api/media/${ticket.filePath}`}
          alt="image"
          width={100}
          height={100}
        />
      )}
      <h2 className="font-bold text-3xl">{ticket.title}</h2>
      <p>{ticket.content}</p>
      <div>
        <span>Assigné à </span>
        <MultiSelect
          className="w-1/3"
          options={
            users?.map((user) => ({
              label: `${user.firstName} ${user.lastName}`,
              value: user.id.toString(),
            })) ?? []
          }
          onValueChange={handleChangeParticipants}
          defaultValue={ticket.participants.map((user) => user.id.toString())}
          placeholder="Select frameworks"
          maxCount={2}
        />
      </div>
      <div>
        <span>Reviewer: </span>
        <MultiSelect
          className="w-1/3"
          options={
            users
              ?.filter((user) => user.role === "REVIEWER")
              .map((user) => ({
                label: `${user.firstName} ${user.lastName}`,
                value: user.id.toString(),
              })) ?? []
          }
          onValueChange={handleChangeReviewers}
          defaultValue={ticket.reviewers.map((user) => user.id.toString())}
          placeholder="Select frameworks"
          maxCount={2}
        />
      </div>
    </div>
  );
}
