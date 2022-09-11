import React, { useEffect, useState } from "react";
import { GlobalButton, GlobalDashButton } from "../../components/styles/Global";
import {
  DashSearchContainerEdit,
  DashTitleButton,
  ProfileButtonContainer,
  ProfileCoverContainer,
  ProfileCoverImg,
  ProfileDataContainer,
  ProfileDataInputContainer,
  ProfileDataTitle,
  ProfileDivLeft,
  ProfileIcconAdd,
  ProfileIcconRemove,
  ProfileIfoContainer,
  ProfileImgUser,
  ProfileImgUserDefault,
  ProfileInfoSub,
  ProfileInput,
  ProfileInputSelect,
  ProfileName,
  ProfileSchoolCourse,
  ProfileSchoolImg,
  ProfileSchoolTitle,
  ProfileType,
} from "../../components/styles/Profile";
import cover from "../../assets/cover.svg";
import { colors } from "../../utils/colors";
import { ClipLoader } from "react-spinners";
import { DashSearchContainer } from "../../components/styles/Dashboard";
import PhoneInput from "react-phone-input-2";
import AnimateHeight from "react-animate-height";
import { useAuth } from "../../context/AuthProvider";
import { TbEdit, TbSchool } from "react-icons/tb";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoMdReverseCamera } from "react-icons/io";
import PopupView from "../../components/General/PopupPendingView";
import ProfileChange from "../../components/EditProfile/ProfileChange";
import PersonalSection from "../../components/Edit/PersonalSection";
import ContactSection from "../../components/Edit/ContactSection";
import CareerSection from "../../components/Edit/CareerSection";
import EducationSection from "../../components/Edit/EducationSection";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import ProfileCrop from "../../components/Edit/ProfileCrop";

const EditProfile = () => {
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [payView, setPayView] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { user, navigate } = useAuth();
  const { firstname, lastname, profilepicture, title, typeofuser } = user;
  const [profileUrl, setProfileUrl] = useState(profilepicture);
  const [set, setSet] = useState(null);
  const { changeProfile } = useExternalAPI();

  useEffect(() => {
    console.log("File: ", selectedFile);
    if (selectedFile !== null) setPayView(true);
  }, [selectedFile]);

  useEffect(() => {
    // blobToBase64(profileUrl);
    start();
  }, [profileUrl]);

  const start = async () => {
    const base = await blobToBase64(profileUrl);
    changeProfile({
      profilepicture: base,
    });
  };

  const blobToBase64 = (url) => {
    return new Promise(async (resolve, _) => {
      // do a request to the blob uri
      const response = await fetch(url);

      // response has a method called .blob() to get the blob file
      const blob = await response.blob();

      // instantiate a file reader
      const fileReader = new FileReader();

      // read the file
      fileReader.readAsDataURL(blob);

      fileReader.onloadend = function () {
        resolve(fileReader.result); // Here is the base64 string
      };
    });
  };

  // const profileLog = async (data) => {
  //   console.log(await convertBlobToBase64(data));
  // };

  // const convertBlobToBase64 = async (blob) => {
  //   // blob data
  //   return await blobToBase64(blob);
  // };

  // const blobToBase64 = (blob) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(blob);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });

  // const blobToBase64 = async (blob) => {
  //   try {
  //     var file = await new File([blob], lastname + firstname + ".jpg", {
  //       type: "image/plain",
  //     });
  //     // console.log("File: ", file);

  //     var reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = async () => {
  //       var base64data = reader.result;
  //       changeProfile({
  //         profilepicture: base64data,
  //       });
  //     };
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const onChange = (file) => {
    console.log("File data: ", file);
    if (!file) {
      setSelectedFile(null);
      return;
    }

    fileToDataUri(file).then((dataUri) => {
      // console.log("File blob: ", dataUri);
      setSelectedFile(dataUri);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <ProfileDivLeft>
        <button
          onClick={() => navigate(-1)}
          style={{
            fontSize: 12,
            color: colors.primary,
            background: "none",
            border: "none",
            cursor: "pointer",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
          }}
          type="button"
        >
          <MdOutlineKeyboardBackspace
            size={15}
            color={colors.primary}
            style={{ marginRight: 5 }}
          />{" "}
          back
        </button>
        <ProfileCoverContainer style={{ width: "100%" }}>
          <ProfileCoverImg src={require("../../assets/coverimg.jpeg")} />
          {/* <div
            style={{
              position: "absolute",
              top: 0,
              backgroundColor: "rgba(256,256,256,0.5)",
              display: "flex",
              right: 0,
              justifyContent: "center",
              padding: 5,
              borderRadius: "0 0 0 10px",
              cursor: "pointer",
              alignItems: "center",
            }}
          >
            change cover photo{" "}
            <IoMdReverseCamera
              size={30}
              color={colors.primary}
              style={{ marginLeft: 5 }}
            />
          </div> */}
          <ProfileIfoContainer>
            <div
              style={{
                position: "relative",
                width: "max-content",
              }}
            >
              {profileUrl === null || profileUrl === undefined ? (
                <ProfileImgUserDefault color="grey" />
              ) : (
                <ProfileImgUser src={profileUrl} />
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: "rgba(256,256,256,0.5)",
                  display: "flex",
                  left: 0,
                  right: 0,
                  justifyContent: "center",
                  padding: 5,
                  height: "40%",
                  cursor: "pointer",
                }}
                onClick={() => setPayView(true)}
              >
                <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  multiple={false}
                  // onChange={(e) => setSelectedFile(e)}
                  onChange={(event) => onChange(event.target.files[0] || null)}
                />
                <label for="file-input">
                  <IoMdReverseCamera size={25} />
                </label>
              </div>
            </div>
            <ProfileInfoSub>
              <ProfileName>
                {title + " " + lastname + " " + firstname}
              </ProfileName>
              <ProfileType>{typeofuser}</ProfileType>
            </ProfileInfoSub>
            {edit ? (
              <GlobalDashButton
                background={colors.primary}
                color="white"
                style={{ marginRight: 10, alignItems: "center" }}
                border={colors.primary}
                onClick={() => setEdit(false)}
              >
                {loading ? (
                  <>
                    <ClipLoader color={"white"} loading={loading} size={15} />
                    <span style={{ width: 5 }} />
                    saving changes
                  </>
                ) : (
                  "Save"
                )}
              </GlobalDashButton>
            ) : null}
          </ProfileIfoContainer>
        </ProfileCoverContainer>
        <PersonalSection />
        <ContactSection />
        <CareerSection />
        <EducationSection />
        <PopupView payView={payView} setPayView={setPayView}>
          {/* <ProfileChange
            file={selectedFile}
            setPayView={setPayView}
            setProfileUrl={setProfileUrl}
          /> */}
          <h5 style={{ margin: "10px 0", fontSize: 15 }}>
            Select crop section
          </h5>
          <ProfileCrop
            file={selectedFile}
            setProfileUrl={setProfileUrl}
            set={set}
            setPayView={setPayView}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
            }}
          >
            <GlobalButton
              background="green"
              color="white"
              onClick={() => setSet(Date.now())}
            >
              save image
            </GlobalButton>
          </div>
        </PopupView>
      </ProfileDivLeft>
    </div>
  );
};

export default EditProfile;
