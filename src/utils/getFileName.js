export function getFileName(path) {
  const fileName = path.split("/");
  const fileNameLength = fileName.length;
  return fileName[fileNameLength - 1];
}

export function getFolderName(path) {
  const fileName = getFileName(path);
  const folderName1 = fileName.replace(/-/g, " ").replace(/\s+/g, "-");
  const folderNameArr = folderName1.split(".");
  return folderNameArr[0];
}

export function mkdirGetFolderName(path) {
  const fileName = getFileName(path);
  const folderName1 = fileName.replace(/-/g, " ").replace(/\s+/g, "-");
  const folderNameArr = folderName1.split(".");
  return `mkdir ${folderNameArr[0]}`;
}

export function cdGetFolderName(path) {
  const fileName = getFileName(path);
  const folderName1 = fileName.replace(/-/g, " ").replace(/\s+/g, "-");
  const folderNameArr = folderName1.split(".");
  return `cd ${folderNameArr[0]}`;
}

console.log(
  getFolderName(
    "s3://gurbani-prod/Chuka-Nihora/Chuka Nihora 1 - Intro and Discussion.mp4"
  )
);

export const generateGetCommand = (path) => {
  const videoPath = path.substring(18);
  const rootPath = videoPath.split("/")[0];
  const folderName = getFolderName(path);
  let command = `s3cmd get "s3://gurbani-prod/${videoPath}" /root/${rootPath}/${folderName}`;
  return command;
};

export const getVideoName = (path) => {
  const fileName = path.split("/");
  return fileName[4];
};
// s3cmd get "s3://gurbani-prod/Gao-Gao-Ri-Dulhani/Gao Gao Ri 11 - Full shabad demonstration - Female scale.mp4" /root/Gao-Gao-Ri-Dulhani/Gao-Gao-Ri-11-Full-shabad-demonstration-Female-scale
