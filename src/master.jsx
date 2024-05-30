import { useEffect, useRef, useState } from "react";
import {
  generateMasterGetCommand,
  getFolderNameMasterCommand,
  getFolderPathName,
  getVideoNameToDelete,
} from "./utils/Master Command/masterCommand";
import { getVideoName } from "./utils/getFileName";

function Master() {
  const [input, setInput] = useState("");
  const [command, setCommand] = useState("");

  const handleCommandChange = (e) => {
    setCommand(e.target.value);
  };

  const data = [
    "s3://gurbani-prod/Ranga-Mein-Vari/Ranga Mein Vaari 1 - Intro and Raag Discussion.mp4",
    "s3://gurbani-prod/Ranga-Mein-Vari/Ranga Mein Vaari 10 - Antra Line 2 - Tutorial (C#).mov",
    "s3://gurbani-prod/Ranga-Mein-Vari/Ranga Mein Vaari 11 - Full shabad demonstration - C#.mov",
    "s3://gurbani-prod/Ranga-Mein-Vari/Ranga Mein Vaari 12 - Full shabad demonstration - A#.mov",
    "s3://gurbani-prod/Ranga-Mein-Vari/Ranga Mein Vaari 2 - Shabad Discussion.mov",
    "s3://gurbani-prod/Ranga-Mein-Vari/Ranga Mein Vaari 3 - Raag and Composition Discussion.mov",
    "s3://gurbani-prod/Ranga-Mein-Vari/Ranga Mein Vaari 4 - Asthai First Line Tutorial (Male scale C#).mov",
    "s3://gurbani-prod/Ranga-Mein-Vari/Ranga Mein Vaari 5 - Asthai Second Line Tutorial (Male scale C#).mov",
    "s3://gurbani-prod/Ranga-Mein-Vari/Ranga Mein Vaari 6 - Asthai Third Line Tutorial (Male scale C#).mov",
    "s3://gurbani-prod/Ranga-Mein-Vari/Ranga Mein Vaari 7 - Full Asthai Demonstration (Male Scale C#).mov",
    "s3://gurbani-prod/Ranga-Mein-Vari/Ranga Mein Vaari 8 - Bandish Variations.mov",
    "s3://gurbani-prod/Ranga-Mein-Vari/Ranga Mein Vaari 9 - Antra Line 1 - Tutorial.mov",
  ];

  const generateCommand = (data) => {
    const actualFolderName = data[0].split("/");
    const firstCommand = `mkdir '${actualFolderName[3]}' && cd '${actualFolderName[3]}'`;

    let command = "";
    let masterCommand = "";

    for (let i = 0; i < data.length; i++) {
      const makeNdNavigateCommand =
        "mkdir" +
        " " +
        `'${getFolderNameMasterCommand(data[i]).replace(
          /^[-\s]+|[-\s]+$/g,
          ""
        )}'` +
        " " +
        "&&" +
        " " +
        "cd" +
        " " +
        `'${getFolderNameMasterCommand(data[i]).replace(
          /^[-\s]+|[-\s]+$/g,
          ""
        )}'`;
      const getCommandFileName = generateMasterGetCommand(data[i]);
      const videoName = getVideoName(data[i]);

      const combinedCommand = `ffmpeg -i "${videoName}" -vf "scale=426:240" -c:v libx264 -profile:v main -level 3.0 -preset veryfast -crf 23 -x264-params keyint=48:min-keyint=48:scenecut=0 -c:a aac -b:a 128k -hls_time 4 -hls_playlist_type vod -hls_segment_filename "240p_%03d.ts" 240p.m3u8 && ffmpeg -i "${videoName}" -vf "scale=640:360" -c:v libx264 -profile:v main -level 3.0 -preset veryfast -crf 23 -x264-params keyint=48:min-keyint=48:scenecut=0 -c:a aac -b:a 128k -hls_time 4 -hls_playlist_type vod -hls_segment_filename "360p_%03d.ts" 360p.m3u8 && ffmpeg -i "${videoName}" -vf "scale=1280:720" -c:v libx264 -profile:v main -level 3.0 -preset veryfast -crf 23 -x264-params keyint=48:min-keyint=48:scenecut=0 -c:a aac -b:a 128k -hls_time 4 -hls_playlist_type vod -hls_segment_filename "720p_%03d.ts" 720p.m3u8 && ffmpeg -i "${videoName}" -vf "scale=1024:-1" -c:v libx264 -profile:v main -level 3.0 -preset veryfast -crf 23 -x264-params keyint=48:min-keyint=48:scenecut=0 -c:a aac -b:a 128k -hls_time 4 -hls_playlist_type vod -hls_segment_filename "1024p_%03d.ts" 1024p.m3u8`;
      //   const videoFileName = getCommandFileNamee(data[i]).split(".")[0];
      //   const masterFile = `echo #EXTM3U > master.m3u8 && echo #EXT-X-STREAM-INF:BANDWIDTH=400000,RESOLUTION=426x240 >> master.m3u8 && echo 240p.m3u8 >> master.m3u8 && echo #EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360 >> master.m3u8 && echo 360p.m3u8 >> master.m3u8 && echo #EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=1280x720 >> master.m3u8 && echo 720p.m3u8 >> master.m3u8 && echo #EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x1024 >> master.m3u8 && echo 1024p.m3u8 >> ${videoFileName}.m3u8`;
      //   console.log(videoFileName);

      const masterFileName = videoName.split(".")[0].trim();

      //   command = makeNdNavigateCommand + " " + "&&" + " " + getCommandFileName;
      const masterFile = `echo "#EXTM3U" > '${masterFileName}.m3u8'; echo "#EXT-X-STREAM-INF:BANDWIDTH=400000,RESOLUTION=426x240" >> '${masterFileName}.m3u8'; echo "240p.m3u8" >> '${masterFileName}.m3u8'; echo "#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360" >> '${masterFileName}.m3u8'; echo "360p.m3u8" >> '${masterFileName}.m3u8'; echo "#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=1280x720" >> '${masterFileName}.m3u8'; echo "720p.m3u8" >> '${masterFileName}.m3u8'; echo "#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x1024" >> '${masterFileName}.m3u8'; echo "1024p.m3u8" >> '${masterFileName}.m3u8'`;

      const deleteVideoCommand = `rm -r '${getVideoNameToDelete(data[i])}'`;

      command = `${makeNdNavigateCommand} && ${masterFile} && ${getCommandFileName} && ${combinedCommand} && ${deleteVideoCommand} && cd .. && `;
      masterCommand += command;
    }
    const putFilesCommand =
      `s3cmd put --recursive ./* s3://gurbani-prod/${getFolderPathName(
        data[1]
      )}/`.replace(/^[-\s]+|[-\s]+$/g, "");
    setCommand(
      firstCommand +
        " && " +
        masterCommand +
        putFilesCommand +
        " && " +
        "cd .." +
        " && " +
        "rm -r " +
        `'${actualFolderName[3]}'` +
        " && " +
        `echo '${actualFolderName[3]} folder completed'`
    );
  };
  const ref = useRef({ value: true });
  useEffect(() => {
    // function makeArray(paths) {
    //   const arr = paths.split("s3://");
    //   const finalArray = arr.map((path) => {
    //     return `s3://${path}`;
    //   });
    //   finalArray.shift();
    //   return finalArray;
    // }

    if (ref.current.value) {
      // const getInput = makeArray(input || "");
      // if (getInput.length) {
      generateCommand(data);
      // }
      // ref.current.value = false;
    }
  }, [input, command]);

  useEffect(() => {
    console.log(command);
  }, [command, input]);

  return (
    <div className="grid place-items-center h-screen bg-white text-[2.7vh]">
      <div className="border-2 border-black bg-[#eaeaea] p-4 w-[65%] h-[80%] gap-4 flex flex-col rounded-[7px]">
        <input
          type="text"
          placeholder="ENTER THE PATH"
          className="border-2 border-black p-2 w-full rounded-[7px]"
          id=""
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div className=" text-[2.7vh] flex justify-between border-2 border-black p-1 bg-blue-500 items-center rounded-[7px]">
          <p className="font-bold text-white">Command</p>
          <button
            onClick={() => {
              navigator.clipboard
                .writeText(command)
                .then(() => {
                  alert("copied");
                })
                .catch((error) => console.log("Error copying text: ", error));
            }}
            className="bg-black  rounded-[7px] text-white font-bold  p-1"
          >
            Copy Command
          </button>
        </div>
        <textarea
          className="h-full w-full border-2 border-black rounded-[7px] text-[2.3vh] font-medium p-2"
          name=""
          id=""
          value={command}
          onChange={handleCommandChange}
        ></textarea>
      </div>
    </div>
  );
}

export default Master;
