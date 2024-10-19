"use client";

import useAuth from "@/hooks/useAuth";
import ProfileTop from "@/components/profileTop";
import ProfileSecond from "@/components/profileSecond";
import Introduce from "@/components/Introduce";
import Contents from "@/components/contents";
import FetchPosts from "@/components/test";

const Profile = () => {
  const user = useAuth();

  return (
    <div className="w-full">
      <ProfileTop />
      {user?.id ? (
        <ProfileSecond userId={user.id} />
      ) : (
        <div>Loading...</div> // ローディング中の表示
      )}
      {user?.id ? (
        <Introduce userId={user.id} />
      ) : (
        <div>Loading...</div> // ローディング中の表示
      )}
      <Contents />
      {user?.id ? (
        <FetchPosts userId={user.id} />
      ) : (
        <div>Loading...</div> // ローディング中の表示
      )}
    </div>
  );
};

export default Profile;
