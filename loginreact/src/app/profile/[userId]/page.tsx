"use client";

type Props = {
  params: { userId: string };
};

const UserRoute = ({ params }: Props) => {
  return <p>ようこそ {params.userId} さん</p>;
};

export default UserRoute;
