import React, { useRef, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import { AccessForm, FormInput } from "../styles/Access";
import { HiArrowNarrowRight } from "react-icons/hi";
import validator from "validator";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import { useEffect } from "react";
import axios from "axios";
import { Form,Button } from "react-bootstrap";
import { Show } from "../../utils/service";
import { useAuth } from "../../context/AuthProvider";

const Step3 = ({ setEmail, setStep, userInfo }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [strong, setStrong] = useState(false);
  const form = useRef();
  const { addPendingAccount, loginUser } = useExternalAPI();
  const [meta, setMeta] = useState("");
  const { navigate } = useAuth();
  // useEffect(() => {
  //   getIP();
  // }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
   Show.Success("Signup request initiated successfully. You will be contacted for further details to complete the process");
   navigate("/");
  }

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
   
   <Button      
      onClick={handleSubmit}>
        
            Finish{" "}
            <HiArrowNarrowRight
              size={15}
              color="white"
              style={{ marginLeft: 10 }}
            />
        
      </Button>
    </AccessForm>
  );
};

export default Step3;
