import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchFilePath } from "@/services/fetchFilePath";

interface AvatarProps {
  userId: string;
}

const Avatar: React.FC<AvatarProps> = ({ userId }) => {
  const [filePath, setFilePath] = useState<string | null>(null);
  const defaultImage = "/heart_red.png.png";

  useEffect(() => {
    const fetchData = async () => {
      const path = await fetchFilePath(userId);
      setFilePath(path);
    };

    fetchData();
  }, [userId]);

  return (
    <Image
      src={
        filePath
          ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/object/public/avatars/${filePath}`
          : defaultImage
      }
      alt="プロフィール画像"
      width={50}
      height={50}
      className="rounded-full mr-4 ml-1 m-1"
    />
  );
};

export default Avatar;
