import { useState } from "react";
import {
  cdGetFolderName,
  generateGetCommand,
  getVideoName,
  mkdirGetFolderName,
} from "./utils/getFileName";

function App() {
  // const [getCommandColor, setGetCommandColor] = useState("red");
  const [GetCommand, setGetCommand] = useState("red");
  const [ConversionCommand, setConversionCommand] = useState("red");
  const [folderName, setFolderName] = useState("red");
  const [changeFolderName, setChangeFolderName] = useState("red");

  const [showUrl, setShowUrl] = useState("");
  const [inputDetails, setInputDetails] = useState({
    videoPath: "",
    videoIndex: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputDetails((prevState) => ({
      ...prevState,
      [name]: value.replace(/^"|"$/g, ""),
    }));
  };

  const copyLink = (type) => {
    if (inputDetails.videoPath !== null && inputDetails.videoPath.length) {
      if (type === "mkdir") {
        const extractedFileName = mkdirGetFolderName(inputDetails.videoPath);
        setShowUrl(extractedFileName);

        navigator.clipboard
          .writeText(extractedFileName)
          .then(() => {
            setFolderName("blue");
          })
          .catch((error) => console.log("Error copying text: ", error));
      }

      if (type === "cd") {
        const extractedFileName = cdGetFolderName(inputDetails.videoPath);
        setShowUrl(extractedFileName);

        navigator.clipboard
          .writeText(extractedFileName)
          .then(() => {
            setChangeFolderName("blue");
          })
          .catch((error) => console.log("Error copying text: ", error));
      }

      if (type === "240p") {
        const extractedFileName = generateGetCommand(inputDetails.videoPath);
        setShowUrl(extractedFileName);

        navigator.clipboard
          .writeText(extractedFileName)
          .then(() => {
            setGetCommand("blue");
          })
          .catch((error) => console.log("Error copying text: ", error));
      }
      if (type === "360p") {
        const extractedFileName = getVideoName(inputDetails.videoPath);

        const combinedCommand = `ffmpeg -i "${extractedFileName}" -vf "scale=426:240" -c:v libx264 -profile:v main -level 3.0 -preset veryfast -crf 23 -x264-params keyint=48:min-keyint=48:scenecut=0 -c:a aac -b:a 128k -hls_time 4 -hls_playlist_type vod -hls_segment_filename "240p_%03d.ts" 240p.m3u8 && ffmpeg -i "${extractedFileName}" -vf "scale=640:360" -c:v libx264 -profile:v main -level 3.0 -preset veryfast -crf 23 -x264-params keyint=48:min-keyint=48:scenecut=0 -c:a aac -b:a 128k -hls_time 4 -hls_playlist_type vod -hls_segment_filename "360p_%03d.ts" 360p.m3u8 && ffmpeg -i "${extractedFileName}" -vf "scale=1280:720" -c:v libx264 -profile:v main -level 3.0 -preset veryfast -crf 23 -x264-params keyint=48:min-keyint=48:scenecut=0 -c:a aac -b:a 128k -hls_time 4 -hls_playlist_type vod -hls_segment_filename "720p_%03d.ts" 720p.m3u8 && ffmpeg -i "${extractedFileName}" -vf "scale=1024:-1" -c:v libx264 -profile:v main -level 3.0 -preset veryfast -crf 23 -x264-params keyint=48:min-keyint=48:scenecut=0 -c:a aac -b:a 128k -hls_time 4 -hls_playlist_type vod -hls_segment_filename "1024p_%03d.ts" 1024p.m3u8`;

        setShowUrl(combinedCommand);

        navigator.clipboard
          .writeText(combinedCommand)
          .then(() => {
            setConversionCommand("blue");
          })
          .catch((error) => console.log("Error copying text: ", error));
      }
    } else {
      window.alert("No Path ");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4  h-screen w-screen bg-[#eaeaea]">
      <div className="p-4 border-2 border-black w-1/2">
        <div className="flex flex-col gap-2 my-2">
          <input
            name="videoPath"
            className="border-[1px] border-black rounded-xl p-2"
            type="text"
            placeholder="Enter The Video Path"
            value={inputDetails.videoPath}
            onChange={handleInputs}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div
            style={{ backgroundColor: folderName }}
            className="text-white flex justify-between items-center border-[1px] border-black p-2 rounded-xl"
          >
            <p className="text-[.9rem] font-semibold" id="240pCommandText">
              Make Folder Command
            </p>
            <button
              onClick={() => copyLink("mkdir")}
              className="bg-blue-600 p-1 px-2 text-[.8rem] font-bold text-white rounded-xl"
            >
              Copy
            </button>
          </div>
          <div
            style={{ backgroundColor: changeFolderName }}
            className="text-white flex justify-between items-center border-[1px] border-black p-2 rounded-xl"
          >
            <p className="text-[.9rem] font-semibold" id="240pCommandText">
              Change Dir Command
            </p>
            <button
              onClick={() => copyLink("cd")}
              className="bg-blue-600 p-1 px-2 text-[.8rem] font-bold text-white rounded-xl"
            >
              Copy
            </button>
          </div>
          <div
            style={{ backgroundColor: GetCommand }}
            className="text-white flex justify-between items-center border-[1px] border-black p-2 rounded-xl"
          >
            <p className="text-[.9rem] font-semibold" id="240pCommandText">
              Get Command
            </p>
            <button
              onClick={() => copyLink("240p")}
              className="bg-blue-600 p-1 px-2 text-[.8rem] font-bold text-white rounded-xl"
            >
              Copy
            </button>
          </div>
          <div
            style={{ backgroundColor: ConversionCommand }}
            className="text-white flex justify-between items-center border-[1px] border-black p-2 rounded-xl"
          >
            <p className="text-[.9rem] font-semibold" id="360pCommandText">
              Conversion Command
            </p>
            <button
              onClick={() => copyLink("360p")}
              className="bg-blue-600 p-1 px-2 text-[.8rem] font-bold text-white rounded-xl"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <input
        type="text"
        className="w-[80%] border-2 border-black p-2"
        value={showUrl}
        readOnly
      />
    </div>
  );
}

export default App;
