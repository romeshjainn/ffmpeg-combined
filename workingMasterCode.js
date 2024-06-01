export function getCommandFileName(path) {
  const fileName = path.split("/");
  const fileNameLength = fileName.length;
  return fileName[fileNameLength - 1];
}

export function getCommandFolderName(path) {
  const fileName = getCommandFileName(path);
  const folderName1 = fileName.replace(/-/g, " ").replace(/\s+/g, "-");
  const folderNameArr = folderName1.split(".");
  return folderNameArr[0];
}

export function getFolderPathName(path) {
  const folderName = path.split("/")[3];
  return folderName.replace(/^[-\s]+|[-\s]+$/g, "");
}

export function mkdirGetCommandFolderName(path) {
  const fileName = getCommandFileName(path);
  const folderName1 = fileName.replace(/-/g, " ").replace(/\s+/g, "-");
  const folderNameArr = folderName1.split(".");
  return `mkdir ${folderNameArr[0]}`;
}
function replaceSpacesWithHyphens(str) {
  str = str
    .replace(/\s+/g, " ")
    .split(" ")
    .join("-")
    .replace(/[-_\s]+/g, "-")
    .split(".");
  return str[0];
}
export function firstMasterCommand(path) {
  const fileName = getCommandFileName(path);
  const folderName1 = fileName.replace(/-/g, " ").replace(/\s+/g, "-");
  const folderNameArr = folderName1.split(".");
  const finalFolderName = replaceSpacesWithHyphens(folderNameArr[0]);
  return `mkdir ${finalFolderName} cd ${finalFolderName}`;
}

export function getFolderNameMasterCommand(path) {
  const fileName = getCommandFileName(path);
  const folderName1 = fileName.replace(/-/g, " ").replace(/\s+/g, "-");
  const folderNameArr = folderName1.split(".");
  const finalFolderName = replaceSpacesWithHyphens(folderNameArr[0]);
  return finalFolderName;
}

export const generateMasterGetCommand = (path) => {
  const videoPath = path.substring(18).replace(/^[-\s]+|[-\s]+$/g, "");
  const rootPath = videoPath.split("/")[0];
  const videoName = videoPath
    .split("/")[1]
    .split(".")[0]
    .replace(/^[-\s]+|[-\s]+$/g, "");
  const videoExtension = videoPath
    .split("/")[1]
    .split(".")[1]
    .replace(/^[-\s]+|[-\s]+$/g, "");

  const trimmedVideoName = videoName + "." + videoExtension;
  const folderName = getFolderNameMasterCommand(path).replace(
    /^[-\s]+|[-\s]+$/g,
    ""
  );
  let command = `s3cmd get "s3://gurbani-prod/${rootPath}/${trimmedVideoName}" '/root/${rootPath}/${folderName}'`;
  return command;
};

export const getVideoNameToDelete = (path) => {
  const videoPath = path.substring(18).replace(/^[-\s]+|[-\s]+$/g, "");
  const videoName = videoPath
    .split("/")[1]
    .split(".")[0]
    .replace(/^[-\s]+|[-\s]+$/g, "");
  const videoExtension = videoPath
    .split("/")[1]
    .split(".")[1]
    .replace(/^[-\s]+|[-\s]+$/g, "");

  const trimmedVideoName = videoName + "." + videoExtension;
  return trimmedVideoName;
};

export const getVideoName = (path) => {
  const fileName = path.split("/");
  return fileName[4];
};
// s3cmd get "s3://gurbani-prod/Gao-Gao-Ri-Dulhani/Gao Gao Ri 11 - Full shabad demonstration - Female scale.mp4" /root/Gao-Gao-Ri-Dulhani/Gao-Gao-Ri-11-Full-shabad-demonstration-Female-scale
