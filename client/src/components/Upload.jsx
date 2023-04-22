import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useRouter } from "next/router";

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [audio, setAudio] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [audioPerc, setAudioPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const router = useRouter();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setAudioPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    audio && uploadFile(audio, "audioUrl");
  }, [audio]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post(process.env.API + "/audios", {
      ...inputs,
      tags,
    });
    setOpen(false);
    if (res.status === 200) {
      console.log("uploaded successfully");
      router.push("/");
    } else {
      console.log(res.status);
    }
  };

  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 bg-[#000000a7] flex justify-center items-center">
        <div className="w-[600px] h-[600px] bg-slate-200 p-5 flex flex-col gap-5 relative ">
          <div
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            X
          </div>
          <h1 className="text-center">Upload a New Song</h1>
          <label className="text-sm">Song:</label>
          {audioPerc > 0 ? (
            `Uploading: ${audioPerc}%`
          ) : (
            <input
              className="border-[1px] border-solid border-gray-400 rounded-sm p-3"
              type="file"
              accept="audio/*"
              onChange={(e) => setAudio(e.target.files[0])}
            />
          )}
          <input
            className="border-[1px] border-solid border-gray-400 rounded-sm p-3"
            type="text"
            placeholder="Title"
            onChange={handleChange}
          />
          <textarea
            className="border-[1px] border-solid border-gray-400 rounded-sm p-3"
            placeholder="Description"
            rows={8}
            onChange={handleChange}
          ></textarea>
          <input
            className="border-[1px] border-solid border-gray-400 rounded-sm p-3"
            type="text"
            placeholder="separate tags and genre with comma"
            onChange={handleTags}
          />
          <label className="text-sm">Cover Art:</label>
          {imgPerc > 0 ? (
            `Uploading: ${imgPerc}%`
          ) : (
            <input
              className="border-[1px] border-solid border-gray-400 rounded-sm p-3"
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          )}
          <button
            className="rounded-sm border-none py-3 px-5 font-bold cursor-pointer bg-yellow-500 text-white"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default Upload;
