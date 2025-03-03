import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import React from "react";

const UserPage = async () => {
  const session = await auth();
  return (
    <>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
      <h1>{session?.user?.id}</h1>
      <div>
        <Avatar>
          <AvatarImage src={session?.user?.image ?? " "} />
          <AvatarFallback>{session?.user?.name?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
};

export default UserPage;
