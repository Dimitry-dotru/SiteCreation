"use client"

import { userObj } from "@/src/utils/types/steamTypes";
import { authOperation } from "@/src/utils/functions/authorization";
import { getUserFromDb } from "@/src/utils/functions/steamRequests";

import Header from "@/components/Header";
import UserBanner from "@/components/UserBanner";
import React from "react";
import FriendsList from "@/components/FriendsList";
import GamesList from "@/components/GamesList";


interface PageProps {
  params: {
    steamid: number;
  };
}

const Page: React.FC<any> = ({ params }: PageProps) => {
  const [steamUser, setSteamUser] = React.useState<userObj | null>(null);
  const [visitedUser, setVisitedUser] = React.useState<userObj | null>(null);

  React.useEffect(() => {
    const asyncFunc = async () => {
      const user = await getUserFromDb(params.steamid);
      setVisitedUser(user);
    }
    asyncFunc();
    authOperation(setSteamUser);
  }, []);

  return <>
  <Header setSteamUser={setSteamUser} steamUser={steamUser} />
  <UserBanner avatar={visitedUser ? visitedUser.avatarfull : null} userbanner={visitedUser ? visitedUser.cyberspace_settings.public.userbanner : null} />
    <main>
      <div className="container">
        <div className="testing-block ">
        </div>
      </div>
        <aside>
          <FriendsList steamUser={visitedUser} />
          <GamesList steamUser={visitedUser} />
        </aside>
    </main>
  </>
};

export default Page;