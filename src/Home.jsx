import { useEffect, useState } from "react";
import { SplitDataFromPath } from "./utils/splitDataFromPath";
import { splitFolderPath } from "./utils/splitFolderPath";
import { makeVideoFolderName } from "./utils/makeVideoFolderName";
import { splitS3Urls } from "./utils/makeArray";

function Home() {
  const [mainArray, setMainArray] = useState([]);
  const [pathArray, setPathArray] = useState([]);
  const [input, setInput] = useState("");
  const [command, setCommand] = useState("");

  const generateCommand = (data) => {
    let localCommand = "";
    let masterCommand = "";
    const mainArrayLength = data.length;

    const rootFolderName = splitFolderPath(data[0].folderPath);
    const firstCommand = `mkdir '${rootFolderName}' && cd '${rootFolderName}'`;

    data.forEach((data, index) => {
      const videoFolderName = makeVideoFolderName(
        data.videoName.replace(new RegExp(data.fileExtension, "g"), "")
      );
      const secondCommand = `mkdir '${videoFolderName}' && cd '${videoFolderName}'`;

      const masterFileCommand = `echo "#EXTM3U" > '${videoFolderName}.m3u8'; echo "#EXT-X-STREAM-INF:BANDWIDTH=400000,RESOLUTION=426x240" >> '${videoFolderName}.m3u8'; echo "240p.m3u8" >> '${videoFolderName}.m3u8'; echo "#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360" >> '${videoFolderName}.m3u8'; echo "360p.m3u8" >> '${videoFolderName}.m3u8'; echo "#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=1280x720" >> '${videoFolderName}.m3u8'; echo "720p.m3u8" >> '${videoFolderName}.m3u8'; echo "#EXT-X-STREAM-INF:BANDWIDTH=4500000,RESOLUTION=1920x1080" >> '${videoFolderName}.m3u8'; echo "1080p.m3u8" >> '${videoFolderName}.m3u8'`;
      const getCommand = `s3cmd get '${data.folderPath}${data.videoName}' '/root/${rootFolderName}/${videoFolderName}/'`;

      const conversionCommand = `ffmpeg -i "${data.videoName}" -vf "scale=426:240" -c:v libx264 -profile:v main -level 3.0 -preset veryfast -crf 23 -x264-params keyint=48:min-keyint=48:scenecut=0 -c:a aac -b:a 128k -hls_time 4 -hls_playlist_type vod -hls_segment_filename "240p_%03d.ts" 240p.m3u8 && ffmpeg -i "${data.videoName}" -vf "scale=640:360" -c:v libx264 -profile:v main -level 3.0 -preset veryfast -crf 23 -x264-params keyint=48:min-keyint=48:scenecut=0 -c:a aac -b:a 128k -hls_time 4 -hls_playlist_type vod -hls_segment_filename "360p_%03d.ts" 360p.m3u8 && ffmpeg -i "${data.videoName}" -vf "scale=1280:720" -c:v libx264 -profile:v main -level 3.0 -preset veryfast -crf 23 -x264-params keyint=48:min-keyint=48:scenecut=0 -c:a aac -b:a 128k -hls_time 4 -hls_playlist_type vod -hls_segment_filename "720p_%03d.ts" 720p.m3u8 && ffmpeg -i "${data.videoName}" -vf "scale=1920:-2" -c:v libx264 -profile:v main -level 3.0 -preset veryfast -crf 23 -x264-params keyint=48:min-keyint=48:scenecut=0 -c:a aac -b:a 128k -hls_time 4 -hls_playlist_type vod -hls_segment_filename "1080p_%03d.ts" 1080p.m3u8`;

      const deleteVideoCommand = `rm -r '${data.videoName}'`;

      const videoSuccessMsg = `echo '${data.videoName} folder completed ${
        index + 1
      }/${mainArrayLength} video completed'`;

      localCommand = `${secondCommand} && ${masterFileCommand} && ${getCommand} && ${conversionCommand} && ${deleteVideoCommand} && ${videoSuccessMsg} && cd .. && `;
      masterCommand += localCommand;
    });

    const mainFolderPath = data[0].folderPath;
    const putCommand = `s3cmd put --recursive --acl-public ./* '${mainFolderPath}'`;
    const successMessage = `echo '${rootFolderName} Completed'`;
    setCommand(
      firstCommand +
        " && " +
        masterCommand.replace(/ && cd \.\. && $/, "").trim() +
        " && " +
        "cd .." +
        " && " +
        putCommand +
        " && " +
        successMessage +
        " && " +
        "cd .." +
        " && " +
        `rm -r '${rootFolderName}'`
    );
  };

  useEffect(() => {
    if (input.length) {
      const data = splitS3Urls(input).filter(
        (path) => path.includes(".mp4") || path.includes(".mov")
      );
      console.log(data);
      setPathArray(data);
      const processedData = SplitDataFromPath(data);
      setMainArray(processedData);
      generateCommand(processedData);
    }
    // }
  }, [input]);

  return (
    <div className="h-full p-6">
      <input
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="w-full p-2 rounded-sm"
        placeholder="Enter Path Text"
      />

      <div className="flex gap-2 pb-2 my-3">
        <pre className="text-[2.2vh] w-[70%] text-white text-wrap font-medium p-2 bg-black">
          <code>{JSON.stringify(pathArray, null, 2)}</code>
        </pre>
        <div className="w-[30%] flex flex-col gap-2">
          <div className="grid place-items-center bg-red-500 text-white font-semibold rounded-sm ">
            <button
              onClick={() => {
                navigator.clipboard
                  .writeText(command.trim())
                  .then(() => {
                    alert("copied");
                  })
                  .catch((error) => console.log("Error copying text: ", error));
              }}
              className="font-semibold rounded-xl py-1"
            >
              Copy Command
            </button>
          </div>
          <textarea
            name=""
            value={command}
            className="w-full h-[85%] rounded-sm p-2"
            readOnly
          ></textarea>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-bold flex justify-evenly items-center border-2 text-white border-black p-2 text-[2.7vh]">
          <p className="w-1/4 text-center">Folder Name</p>
          <p className="w-1/4 text-center">File Name</p>
          <p className="w-1/4 text-center">Folder Path</p>
          <p className="w-1/4 text-center">File Extension</p>
        </div>
        {mainArray?.map((item, index) => {
          return (
            <div
              key={index}
              className="font-semibold flex justify-evenly items-center border-2 border-black p-2 text-[2.4vh] text-white"
            >
              <p className="w-1/4 text-center">{item.videoName}</p>
              <p className="w-1/4 text-center">{item.folderPath}</p>
              <p className="w-1/4 text-center">{item.folderName}</p>
              <p className="w-1/4 text-center">{item.fileExtension}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
