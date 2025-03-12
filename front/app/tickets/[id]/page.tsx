"use client";

import { findOneTicket, Ticket } from "@/app/actions/tickets";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TicketInfo() {
  const { id } = useParams<{ id: string }>();

  const [ticket, setTicket] = useState<Ticket | null>(null);

  const fetchTicket = async (id: number) => {
    const ticket = await findOneTicket(id);
    setTicket(ticket.data);
  };

  useEffect(() => {
    fetchTicket(+id);
  }, [id]);

  // console.log(ticket.data);

  return (
    <div>
      Ticket info<p>{ticket?.title}</p>
    </div>
  );
}
