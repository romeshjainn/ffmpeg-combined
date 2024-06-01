function replaceSpacesWithHyphens(str) {
  str = str
    .replace(/\s+/g, " ")
    .split(" ")
    .join("-")
    .replace(/[-_\s]+/g, "-")
    .split(".");
  return str[0];
}

export function makeVideoFolderName(fileName) {
  const folderName1 = fileName.replace(/-/g, " ").replace(/\s+/g, "-");
  const folderNameArr = folderName1.split(".");
  const finalFolderName = replaceSpacesWithHyphens(folderNameArr[0]);
  return finalFolderName;
}
