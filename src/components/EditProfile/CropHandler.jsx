import React, { useEffect, useRef, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import { EditCropImage } from "../styles/Profile";
import { getCroppedImg } from "./getCroppedImage";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export const CropHandler = ({ selectedFile, setCompletedCrop, setCropImg }) => {
  const [crop, setCrop] = useState();
  const [imgSrc, setImgSrc] = useState("");
  const aspect = 1;
  const scale = 1;
  const rotate = 0;
  const imgRef = useRef(null);
  const [croppedImgUrl, setCroppedImgUrl] = useState(null);

  useEffect(() => {
    function onSelectFile(e) {
      if (e?.target) {
        if (e.target.files && e.target.files.length > 0) {
          setCrop(undefined); // Makes crop preview update between images.
          const reader = new FileReader();
          reader.addEventListener("load", () =>
            setImgSrc(reader.result.toString() || "")
          );
          reader.readAsDataURL(e.target.files[0]);
        }
      }
      //console.log("File: ", e)
    }
    if (selectedFile !== "") onSelectFile(selectedFile);
  }, [selectedFile]);

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  //   function toload(c) {
  //     imgRef = c;
  //   }

  const croppedSrc = async (c) => {
    try {
      const croppedImg = await getCroppedImg(imgRef.current, c, "newFile");
      console.log("Cropped img: ", croppedImg);
      setCroppedImgUrl(croppedImg);
      setCompletedCrop(croppedImg);
    } catch (e) {
      console.log("Crop error: ", e);
    }
  };

  return (
    <>
      <ReactCrop
        crop={crop}
        style={{
          backgroundColor: "purple",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(_, percentCrop) => setCrop(_)}
        onComplete={(c) => {
          // setCompletedCrop(c);
          // setCropImg(c, imgRef);
          croppedSrc(c);
        }}
        aspect={aspect}
      >
        {imgSrc === "" ? null : (
          <EditCropImage
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        )}
      </ReactCrop>
      {/* {croppedImgUrl !== null ? <img src={croppedImgUrl} /> : null} */}
    </>
  );
};
