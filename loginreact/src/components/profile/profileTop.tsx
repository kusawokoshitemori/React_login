"use client";
import Button from "../Button/Button";
import Avatar from "../Avataer";
import useAuth from "@/hooks/useAuth";

interface ProfileTopProps {
  openModal: () => void; // 関数型を定義
}

const ProfileTop: React.FC<ProfileTopProps> = ({ openModal }) => {
  const PlayerUser = useAuth();
  if (!PlayerUser) return;
  return (
    <div>
      {/* 3Word */}
      <div className="flex items-center">
        <Avatar userId={PlayerUser.id} />
        <div className="absolute right-6 sm:right-12">
          <Button onClick={openModal} />
        </div>
      </div>
    </div>
  );
};

export default ProfileTop;
