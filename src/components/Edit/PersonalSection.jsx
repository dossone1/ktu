import React, { useState } from "react";
import { useEffect } from "react";
import { TbEdit } from "react-icons/tb";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../../context/AuthProvider";
import { useLocalStorage } from "../../context/useLocalStorage";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import { colors } from "../../utils/colors";
import {
  ProfileButtonContainer,
  ProfileDataContainer,
  ProfileDataInputContainer,
  ProfileDataTitle,
  ProfileInput,
  ProfileInputSelect,
} from "../styles/Profile";

const PersonalSection = () => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, navigate } = useAuth();
  const { chaneProfileData } = useExternalAPI();
  const [userdata, setUser] = useLocalStorage("user", null);
  const [dob, setDOB] = useState("");

  const {
    firstname,
    lastname,
    title,
    gender,
    typeofuser,
    otherlawyerdata,
    otherstudentdata,
  } = user;

  useEffect(() => {
    try {
      let dob =
        JSON.parse(otherlawyerdata).dob ||
        JSON.parse(otherstudentdata).dob ||
        "";
      console.log("DOB: ", dob);
      setDOB(dob);
    } catch (e) {}
  }, []);

  const request = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      ...user,
      title: e.target[0].value,
      firstname: e.target[1].value,
      lastname: e.target[3].value,
      gender: e.target[4].value,
      otherstudentdata: JSON.stringify(
        typeofuser === "LAWYER" ? {} : { dob: e.target[5].value }
      ),
      otherlawyerdata: JSON.stringify(
        typeofuser === "STUDENT" ? {} : { dob: e.target[5].value }
      ),
    };

    // console.log(userData)
    await chaneProfileData(userData).then((res) => {
      if (res.success) setUser(userData);
    });

    setEdit(false);
    setLoading(false);
  };

  return (
    <ProfileDataContainer>
      <ProfileDataTitle
        style={{
          display: "flex",
          paddingRight: 5,
          alignItems: "center",
          height: "max-content",
        }}
      >
        Basic Information <div style={{ flex: 1 }} />
        {loading ? (
          <ClipLoader color={colors.primary} loading={loading} size={20} />
        ) : edit ? null : (
          <ProfileButtonContainer onClick={() => setEdit(true)}>
            <TbEdit size={25} />
          </ProfileButtonContainer>
        )}
      </ProfileDataTitle>
      <ProfileDataInputContainer>
        <form
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
          onSubmit={(e) => request(e)}
        >
          Title
          <ProfileInputSelect
            placeholder="Enter title"
            disabled={!edit}
            defaultValue={title}
            // value={}
            // onChange={(e) => setUserEmail(e.target.value)}
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Miss</option>
            <option>Dr.</option>
            <option>Prof.</option>
            <option>Alhaji</option>
            <option>Ing</option>
          </ProfileInputSelect>
          First name
          <ProfileInput
            defaultValue={firstname}
            placeholder="Enter first name"
            readOnly={!edit}
            // onChange={(e) => setUserEmail(e.target.value)}
          />
          Other names
          <ProfileInput
            defaultValue={""}
            placeholder="Enter other names"
            readOnly={!edit}
            // onChange={(e) => setUserEmail(e.target.value)}
          />
          Last name
          <ProfileInput
            defaultValue={lastname}
            placeholder="Enter last name"
            readOnly={!edit}
            // onChange={(e) => setUserEmail(e.target.value)}
          />
          Sex
          <ProfileInputSelect
            placeholder="Enter gender"
            disabled={!edit}
            defaultValue={gender}
            // onChange={(e) => setUserEmail(e.target.value)}
          >
            <option value="Male">Male</option>
            <option>Female</option>
          </ProfileInputSelect>
          Date of birth
          <ProfileInput
            placeholder="Enter date of birth"
            // value={""}
            // onChange={(val) => console.log("Date: ", val.target.value)}
            readOnly={!edit}
            value={dob}
            type={"date"}
            onChange={(e) => setDOB(e.target.value)}
          />
          {edit ? (
            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => setEdit(false)}
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
                // onClick={() => setEdit(false)}
                style={{
                  fontSize: 14,
                  color: "#5CA275",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  marginLeft: 20,
                }}
                type="submit"
              >
                save
              </button>
            </div>
          ) : null}
        </form>
      </ProfileDataInputContainer>
    </ProfileDataContainer>
  );
};

export default PersonalSection;
