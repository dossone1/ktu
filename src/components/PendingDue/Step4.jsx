import React, { useEffect, useState } from "react";
import { AccessForm } from "../styles/Access";
import { colors } from "../../utils/colors";
import { useAuth } from "../../context/AuthProvider";
import { GlobalButton } from "../styles/Global";

const Step4 = ({message}) => {
  const [timer, setTimer] = useState(20);
  const {navigate} = useAuth()

  useEffect(() => {
    setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }else{
        navigate("/login")
      }
    }, 1000);
  }, [timer]);

  return (
    <AccessForm>
        <h4 style={{textAlign: "center"}}>{message}</h4>
      <span style={{ color: "grey", textAlign: "center"}}>
        Redirecting to login in{" "}
        <span style={{ color: colors.primary }}>{timer+" "}</span>
        seconds.
      </span>
      <GlobalButton
        background={colors.primary}
        color="white"
        border={colors.primary}
        style={{ marginTop: 25 }}
          onClick={() => navigate("/login")}
        // type="submit"
      >
        Redirect
      </GlobalButton>
    </AccessForm>
  );
};

export default Step4;
