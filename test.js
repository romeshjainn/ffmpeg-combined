function splitS3Urls(inputString) {
  const urls = inputString.split("s3://").filter((url) => url !== "");
  return urls.map((url) => "s3://" + url.trim());
}

const a = [
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 10 - Antra 1st line (Male scale C#).mov",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 11 - Asthai 3rd line (Male scale C#).mp4",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 12 - Asthai 2nd line (Male scale C#).mp4",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 13 - Asthai 1st line (Male scale C#).mp4",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 14 - Intro:Raag Discussion.mp4",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 15 - Outro.mp4",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 2 - Full shabad demonstration (Male scale C#).mp4",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 2.1 -  Full shabad demonstration (Female scale A#).mp4",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 3 - Antra 3rd line (Female scale A#).mp4",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 4 - Antra 2nd line (Female scale A#).mp4",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 5 - Antra 1st line (Female scale A#).mp4",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 6 - Asthai 3rd line (Female scale A#).mp4",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 7 - Asthai 2nd line (Female scale A#).mp4",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 8 - Asthai first line (Female scale A#).mp4",
  "s3://gurbani-prod/Dekh Phool Phool/Video/Dekh Phool 9 - Antra 2nd line (Male scale C#).mp4",
];

const test = a.filter((path) => path.includes(".mp4") || path.includes(".mov"));

console.log(test);
