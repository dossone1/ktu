import React, { useState } from "react";
import { GlobalButton, LandingFooter } from "../components/styles/Global";
import {
  AppDesc,
  AppName,
  IntroIcon,
  LandingContainer,
  LandingDiv,
  LandingSelector,
  LandingWrapper,
} from "../components/styles/Landing";
import { colors } from "../utils/colors";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { Link } from "react-router-dom";

const Landing = () => {
  const [help, setHelp] = useState(false);

  return (
    <LandingContainer>
      <LandingWrapper>
        <LandingDiv
          background={colors.primary}
          flex={0.55}
          hide={true}
          style={{
            justifyContent: "center",
            backgroundColor: "#1B164E",
          }}
        >
          <img
            src={require("../assets/login-pic.jpeg")}
            style={{
              width: "80%",
              height: "auto",
              borderRadius: 10,
              marginBottom: 10,
            }}
            alt="Introduction"
          />
          <AppName style={{ textAlign: "center" }}>
           Industry Attachment Portal
          </AppName>
          <AppDesc>(Industry Portal)</AppDesc>
        </LandingDiv>
        <LandingDiv background={"white"} flex={0.45} hide={false}>
          <IntroIcon src={require("../assets/logo-circular.png")} alt="icon" />
          <AppDesc style={{ color: "black", marginTop: 20, marginBottom: 50 }}>
            {help ? "Contact us via:" : "Welcome to KSTU Attachment Portal"}
          </AppDesc>
          <div style={{ display: "flex", width: "100%" }}>
            <LandingSelector transition={help}>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <GlobalButton
                  style={{ width: "100%" }}
                  background="white"
                  color={colors.primary}
                  border={colors.accent}
                >
                  Login
                </GlobalButton>
              </Link>
              <Link to="/join" style={{ textDecoration: "none" }}>
                <GlobalButton
                  style={{ width: "100%", marginTop: 10 }}
                  background={colors.primary}
                  color="white"
                  border={colors.primary}
                >
                  Institution Signup
                </GlobalButton>
              </Link>
            </LandingSelector>
            <LandingSelector transition={!help}>
              <Link
                to="#"
                onClick={(e) => {
                  window.location.href = "mailto:info@kstu.edu.gh";
                  e.preventDefault();
                }}
                style={{ textDecoration: "none" }}
              >
                <GlobalButton
                  style={{ width: "100%" }}
                  background="white"
                  color={colors.primary}
                  border={colors.accent}
                >
                  <MdEmail
                    color={colors.primary}
                    style={{ marginRight: 5 }}
                    size={20}
                  />{" "}
                  {/* lawsocietyghana@gmail.com */}
                  info@kstu.edu.gh
                </GlobalButton>
              </Link>
              <Link
                to="#"
                target={"_blank"}
                onClick={(e) => {
                  window.location.href =
                    "https://www.google.com/maps/place/5%C2%B033'43.0%22N+0%C2%B010'35.2%22W/@5.561944,-0.1786344,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x4d1d2243f3510b92!8m2!3d5.561944!4d-0.1764457?hl=en";
                  e.preventDefault();
                }}
                style={{ textDecoration: "none" }}
              >
                <GlobalButton
                  style={{ width: "100%", marginTop: 10 }}
                  background="white"
                  color={colors.primary}
                  border={colors.accent}
                >
                  <MdLocationOn
                    color={colors.primary}
                    style={{ marginRight: 5 }}
                    size={20}
                  />{" "}
                  {/* lawsocietyghana@gmail.com */}
                  Locate us at HR6F+QCF Kumasi
                </GlobalButton>
              </Link>
              <Link
                to="#"
                onClick={(e) => {
                  window.location.href = "tel:+233342296928";
                  e.preventDefault();
                }}
                style={{ textDecoration: "none" }}
              >
                <GlobalButton
                  style={{ width: "100%", marginTop: 10 }}
                  background="white"
                  color={colors.primary}
                  border={colors.accent}
                >
                  <MdPhone
                    color={colors.primary}
                    style={{ marginRight: 5 }}
                    size={20}
                  />{" "}
                  +233(0)322 496 534
                </GlobalButton>
              </Link>
            </LandingSelector>
          </div>
          <div style={{ flex: 1 }} />
          <a href="https://kstu.edu.gh/" style={{ textDecoration: "none" }}>
            <GlobalButton
              style={{
                width: "100%",
                marginBottom: 10,
                textDecoration: "none",
              }}
              background={colors.primary}
              color="white"
              border={colors.primary}
            >
              Go to website
            </GlobalButton>
          </a>
          <GlobalButton
            style={{ width: "100%", fontSize: 12 }}
            background={"white"}
            color={colors.primary}
            border={"white"}
            onClick={() => setHelp((help) => !help)}
          >
            {help ? "Access account?" : "Need help? Contact us!"}
          </GlobalButton>
          <p style={{ textAlign: "center", fontSize: 10, color: "gray" }}>
            Kumasi Technical University © {new Date().getFullYear()} All rights
            reserved.
          </p>
          <p style={{ textAlign: "center", fontSize: 10, color: "gray" }}>
            v.1.0.0
          </p>
        </LandingDiv>
      </LandingWrapper>
    </LandingContainer>
  );
};

export default Landing;
