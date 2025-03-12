"use client";

import { signIn } from "@/app/actions/auth";
import { findAllTickets, Ticket } from "@/app/actions/tickets";
import TicketCard from "@/components/TicketCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authContext } from "@/providers/AuthProvider";
import { useContext, useState } from "react";
import { getUserInfo } from "../actions/user";

export default function TicketsList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { setUser } = useContext(authContext);

  const fetchTickets = async () => {
    const tickets = await findAllTickets();
    setTickets(tickets.data);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);

    const response = await signIn(
      formData.get("email") as string,
      formData.get("password") as string
    );

    if (response.status === 200) {
      localStorage.setItem("token", response.data.access_token);

      const user = await getUserInfo();
      localStorage.setItem("user", JSON.stringify(user.data));
      setUser(user.data);
    }
  };

  return (
    <div className="w-full">
      <form className="grid grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div>
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" name="password" type="password" />
        </div>
        <Button type="submit">Connexion</Button>
      </form>
      <Button type="button" onClick={fetchTickets}>
        Fetch Tickets
      </Button>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <Badge variant="TODO">TODO</Badge>
          {tickets
            .filter((ticket) => ticket.status === "TODO")
            .map((ticket) => (
              <TicketCard ticket={ticket} />
            ))}
        </div>
        <div>
          <Badge variant="IN_PROGRESS">IN_PROGRESS</Badge>
          {tickets
            .filter((ticket) => ticket.status === "IN_PROGRESS")
            .map((ticket) => (
              <TicketCard ticket={ticket} />
            ))}
        </div>
        <div>
          <Badge variant="BLOCKED">BLOCKED</Badge>
          {tickets
            .filter((ticket) => ticket.status === "BLOCKED")
            .map((ticket) => (
              <TicketCard ticket={ticket} />
            ))}
        </div>
        <div>
          <Badge variant="DONE">DONE</Badge>
          {tickets
            .filter((ticket) => ticket.status === "DONE")
            .map((ticket) => (
              <TicketCard ticket={ticket} />
            ))}
        </div>
      </div>
    </div>
  );
}
