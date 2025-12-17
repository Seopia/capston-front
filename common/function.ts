import { Cloud, CloudLightning, CloudRain, Sun, SunDim, Tornado, BadgeAlert } from "lucide-react";

export const formattedDateTime = (createAt: number[]) => {
  if (!createAt) return '';
  const today = new Date();

  const formattedDate = `${createAt[0]}-${String(createAt[1]).padStart(2, '0')}-${String(createAt[2]).padStart(2, '0')}T${String(createAt[3]).padStart(2, '0')}:${String(createAt[4]).padStart(2, '0')}:${String(createAt[5]).padStart(2, '0')}`;
  const createDate = new Date(formattedDate);

  const diffMs = today.getTime() - createDate.getTime();
  const diffInMinutes = Math.floor(diffMs / (1000 * 60));
  const diffInHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "방금 전";
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  if (diffInDays < 1) return `${diffInDays}일 전`;

  return `${createAt[0]}.${String(createAt[1]).padStart(2, '0')}.${String(createAt[2]).padStart(2, '0')} ${String(createAt[3]).padStart(2, '0')}:${String(createAt[4]).padStart(2, '0')}`;
}

export const getEmotionWeatherIcon = (score: number | undefined) => {
  if (score === undefined) return [Cloud, "text-gray-400"]
  if (score === 5) {
    return [Sun, "text-red-500", "최고"]
  } else if (score >= 4) {
    return [SunDim, "text-yellow-500", "맑음"]
  } else if (score >= 3) {
    return [Cloud, "text-blue-400", "흐림"]
  } else if (score >= 2) {
    return [CloudRain, "text-blue-500", "비"]
  } else if (score >= 1) {
    return [CloudLightning, "text-gray-400","번개"]
  } else if (score > 0) {
    return [Tornado, "text-black-500", "토네이도"]
  } else {
    return [BadgeAlert, "text-black-500", "알 수 없음"]
  }
}