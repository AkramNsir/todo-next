"use server";
// import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
// import { userType } from "@/types/userType";

export const getAllUsers = async () => {
  const data = await db.select().from(users);
  return data;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUser = async (userId: any) => {
  const user = await db.query.users.findMany({
    where: (users, { eq }) => eq(users.clerkId, userId),
    with: {
      todos: true,
    },
  });

  return user;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addUser = async (user: any) => {
  await db
    .insert(users)
    .values({
      name: user?.name,
      email: user?.email,
      clerkId: user?.clerkId,
      firstName: user?.firstName,
      lastName: user?.lastName,
      photo: user?.photo,
    })
    .returning({ clerkClientId: users?.clerkId });
};
