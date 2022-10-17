import React, { useState } from "react";
import {
  DashTitleButton,
  ProfileDataContainer,
  ProfileDataTitle,
  ProfileIcconAdd,
  ProfileIcconRemove,
  ProfileInput,
  ProfileInputSelect,
  ProfileSchoolCourse,
  ProfileSchoolTitle,
} from "../../components/styles/Profile";
import { colors } from "../../utils/colors";
import AnimateHeight from "react-animate-height";
import { useAuth } from "../../context/AuthProvider";
import { TbSchool } from "react-icons/tb";

const EducationSection = () => {
  const [edit, setEdit] = useState(false);
  const { user, navigate } = useAuth();
  const [addEducation, setAddEducation] = useState(false);
  const {
    emailaddress,
    firstname,
    lastname,
    profilepicture,
    title,
    typeofuser,
    fullschoolname,
    fullregionname,
    phonenumber,
    schoollogo,
  } = user;

  return (
    <ProfileDataContainer style={{ border: "none" }}>
      <ProfileDataTitle
        style={{
          display: "flex",
          alignItems: "center",
          height: "max-content",
        }}
      >
        Education <div style={{ flex: 1 }} />{" "}
        {/* {addEducation ? (
          <ProfileIcconRemove onClick={() => setAddEducation(false)} />
        ) : (
          <ProfileIcconAdd onClick={() => setAddEducation(true)} />
        )} */}
      </ProfileDataTitle>
      <div
        style={{
          flex: 0.8,
          fontSize: 14,
          color: "grey",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AnimateHeight height={addEducation ? "auto" : 0}>
          <ProfileInput
            value={""}
            placeholder="University name"
            readOnly={false}
            // onChange={(e) => setUserEmail(e.target.value)}
          />
          <p>Level</p>
          <ProfileInputSelect
            placeholder="level"
            disabled={!edit}
            // onChange={(e) => setUserEmail(e.target.value)}
          >
            <option value="Diploma" selected>
              Diploma
            </option>
            <option>HND</option>
            <option>Bachelor's (BSc)</option>
            <option>Master's (MSc)</option>
            <option>Doctorate</option>
          </ProfileInputSelect>
          <p>Start date - End date</p>
          <DashTitleButton>
            <ProfileInput
              placeholder="Start date"
              type="date"
              value={""}
              style={{ flex: 0.48 }}
            />
            <ProfileInput
              placeholder="Present"
              readOnly={false}
              type="date"
              style={{ flex: 0.48 }}
            />
          </DashTitleButton>
          <span>
            <button
              onClick={() => setAddEducation(false)}
              style={{
                fontSize: 14,
                color: colors.primary,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                marginBottom: 20,
              }}
              type="button"
            >
              cancel
            </button>
            <button
              onClick={() => setAddEducation(false)}
              style={{
                fontSize: 14,
                color: "#5CA275",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                marginLeft: 20,
              }}
              type="button"
            >
              save
            </button>
          </span>
        </AnimateHeight>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 5 }}>
            {schoollogo.imageurl !== ""  || schoollogo.imageurl === null ? (
              <img
                alt="logo"
                src={schoollogo.imageurl}
                width={35}
                height={35}
              />
            ) : (
              <TbSchool size={25} color="grey" />
            )}
          </div>
          <div style={{ flex: 1, paddingLeft: "2%" }}>
            <ProfileSchoolTitle>{fullschoolname}</ProfileSchoolTitle>
            <ProfileSchoolCourse>{"course not added yet"}</ProfileSchoolCourse>
            <ProfileSchoolCourse>{"year not added yet"}</ProfileSchoolCourse>
            {/* <div style={{ display: "flex", marginTop: 10, marginBottom: 5 }}>
              <button
                onClick={() => console.log("Resend")}
                style={{
                  fontSize: 11,
                  color: colors.primary,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                type="button"
              >
                Edit
              </button>
              <button
                onClick={() => console.log("Resend")}
                style={{
                  fontSize: 11,
                  color: colors.primary,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  marginLeft: 10,
                }}
                type="button"
              >
                Delete
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </ProfileDataContainer>
  );
};

export default EducationSection;
