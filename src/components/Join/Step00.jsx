import React, { useRef, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import { AccessForm, DataListInput, FormInput } from "../styles/Access";
import { GlobalButton } from "../styles/Global";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import PhoneInput from "react-phone-input-2";
import { DashSearchContainer } from "../../components/styles/Dashboard";

const Step00 = ({setStep, setType }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { getOTP } = useExternalAPI();
  const form = useRef();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const request = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setEmail(e.target[1].value);
    //   setType(e.target[0].value);
    //   setStep(1)
    //   console.log("Form data: ", e);
    // }, 2000);
    const request = await getOTP(e.target[1].value);
    console.log("Request response: ", request);
    if (request?.newuser === false) {
      setError(request.message);
      setLoading(false)
      return
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
     Name of Institution *
      <FormInput
        type="text"
        required
        placeholder="Company name"
        hidden={false}
      />
      Institution email *
      <FormInput
        type="email"
        required
        placeholder="example@gmail.com"
        hidden={false}
      />


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

export default Step00;
