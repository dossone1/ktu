import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import {
  AccessAppName,
  AccessButtonType,
  AccessContainer,
  AccessForm,
  AccessFormContainer,
  AccessInfo,
  AccessIntroIcon,
  AccessNav,
  FormInput,
} from "../components/styles/Access";
import { GlobalButton } from "../components/styles/Global";
import { colors } from "../utils/colors";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useAuth } from "../context/AuthProvider";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { DashSearchContainer } from "../components/styles/Dashboard";
import {
  LandingSelector,
  LandingSelectorPhone,
} from "../components/styles/Landing";
import { useExternalAPI } from "../hooks/useExternalAPI";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const form = useRef();
  const { login, navigate } = useAuth();
  const [email, setEmail] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [pending, setPending] = useState(false);
  const { loginUser } = useExternalAPI();

  const getIP = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    const meta = navigator.userAgent;
    console.log("ip: ", res);
    return {
      ipaddress: res.data?.IPv4,
      useragent: meta,
    };
  };

  const access = async (e) => {
    e.preventDefault();
    if (loading) return;
    // console.log("Data: ", e);
    setError("");
    if (!email && phone.length && (phone.length < 12 || phone.length > 13)) {
      console.log(phone.length, phone);
      setError("Phone must be 9 or 10 digits.");
      return;
    }

    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   // login({ email: !email ? phone : userEmail });
    // }, 2000);
    const meta = await getIP()
      .then(async (meta) => {
        // console.log(meta)
        const loginData = {
          emailaddress: !email ? e.target[3].value : e.target[2].value,
          password: e.target[4].value,
          meta,
        };
        const request = await loginUser(loginData);
      
      if (request?.success === true) {
        console.log("Doss "+request);
          if (!request.data.userpaymentdata.madeallpayment) {
            const expire = new Date(new Date().getTime() + 10 * 60 * 1000);
            console.log("Data: ", request.data?.userpaymentdata);
            Cookies.set(
              "temporaryuser",
              JSON.stringify(
                {
                  ...request.data?.userpaymentdata,
                  emailaddress: request.data?.emailaddress,
                },
                {
                  expires: 1,
                }
              )
            );
            navigate("/dashboard");
          } else if (!request.data.userapproved) {
            setPending(true);
          } else {
            login(request.data);
          }
        } else {
          console.log("Request: ", request);
          setError(request?.message || "An error occured!");
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError("An error occured, try again later.");
        setLoading(false);
        return;
      });
  };

  return (
    <AccessContainer>
      <AccessNav>
        <AccessIntroIcon
          src={require("../assets/logo-circular.png")}
          alt="icon"
          title="Home"
          onClick={() => navigate("/")}
        />
        <AccessAppName>Kumasi Technical University</AccessAppName>
        <div style={{ flex: 1 }} />
        <Link to="/join" style={{ textDecoration: "none" }}>
          <GlobalButton
            style={{ width: "100%" }}
            background={colors.primary}
            color="white"
            border={colors.primary}
          >
            Join
          </GlobalButton>
        </Link>
      </AccessNav>
      <AccessInfo style={{ marginTop: 15 }}>
        Login to KSTU Internship Portal
      </AccessInfo>
      <AccessFormContainer>
        <AccessForm
          key={0}
          onSubmit={(e) => (!loading ? access(e) : null)}
          ref={form}
        >
          <div style={{ display: "flex", marginBottom: 20 }}>
            <AccessButtonType
              color={"black"}
              onClick={() => setEmail(true)}
              active={email}
              type="button"
            >
              Login with Email
            </AccessButtonType>
            <AccessButtonType
              color={"black"}
              onClick={() => setEmail(false)}
              active={!email}
              type="button"
            >
              Login with Phone number
            </AccessButtonType>
          </div>
          {/* <ViewSlider
            renderView={renderView}
            numViews={3}
            activeView={step}
            animateHeight
            style={{ overflowY: "visible", width: "100%" }}
          /> */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 100,
              overflowY: "visible",
              transition: "transition: all 0.5s ease-in-out",
            }}
          >
            <LandingSelector transition={!email}>
              <>
                Your email *
                <FormInput
                  type="email"
                  required={email}
                  placeholder="example@gmail.com"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </>
            </LandingSelector>
            <LandingSelectorPhone transition={email}>
              <>
                Your phone *
                <DashSearchContainer
                  style={{
                    marginTop: 10,
                    marginBottom: 15,
                    padding: 0,
                    border: "0.5px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <PhoneInput
                    country={"gh"}
                    value={phone}
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
                      required: !email,
                      autoFocus: false,
                    }}
                    specialLabel=""
                  />
                </DashSearchContainer>
              </>
            </LandingSelectorPhone>
          </div>
          Password *
          <FormInput
            type="password"
            required
            hidden={false}
            placeholder="**********"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 5,
              marginBottom: 30,
              flexWrap: "wrap",
            }}
          >
            <p style={{ fontSize: 12, color: "red", marginTop: 5 }}>{error}</p>
            <button
              onClick={() => navigate("/resetpassword")}
              style={{
                fontSize: 11,
                color: colors.primary,
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              type="button"
            >
              Forgot Password?
            </button>
            {pending ? (
              <p
                style={{
                  color: "black",
                  marginBottom: 25,
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  borderRadius: 5,
                  padding: "5px 7px",
                  marginTop: 10,
                }}
              >
                Your account is awaiting approval; for assistance, please get in
                touch with administration at{" "}
                <a href={"tel:+233342296928"}>+233342296928</a>
              </p>
            ) : null}
          </div>
          <GlobalButton
            background={colors.primary}
            color="white"
            border={colors.primary}
            style={{ marginTop: 25 }}
            //   onClick={() => setOn((on) => (on++ === 3 ? 1 : on++))}
            type="submit"
          >
            {loading ? (
              <span style={{ padding: 10, marginTop: -10, marginBottom: 7 }}>
                <PropagateLoader color={"white"} loading={loading} size={15} />
              </span>
            ) : (
              <>
                Sign in{" "}
                <HiArrowNarrowRight
                  size={15}
                  color="white"
                  style={{ marginLeft: 10 }}
                />
              </>
            )}
          </GlobalButton>
        </AccessForm>
      </AccessFormContainer>
      <p style={{ textAlign: "center", fontSize: 10, color: "gray" }}>
       Kumasi Technical University © {new Date().getFullYear()} All rights reserved.
      </p>
      <p style={{ textAlign: "center", fontSize: 10, color: "gray" }}>
        v.1.0.0
      </p>
    </AccessContainer>
  );
};

export default Login;
