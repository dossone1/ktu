import React, { useRef, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import { AccessForm, FormInput } from "../styles/Access";
import { GlobalButton } from "../styles/Global";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import { useEffect } from "react";

const Step01 = ({ email, setStep }) => {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [resend, setResend] = useState(false);
  const [error, setError] = useState("");
  const form = useRef();
  const { verifyEmail, getOTP } = useExternalAPI();

  useEffect(() => {
    setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else setResend(true);
    }, 1000);
  }, [timer]);

  const request = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    // setTimeout(() => {
    //   setStep(2);
    //   setLoading(false);
    //   console.log("Form data: ", e);
    // }, 2000);
    const request = await verifyEmail(email, e.target[1].value);
    console.log("Request response: ", request);
    if (request?.newUser === false) {
      setError("Account already exist, login.");
    }
    if (request?.success === true) {
      setStep(2);
    } else {
      setError(request?.message);
    }
    setLoading(false);
  };

  const resendOTP = async () => {
    setError("")
    const request = await getOTP(email);
    console.log("Request response: ", request);
    if (request?.success === true) {
      setResend(false);
      setTimer(120);
    } else if (request?.success === false) setError(request?.message);
    else setError("An error occured, try again later");
  };

  return (
    <AccessForm
      key={1}
      onSubmit={(e) => (!false ? request(e) : null)}
      ref={form}
    >
      <button
        onClick={() => setStep(0)}
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
        change email
      </button>
      <FormInput type="text" maxLength={6} placeholder="OTP" required />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 5,
          marginBottom: 30,
          flexWrap: "wrap",
        }}
      >
        <label style={{ color: "grey", fontSize: 12 }}>
          verify the OTP sent to {email}.
          <p style={{ fontSize: 12, color: "red", marginTop: 5 }}>{error}</p>
        </label>
        {resend ? (
          <button
            onClick={() => (resend ? resendOTP() : null)}
            style={{
              fontSize: 12,
              color: colors.primary,
              textDecoration: "underline",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            type="button"
          >
            Resend OTP
          </button>
        ) : (
          <span style={{ color: colors.primary }}>
            resend OTP in {timer} seconds
          </span>
        )}
      </div>
      <GlobalButton
        background={colors.primary}
        color="white"
        border={colors.primary}
        //   onClick={() => setOn((on) => (on++ === 3 ? 1 : on++))}
        type="submit"
      >
        {loading ? (
          <span style={{ padding: 10, marginTop: -10, marginBottom: 7 }}>
            <PropagateLoader color={"white"} loading={loading} size={15} />
          </span>
        ) : (
          <>
            Verify{" "}
            <RiSecurePaymentLine
              size={15}
              color="white"
              style={{ marginLeft: 10 }}
            />
          </>
        )}
      </GlobalButton>
    </AccessForm>
  );
};

export default Step01;
