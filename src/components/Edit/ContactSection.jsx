import React, { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import PhoneInput from "react-phone-input-2";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../../context/AuthProvider";
import { useLocalStorage } from "../../context/useLocalStorage";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import { colors } from "../../utils/colors";
import {
  DashSearchContainerEdit,
  DashTitleButton,
  ProfileButtonContainer,
  ProfileDataContainer,
  ProfileDataInputContainer,
  ProfileDataTitle,
  ProfileInput,
  ProfileInputSelect,
} from "../styles/Profile";

const ContactSection = () => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [website, setWebsite] = useState("");
  const [link, setLink] = useState("");
  const [phone, setPhone] = useState("");
  const { user, navigate } = useAuth();
  const [userdata, setUser] = useLocalStorage("user", null);
  let {
    emailaddress,
    firstname,
    lastname,
    title,
    gender,
    typeofuser,
    phonenumber,
    fullareaofp,
    fullchamber,
    fullchapter,
    fullprovice,
    otherlawyerdata,
    otherstudentdata,
    yearofcall,
  } = user;

  useEffect(() => {
    try {
      setWebsite(
        JSON.parse(otherlawyerdata).website ||
          JSON.parse(otherstudentdata).website ||
          ""
      );
      setLink(
        JSON.parse(otherlawyerdata).linkedIn ||
          JSON.parse(otherstudentdata).linkedIn ||
          ""
      );
      console.log("Data url: "+website, JSON.parse(otherlawyerdata).linkedIn)
    } catch (e) {}
  }, []);

  const { chaneProfileData } = useExternalAPI();

  const request = async (e) => {
    e.preventDefault();
    setLoading(true);

    otherstudentdata = JSON.parse(otherstudentdata) || {};
    otherlawyerdata = JSON.parse(otherlawyerdata) || {};

    const userData = {
      ...user,
      phonenumber: phone,
      otherstudentdata: JSON.stringify(
        typeofuser === "LAWYER"
          ? {}
          : {
              ...otherstudentdata,
              website: e.target[2].value,
              linkedIn: e.target[3].value,
            }
      ),
      otherlawyerdata: JSON.stringify(
        typeofuser === "STUDENT"
          ? {}
          : {
              ...otherlawyerdata,
              website: e.target[2].value,
              linkedIn: e.target[3].value,
            }
      ),
    };
    // console.log(userData);
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
        Contacts <div style={{ flex: 1 }} />{" "}
        {loading ? (
          <ClipLoader color={colors.primary} loading={loading} size={20} />
        ) : edit ? null : (
          <ProfileButtonContainer onClick={() => setEdit(true)}>
            <TbEdit size={25} />
          </ProfileButtonContainer>
        )}
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
        <form
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
          onSubmit={(e) => request(e)}
        >
          Email
          <ProfileInput
            value={emailaddress}
            placeholder="Enter email"
            readOnly={true}
            // onChange={(e) => setUserEmail(e.target.value)}
          />
          <DashTitleButton>
            Phone{" "}
            {/* <button
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
            Add phone +
          </button> */}
          </DashTitleButton>
          {/* <ProfileInput
              
              placeholder="Enter phone"
              readOnly={!edit}
              // onChange={(e) => setUserEmail(e.target.value)}
            /> */}
          <DashSearchContainerEdit
            style={{
              marginTop: 10,
              marginBottom: 15,
              padding: 0,
              border: "0.5px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <PhoneInput
              country={"gh"}
              value={phonenumber}
              dropdownStyle={{ height: 150 }}
              inputStyle={{
                width: "100%",
                outline: "none",
                border: "none",
                outlineColor: colors.primary,
                boxShadow: `none`,
              }}
              containerStyle={{
                outlineColor: colors.primary,
              }}
              onChange={(phone) => setPhone(phone)}
              inputProps={{
                name: "phone",
                required: false,
                autoFocus: false,
              }}
              disabled={!edit}
              specialLabel=""
            />
          </DashSearchContainerEdit>
          Website
          <ProfileInput
            placeholder="Enter website url"
            readOnly={!edit}
            defaultValue={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          LinkedIn
          <ProfileInput
            placeholder="Enter linkedIn profile url"
            readOnly={!edit}
            defaultValue={link}
            onChange={(e) => setLink(e.target.value)}
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
      </div>
    </ProfileDataContainer>
  );
};

export default ContactSection;
