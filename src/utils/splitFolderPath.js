export const splitFolderPath = (folderPath) => {
  return folderPath
    .split("/")
    .slice(3)
    .join("-")
    .replace(/^[-\s]+|[-\s]+$/g, "");
};
