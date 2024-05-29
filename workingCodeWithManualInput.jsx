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
    "s3://gurbani-prod/Meri-Preet-Gobind/Meri Preet Gobind 1 - Composition Discussion 1.mov",
    "s3://gurbani-prod/Meri-Preet-Gobind/Meri Preet Gobind 2 - Raag Discussion 1.mov",
    "s3://gurbani-prod/Meri-Preet-Gobind/Meri Preet Gobind 3 - Asthai Line 1 - Tutorial 1.mov",
    "s3://gurbani-prod/Meri-Preet-Gobind/Meri Preet Gobind 4 - Asthai Line 2 - Tutorial 1.mov",
    "s3://gurbani-prod/Meri-Preet-Gobind/Meri Preet Gobind 5 - Asthai Line 3 - Tutorial.mov",
    "s3://gurbani-prod/Meri-Preet-Gobind/Meri Preet Gobind 6 - Asthai Line 4 - Tutorial 1.mov",
    "s3://gurbani-prod/Meri-Preet-Gobind/Meri Preet Gobind 7 - Antra Line 1 - Tutorial 1.mov",
    "s3://gurbani-prod/Meri-Preet-Gobind/Meri Preet Gobind 8 - Antra Line 2 - Tutorial 1.mov",
    "s3://gurbani-prod/Meri-Preet-Gobind/Meri Preet Gobind 9 - Antra Line 3 - Tutorial 1.mov",
    "s3://gurbani-prod/Meri-Preet-Gobind/Meri Preet Gobind 10 - Antra Line 4 - Tutorial 1.mov",
    "s3://gurbani-prod/Meri-Preet-Gobind/Meri Preet Gobind 11 - Full shabad demonstration - Male Scale 1.mov",
    "s3://gurbani-prod/Meri-Preet-Gobind/Meri Preet Gobind 12 -Full shabad demonstration - female scale 1.mov",
  ];

  const generateCommand = (data) => {
    const actualFolderName = data[0].split("/");
    const firstCommand = `mkdir ${actualFolderName[3]} && cd ${actualFolderName[3]}`;

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
    function makeArray(paths) {
      const arr = paths.split("s3://");
      const finalArray = arr.map((path) => {
        return `s3://${path}`;
      });
      finalArray.shift();
      return finalArray;
    }

    if (ref.current.value) {
      const getInput = makeArray(input || "");
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
    <div className="grid place-items-center h-screen bg-[#eaeaea]">
      <div className="border-2 border-black p-4 w-1/2 h-[70%] gap-4 flex flex-col rounded-2xl">
        <input
          type="text"
          placeholder="ENTER THE PATH"
          className="border-2 border-black p-3 w-full rounded-xl"
          id=""
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div className="flex justify-between border-2 border-black p-2 bg-blue-500 items-center rounded-xl">
          <p className="font-bold text-xl text-white">Command</p>
          <button
            onClick={() => {
              navigator.clipboard
                .writeText(command)
                .then(() => {
                  alert("copied");
                })
                .catch((error) => console.log("Error copying text: ", error));
            }}
            className="bg-black  rounded-xl text-white font-bold  p-2"
          >
            Copy Command
          </button>
        </div>
        {/* <textarea
          className="h-full w-full border-2 border-black rounded-xl text-[1rem] p-2"
          name=""
          id=""
          value={command}
          onChange={(e) => handleCommandChange(e)}
        ></textarea> */}

        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}

export default Master;
