function splitS3Urls(inputString) {
  const urls = inputString.split("s3://").filter((url) => url !== "");
  return urls.map((url) => "s3://" + url.trim());
}

const a = `s3://gurbani-prod/Dekhau Bhai/Videos/English/Dekho Bhai (English) 1 - Introduction.mp4
s3://gurbani-prod/Dekhau Bhai/Videos/English/Dekho Bhai (English) 2 - Composition Introduction.mp4
s3://gurbani-prod/Dekhau Bhai/Videos/English/Dekho Bhai (English) 3 - Asthai Tutorial (Male scale).mp4
s3://gurbani-prod/Dekhau Bhai/Videos/English/Dekho Bhai (English) 4 - Asthai Tutorial (Female scale).mp4
s3://gurbani-prod/Dekhau Bhai/Videos/English/Dekho Bhai (English) 5 - Antra Tutorial (Female scale).mp4
s3://gurbani-prod/Dekhau Bhai/Videos/English/Dekho Bhai (English) 6 - Antra Tutorial (Male scale).mp4
s3://gurbani-prod/Dekhau Bhai/Videos/English/Dekho Bhai (English) 7 - Full shabad demonstration (Male scale).mp4
s3://gurbani-prod/Dekhau Bhai/Videos/English/Dekho Bhai (English) 8 - Full shabad demonstration (Female scale).mp4`;

console.log(splitS3Urls(a));
