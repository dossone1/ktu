import React, { useRef, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import { AccessForm, FormInput } from "../styles/Access";
import { GlobalButton } from "../styles/Global";
import { HiArrowNarrowRight } from "react-icons/hi";
import validator from "validator";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Step3 = ({ setEmail, setStep, userInfo }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [strong, setStrong] = useState(false);
  const form = useRef();
  const { addPendingAccount, loginUser } = useExternalAPI();
  const [meta, setMeta] = useState("");

  // useEffect(() => {
  //   getIP();
  // }, []);

  const getIP = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    const meta = navigator.userAgent;
    setMeta({
      ipaddress: res.data.IPv4,
      useragent: meta,
    });
  };

  const request = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    if (e.target[0].value !== e.target[1].value) {
      setError("Password mismatch!");
      setLoading(false);
      return;
    }
    if (!strong) {
      setError(
        "Weak password (must have a symbol, upper- and lower-case letters, and eight or more characters.)."
      );
      setLoading(false);
      return;
    }
    
    // console.log("All info: ", userInfo);
    // setLoading(false);
    //   return;

    // setTimeout(() => {
    //   setLoading(false);
    //   setEmail(e.target[1].value);
    //   setStep(4);
    //   console.log("Form data: ", e);
    // }, 2000);

    await getIP()
      .then(async (meta) => {
        const request = await addPendingAccount({
          ...userInfo,
          password: e.target[1].value,
        });
        console.log("Data: ", request);
        if (request?.newUser === false) {
          setError("Account already exist, login.");
        }
        if (request?.success === true) {
          // const login = await loginUser({
          //   emailaddress: userInfo.emailaddress,
          //   password: userInfo.password,
          //   meta: {
          //     ipaddress: meta.data?.IPv4,
          //     useragent: navigator.userAgent,
          //   },
          // });

          // // if (login?.success === true) {
          // //   const expire = new Date(new Date().getTime() + 10 * 60 * 1000);
          // //   Cookies.set("temporaryuser", login.data?.userpaymentdata, {
          // //     expires: 1,
          // //   });
          // // }
          setStep(5);
        } else {
          setError(request?.message);
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

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setStrong(true);
      setError("Strong password");
    } else {
      setStrong(false);
      setError("Weak password");
    }
  };

  return (
    <AccessForm
      key={0}
      onSubmit={(e) => (!false ? request(e) : null)}
      ref={form}
    >
      Password *
      <FormInput
        type="password"
        required
        hidden={false}
        onChange={(e) => validate(e.target.value)}
        style={{ marginBottom: 10 }}
        placeholder="**********"
      />
      Confirm password *
      <FormInput
        type="password"
        required
        hidden={false}
        placeholder="**********"
      />
      <p
        style={{
          fontSize: 12,
          color: strong ? "#308D46" : "red",
          marginTop: 5,
        }}
      >
        {error}
      </p>
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
            Finish{" "}
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

export default Step3;
