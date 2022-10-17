import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AccessAppName,
  AccessContainer,
  AccessFormContainer,
  AccessInfo,
  AccessIntroIcon,
  AccessNav,
  AccessProgressContainer,
  AccessProgressLevel,
  AccessProgressNumber,
  ViewSliderContainer,
} from "../components/styles/Access";
import { GlobalButton, LandingFooter } from "../components/styles/Global";
import { colors } from "../utils/colors";

import Step00 from "../components/Join/Step00";
import Step01 from "../components/Join/Step01";
import Step2 from "../components/Join/Step2";
import Step3 from "../components/Join/Step3";
import { useAuth } from "../context/AuthProvider";
import { LandingSelector } from "../components/styles/Landing";
import Step4 from "../components/Join/Step4";
import Step2Lawyer from "../components/Join/Step2Lawyer";
import Step2Student from "../components/Join/Step2Student";

const Join = () => {
  const [step, setStep] = useState(0);
  const [type, setType] = useState(null);
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const { navigate } = useAuth();


  const renderView = ({ index, active, transitionState }) => {
    return index === 0 ? (
      <Step00 setStep={setStep} setType={setType} setEmail={setEmail} />
    ) : index === 1 ? (
      <Step01 setStep={setStep} email={email} />
    ) : index === 2 ? (
      <Step2
        setStep={setStep}
        setUserInfo={setUserInfo}
      />
    ) : index === 3 ? (
      type == "Student" ? (
        <Step2Student setStep={setStep} setUserInfo={setUserInfo} />
      ) : (
        <Step2Lawyer setStep={setStep} setUserInfo={setUserInfo} />
      )
    ) : index === 4 ? (
      <Step3
        setStep={setStep}
        userInfo={{ ...userInfo, typeofuser: type, emailaddress: email }}
      />
    ) : (
      <Step4 />
    );
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
        <Link to="/login" style={{ textDecoration: "none" }}>
          <GlobalButton
            style={{ width: "100%" }}
            background={colors.primary}
            color="white"
            border={colors.primary}
          >
            Login
          </GlobalButton>
        </Link>
      </AccessNav>
      <AccessProgressContainer>
        <AccessProgressLevel>
          <AccessProgressNumber on={step === 0 || step === 1}>
            1
          </AccessProgressNumber>
          Confirm email
        </AccessProgressLevel>
        <AccessProgressLevel style={{ margin: "0 30px" }}>
          <AccessProgressNumber on={step === 2}>2</AccessProgressNumber>
          Personal details
        </AccessProgressLevel>
        <AccessProgressLevel style={{ margin: "0 30px" }}>
          <AccessProgressNumber on={step === 3}>3</AccessProgressNumber>
          Career details
        </AccessProgressLevel>
        <AccessProgressLevel>
          <AccessProgressNumber on={step === 4}>4</AccessProgressNumber>
          Set password
        </AccessProgressLevel>
      </AccessProgressContainer>

      <div style={{ display: "flex", width: "100%", height: 130 }}>
        <LandingSelector transition={step === 5} style={{ margin: 0 }}>
          <AccessInfo>Start using Attachment Portal</AccessInfo>
        </LandingSelector>
        <LandingSelector transition={step !== 5} style={{ margin: 0 }}>
          <AccessInfo style={{ fontSize: 15 }}>
            Your information has been successfully submitted and is
            pending approval. To complete the registration process, you will be
            contacted by the University to  conplete the registration.
          </AccessInfo>
        </LandingSelector>
      </div>
      
      <AccessFormContainer>
        <ViewSliderContainer
          renderView={renderView}
          numViews={3}
          activeView={step}
          animateHeight
        />
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

export default Join;
