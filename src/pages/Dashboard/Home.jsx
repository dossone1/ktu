import React, { useEffect } from "react";
import {
  IconDashReceipt,
  IconDashTour,
  DashSearchContainer,
} from "../../components/styles/Dashboard";
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
import { TbSchool } from "react-icons/tb";
import { HiLocationMarker } from "react-icons/hi";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { useAuth } from "../../context/AuthProvider";
import { colors } from "../../utils/colors";
import { GlobalDashButton } from "../../components/styles/Global";

const Home = () => {
  const { user, logout, navigate } = useAuth();
  const {
    emailaddress,
    school,
    firstname,
    lastname,
    profilepicture,
    title,
    typeofuser,
    fullschoolname,
    fullregionname,
    schoollogo,
    fullchamber,
  } = user;


  return (
    <>
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
                  <ProfileType>{typeofuser}</ProfileType>
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
                {
                  <div>
                    <ProfileSchoolTitleHome>
                      Kumasi Technical University
                    </ProfileSchoolTitleHome>
                    {/* <ProfileSchoolCourse style={{ color: "gray" }}>
                    Bsc Hons Software Engineering, Computer Science
                  </ProfileSchoolCourse> */}
                  </div>
                }
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
                  <h5>New Interns</h5>
                  <IconDashReceipt />
                </div>
                <p style={{ fontSize: 12, marginTop: 10, marginBottom: 5 }}>
                 Assignments,Progress Reports, etc.
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
          <DashSearchContainer
            style={{
              margin: "10px 0",
              padding: 10,
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid rgba(0, 0, 0, 0.09)",
              backgroundColor: "#f8f8fa",
              fontSize: 14,
            }}
          >
            Currently don't have any notifications
            <IoNotificationsCircleSharp color={colors.primary} size={30} />
          </DashSearchContainer>
        </ProfileDivLeft>
      </div>
    </>
  );
};

export default Home;
