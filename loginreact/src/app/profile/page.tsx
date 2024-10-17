import Image from "next/image";
import Button from "@/components/Button";

const profile = () => {
  return (
    <div>
      3Word
      <Image
        src="/karukaru.png"
        alt="test用画像"
        width={200}
        height={200}
        className="rounded-full"
      />
      <Button />
    </div>
  );
};

export default profile;
