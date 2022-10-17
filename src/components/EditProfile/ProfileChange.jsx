import React, { useState } from "react";
import { colors } from "../../utils/colors";
import { AccessInfo } from "../styles/Access";
import { GlobalButton } from "../styles/Global";
import { CropHandler } from "./CropHandler";

const ProfileChange = ({ file, setProfileUrl, setPayView  }) => {
  const [completedCrop, setCompletedCrop] = useState();

  const setCrop = () => {
    setPayView(false)
    setProfileUrl(completedCrop);
  };

  return (
    <div>
      <p style={{ marginBottom: 10 }}>Select crop view</p>
      <CropHandler
        selectedFile={file}
        setCompletedCrop={setCompletedCrop}
        setCropImg={setCrop}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <GlobalButton background="green" color="white" onClick={()=> setCrop()}>
          save image
        </GlobalButton>
      </div>
    </div>
  );
};

export default ProfileChange;
