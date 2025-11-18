"use server";

import { dbCollection, dbConnect } from "@/lib/mongodb";


export async function saveUserToDB(userInfo) {
  const UserCollection = dbConnect(dbCollection.UserCollection);

  // check exist
  const exist = await UserCollection.findOne({ email: userInfo.email });
  if (exist) return { exists: true };

  await UserCollection.insertOne({
    ...userInfo,
    createdAt: new Date(),
  });

  return { exists: false };
}
