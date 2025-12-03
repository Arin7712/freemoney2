"use server";

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { redirect } from "next/navigation";
import { io } from "socket.io-client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({adapter});

export async function createUser(
  bankingName: string,
  upiId: string,
  clerkId: string
) {
  try {
    const user = await prisma.user.create({
      data: {
        clerkId,
        bankingName,
        upiId,
        onBoarded: true,
      },
    }
  );
  
  console.log("User successfully created.");
  return user;
  } catch (error) {
    console.error("❌ Failed to create user:", error);
    throw error;
  }
}

export async function findUser(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    return user; // null if not found
  } catch (error) {
    console.error("❌ Failed to find user by clerkId:", error);
    throw error;
  }
}


export async function addName(clerkId, name) {
  await prisma.user.update({
    where: { clerkId },
    data: { name },
  });

  // 🔥 Emit WebSocket event
  io.emit("nameUpdated", { clerkId, newName: name });
}
