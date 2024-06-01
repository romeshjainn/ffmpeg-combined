export function splitS3Urls(inputString) {
  const urls = inputString.split("s3://").filter((url) => url !== "");
  return urls.map((url) => "s3://" + url.trim());
}
