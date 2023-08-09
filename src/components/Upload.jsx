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
import { RiCloseLine } from "react-icons/ri";

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [audio, setAudio] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [audioPerc, setAudioPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [validate, setValidate] = useState(false);

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

  useEffect(() => {
    if (imgPerc == 100 && audioPerc == 100) {
      setValidate(true);
    }
  }, [imgPerc]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${process.env.API}/audios`,
      {
        ...inputs,
        tags,
      },
      { withCredentials: true }
    );
    setOpen(false);
    if (res.status === 200) {
      console.log("uploaded successfully");
      window.alert("Uploaded successfully");
      router.push("/");
    } else {
      console.log(res.status);
    }
  };

  return (
    <>
      <div className="absolute w-full h-full top-0 left-0 bg-black/80 z-50 ">
        <div className="w-full max-w-4xl py-20 px-10">
          <div className="bg-slate-200 p-5 flex flex-col gap-5 relative rounded-md">
            <div
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <RiCloseLine className="w-8 h-8 text-black2 hover:text-red-600" />
            </div>
            <h1 className="text-center font-medium text-xl uppercase text-gray-700">
              Upload Song
            </h1>
            <form onSubmit={handleUpload}>
              <div>
                <h3 className="mb-2">Song *</h3>
                {audioPerc > 0 ? (
                  `Uploading: ${audioPerc}%`
                ) : (
                  <input
                    className="shadow-inner border border-gray-400 rounded-sm p-2 bg-white w-full text-gray-600"
                    type="file"
                    accept="audio/*"
                    required
                    onChange={(e) => setAudio(e.target.files[0])}
                  />
                )}
              </div>
              <div>
                <h3 className="mb-2">Title *</h3>
                <input
                  className="shadow-inner border border-gray-400 rounded-sm p-2 bg-white w-full text-gray-600 placeholder:text-gray-500"
                  name="title"
                  type="text"
                  placeholder="Title"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="mb-2">Video Link *</h3>
                <input
                  className="shadow-inner border border-gray-400 rounded-sm p-2 bg-white w-full text-gray-600 placeholder:text-gray-500"
                  name="videoUrl"
                  type="text"
                  placeholder="Youtube link eg: https://www.youtube.com/watch?v=uRBrrdaK4dQ"
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="mb-2">Short description *</h3>
                <textarea
                  className="shadow-inner border border-gray-400 rounded-sm p-2 bg-white w-full text-gray-600 placeholder:text-gray-500"
                  name="desc"
                  placeholder="Eg: K Praise ft Chris Morgan in this powerful worship song"
                  rows={4}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <h3 className="mb-2">Tags *</h3>
                <input
                  className="shadow-inner border border-gray-400 rounded-sm p-2 bg-white w-full text-gray-600 placeholder:text-gray-500"
                  type="text"
                  placeholder="Separate with comma Eg: praise,rock,chris,morgan,liberia"
                  required
                  onChange={handleTags}
                />
              </div>
              <div>
                <h3 className="mb-2">Cover Art *</h3>
                {imgPerc > 0 ? (
                  `Uploading: ${imgPerc}%`
                ) : (
                  <input
                    className="shadow-inner border border-gray-400 rounded-sm p-2 bg-white w-full text-gray-600 placeholder:text-gray-500"
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                )}
              </div>
              <div className="md:flex md:justify-center">
                <button
                  type="submit"
                  className="mt-3 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 border border-yellow-700-700 rounded-2xl w-1/3 border-none cursor-pointer disabled:brightness-50 disabled:cursor-not-allowed"
                  disabled={!validate}
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
