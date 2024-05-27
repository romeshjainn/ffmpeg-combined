import { getFileName } from "./getFileName";

let path =
  "s3://gurbani-prod/Gao-Gao-Ri-Dulhani/Chuka Nihora 1 - Intro and Discussion.mp4";

function getFolderName(path) {
  const fileName = getFileName(path);
  return fileName;
}

console.log(getFolderName(path));
