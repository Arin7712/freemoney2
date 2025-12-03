"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000");

export default function UserNameListener({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    socket.on("userUpdated", (data) => {
      setName(data.name);
    });

    return () => {
      socket.off("userUpdated");
    };
  }, []);

  return <h1>{name || "no name"}</h1>;
}
