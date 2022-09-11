import React, { useState } from "react";
import { GlobalDashButton } from "../../components/styles/Global";
import {
  ProfileCoverContainer,
  ProfileCoverImg,
  ProfileDivLeft,
  ProfileIfoContainer,
  ProfileImgUser,
  ProfileImgUserDefault,
  ProfileInfoSub,
  ProfileName,
  ProfileSchoolCourse,
  ProfileSchoolTitleHome,
  ProfileSectionCard,
  ProfileType,
} from "../../components/styles/Profile";
import { useAuth } from "../../context/AuthProvider";
import { TbSchool } from "react-icons/tb";
import {
  DashSearchContainer,
  IconDashNotification,
  IconDashReceipt,
  IconDashTour,
} from "../../components/styles/Dashboard";
import { HiLocationMarker } from "react-icons/hi";
import { colors } from "../../utils/colors";
import { FaUserCircle } from "react-icons/fa";
import { IoNotificationsCircleSharp } from "react-icons/io5";

const Profile = () => {
  const { navigate } = useAuth();
  const { user } = useAuth();
  const {
    emailaddress,
    firstname,
    lastname,
    profilepicture,
    fullchamber,
    title,
    typeofuser,
    fullschoolname,
    fullregionname,
    schoollogo
  } = user;

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <ProfileDivLeft>
      <ProfileSectionCard style={{ padding: 0, marginTop: 20 }}>
            <ProfileCoverContainer style={{ width: "100%", margin: 0 }}>
              <ProfileCoverImg src={require("../../assets/coverimg.jpeg")} />
              <ProfileIfoContainer>
                {profilepicture === null ? (
                  <ProfileImgUserDefault color="grey" />
                ) : (
                  <ProfileImgUser src={profilepicture} />
                )}
                {/* <ProfileImgUserDefault color="grey" /> */}
                <ProfileInfoSub>
                  <ProfileName>
                    {title + " " + lastname + " " + firstname}
                  </ProfileName>
                  <ProfileType>Administrator</ProfileType>
                </ProfileInfoSub>
                <GlobalDashButton
                  background={"white"}
                  color="black"
                  border="#CDCDCD"
                  style={{ alignSelf: "flex-end" }}
                  onClick={() => navigate("/dashboard/editprofile")}
                >
                  Edit
                </GlobalDashButton>
                {/* <ProfileIconEdit
              title="Edit profile"
              onClick={() => navigate("/dashboard/editprofile")}
            /> */}
              </ProfileIfoContainer>
            </ProfileCoverContainer>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: 15,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  margin: 10,
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <div style={{ marginRight: 10 }}>
                  {schoollogo?.imageurl ? (
                    <img
                      alt="logo"
                      src={schoollogo?.imageurl}
                      width={35}
                      height={35}
                    />
                  ) : (
                    <TbSchool size={25} color="grey" />
                  )}
                </div>
                {fullschoolname === "" ? (
                  <a
                    style={{
                      color: colors.primary,
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: "bold",
                      borderBottom: "1px solid " + colors.primary,
                    }}
                    onClick={() => navigate("/dashboard/editprofile")}
                  >
                    Kumasi Technical University
                  </a>
                ) : (
                  <div>
                    <ProfileSchoolTitleHome>
                      {fullschoolname}
                    </ProfileSchoolTitleHome>
                    {/* <ProfileSchoolCourse style={{ color: "gray" }}>
                    Bsc Hons Software Engineering, Computer Science
                  </ProfileSchoolCourse> */}
                  </div>
                )}
              </div>
              <ProfileSchoolCourse
                style={{
                  display: "flex",
                  paddingRight: 20,
                  alignItems: "center",
                }}
              >
                <HiLocationMarker
                  size={20}
                  color="grey"
                  style={{ marginRight: 5 }}
                />

                <span style={{ fontSize: 14 }}>
                  {fullchamber.name !== "" ? (
                    fullchamber.name + ", " + fullchamber.location
                  ) : fullregionname === "" ? (
                    <a
                      style={{
                        color: colors.primary,
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: "bold",
                        borderBottom: "1px solid " + colors.primary,
                      }}
                      onClick={() => navigate("/dashboard/editprofile")}
                    >
                      Add region
                    </a>
                  ) : (
                    fullregionname
                  )}
                </span>
              </ProfileSchoolCourse>
            </div>
            <div
              style={{
                display: "flex",
                padding: 15,
                flexWrap: "wrap",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  padding: 10,
                  backgroundColor: "#E8E4E0",
                  borderRadius: 10,
                  width: 250,
                  marginRight: 10,
                  height: "max-content",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h5>Help center</h5>
                  <IconDashTour />
                </div>
                <p style={{ fontSize: 12, marginTop: 10, marginBottom: 5 }}>
                  Tour, FAQ, Contact support
                </p>
                <a
                  style={{
                    color: colors.primary,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                >
                  See all details
                </a>
              </div>
              <div
                style={{
                  padding: 10,
                  border: "1px solid #E8E4E0",
                  borderRadius: 10,
                  width: 250,
                  marginTop: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h5>Internships</h5>
                  <IconDashReceipt />
                </div>
                <p style={{ fontSize: 12, marginTop: 10, marginBottom: 5 }}>
                  Assignments,Reports,Feedback etc.
                </p>
                <a
                  style={{
                    color: colors.primary,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                >
                  View all
                </a>
              </div>
            </div>
          </ProfileSectionCard>
      </ProfileDivLeft>
    </div>
  );
};

export default Profile;
