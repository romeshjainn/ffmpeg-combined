export function SplitDataFromPath(data) {
  const pathDetailsArray = [];

  for (let i = 0; i < data.length; i++) {
    const splitData = data[i].split("/");
    const fileName = splitData[splitData.length - 1];
    const fileExtension = "." + fileName.split(".")[1];
    const folderName = splitData[3];
    const folderPath =
      "s3://gurbani-prod/" +
      splitData.slice(3, splitData.length - 1).join("/") +
      "/";

    const updatedPathDetails = {
      videoName: fileName.trim(),
      fileExtension: fileExtension.trim(),
      folderName: folderName.trim(),
      folderPath: folderPath.trim(),
    };

    pathDetailsArray.push(updatedPathDetails);
  }

  return pathDetailsArray;
}
