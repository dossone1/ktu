import React, { useRef, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import { AccessForm, DataListInput, FormInput } from "../styles/Access";
import { GlobalButton } from "../styles/Global";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useExternalAPI } from "../../hooks/useExternalAPI";

const Step1 = ({ setEmail, setStep, setType }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { getOTP } = useExternalAPI();
  const form = useRef();

  const request = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    const request = await getOTP(e.target[1].value);
    // console.log("Request response: ", request);
    if (request?.newUser === false) {
      setError("Account already exist, login.");
    }
    if (request?.success === true) {
      setEmail(e.target[1].value);
      setType(e.target[0].value);
      setStep(1);
    } else {
      setError(request?.message);
    }
    setLoading(false);
  };

  return (
    <AccessForm
      key={0}
      onSubmit={(e) => (!false ? request(e) : null)}
      ref={form}
    >
     Institution email *
      <FormInput
        type="email"
        required
        placeholder="example@gmail.com"
        hidden={false}
      />
      <p style={{ fontSize: 12, color: "red", marginTop: 5 }}>{error}</p>
      <div
        style={{
          display: "flex",
          fontWeight: "200",
          margin: "25px 0px",
          alignItems: "center",
        }}
      >
        <input type={"checkbox"} required style={{ marginRight: 10 }} /> I
        accept{" "}
        <a
          href={require("../../utils/docs/privacy.pdf")}
          target="_blank"
          style={{ color: "black", marginLeft: 5 }}
        >
          Privacy Policy
        </a>
        ,
        <a href={require("../../utils/docs/terms.pdf")}
          target="_blank" style={{ color: "black", marginLeft: 5 }}>
          Terms and Conditions
        </a>
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
            Continue{" "}
            <HiArrowNarrowRight
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

export default Step1;
