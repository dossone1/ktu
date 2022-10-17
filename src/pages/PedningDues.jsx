import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
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
import { Link } from "react-router-dom";
import { GlobalButton, LandingFooter } from "../components/styles/Global";
import { colors } from "../utils/colors";
import { LandingSelector } from "../components/styles/Landing";
import Step1 from "../components/PendingDue/Step1";
import Step2 from "../components/PendingDue/Step2";
import Step3 from "../components/PendingDue/Step3";
import Cookies from "js-cookie";
import Step4 from "../components/PendingDue/Step4";

const PedningDues = () => {
  const [step, setStep] = useState(1);
  // const [type, setType] = useState(null);
  // const [email, setEmail] = useState("");
  // const [userInfo, setUserInfo] = useState(null);
  const [totalUnpaid, setTotalUnpaid] = useState(null);
  const [totalUnpaidData, setTotalUnpaidData] = useState(null);
  const [message, setMessage] = useState(null)
  const { navigate } = useAuth();

  useEffect(() => {
    const live = Cookies.get("temporaryuser");
    if(live === undefined)navigate("/login")
  }, []);

  const renderView = ({ index, active, transitionState }) => {
    return index === 1 ? (
      <Step2
        setTotalUnpaid={setTotalUnpaid}
        setTotalUnpaidData={setTotalUnpaidData}
        setStep={setStep}
      />
    ) : index === 2 ?(
      <Step3 total={totalUnpaid} data={totalUnpaidData} setMessage={setMessage} setStep={setStep}/>
    ): <Step4 message={message}/>;
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
        <AccessAppName>Law Society of Ghana</AccessAppName>
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
        <AccessProgressLevel style={{ margin: "0 30px" }}>
          <AccessProgressNumber on={step === 1}>1</AccessProgressNumber>
          Confirm amount
        </AccessProgressLevel>
        <AccessProgressLevel style={{ margin: "0 30px" }}>
          <AccessProgressNumber on={step === 2}>2</AccessProgressNumber>
          Make Payment
        </AccessProgressLevel>
      </AccessProgressContainer>
      <div style={{ display: "flex", width: "100%", height: 130 }}>
        <LandingSelector transition={step === 4} style={{ margin: 0 }}>
          <AccessInfo>Account Dues Payment</AccessInfo>
        </LandingSelector>
        <LandingSelector transition={step !== 5} style={{ margin: 0 }}>
          <AccessInfo>Payment made, awaiting approval.</AccessInfo>
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
        Law Society of Ghana © {new Date().getFullYear()} All rights reserved.
      </p>
      <p style={{ textAlign: "center", fontSize: 10, color: "gray" }}>
        v.1.1.1
      </p>
    </AccessContainer>
  );
};

export default PedningDues;
