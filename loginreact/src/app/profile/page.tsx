import Image from "next/image";

const profile = () => {
  return (
    <div>
      3Word
      <Image src="/karukaru.png" alt="test用画像" width={200} height={200} />
    </div>
  );
};

export default profile;
