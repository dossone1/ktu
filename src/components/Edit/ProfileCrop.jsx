import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import Cropper from "react-easy-crop";
import { GlobalButton } from "../styles/Global";
import getCroppedImg from "./cropImage";

const ProfileCrop = ({ file, setProfileUrl, set, setPayView }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    if (set !== null) {
      showCroppedImage();
    }
  }, [set]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        file,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
    //   setCroppedImage(croppedImage);
      setProfileUrl(croppedImage);
      setPayView(false)
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minWidth: 350,
        height: 350,
        background: "#333",
      }}
    >
      <Cropper
        image={file}
        crop={crop}
        rotation={rotation}
        zoom={zoom}
        aspect={1 / 1}
        onCropChange={setCrop}
        onRotationChange={setRotation}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
  );
};

export default ProfileCrop;
