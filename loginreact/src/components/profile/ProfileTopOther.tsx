"use client";
import ButtonFollow from "../Button/ButtonFollow";
import { Dispatch, SetStateAction } from "react";
import Avatar from "../Avataer";

interface ProfileTopProps {
  userId: string;
  isFollow: boolean;
  setIsFollow: Dispatch<SetStateAction<boolean>>;
  setPushFollow: Dispatch<SetStateAction<number>>;
}

const ProfileTopOther: React.FC<ProfileTopProps> = ({
  userId,
  isFollow,
  setIsFollow,
  setPushFollow,
}) => {
  return (
    <div>
      {/* 3Word */}
      <div className="flex items-center">
        <Avatar userId={userId} />
        <div className="absolute right-6 sm:right-12">
          <ButtonFollow
            userId={userId}
            isFollow={isFollow}
            setIsFollow={setIsFollow}
            setPushFollow={setPushFollow}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTopOther;
