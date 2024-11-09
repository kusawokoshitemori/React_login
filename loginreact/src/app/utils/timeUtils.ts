export const isTimeExceeded = (time: string) => {
  const timeDate = new Date(time);
  const now = new Date();

  // 差分を計算（ミリ秒単位での差分）
  const timeDifference = now.getTime() - timeDate.getTime();

  // 1時間（3600000ミリ秒）以上経過しているかどうか
  return timeDifference >= 3600000;
};
