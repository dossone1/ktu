import React, { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import { AccessForm, DataListInput, FormInput } from "../styles/Access";
import { GlobalButton } from "../styles/Global";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import Resizer from "react-image-file-resizer";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthProvider";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import PopupView from "../General/PopupPendingView";
import { IoNotificationsCircleOutline } from "react-icons/io5";

const Step3 = ({ total, data, setStep, setMessage }) => {
  const [loading, setLoading] = useState(false);
  const { navigate } = useAuth();
  const [error, setError] = useState("");
  const [stepM, setStepM] = useState(0);
  const { queryPaymentAccount, makeUserPayment, checkMomoStatus } =
    useExternalAPI();
  const [paymentType, setTypePayment] = useState(null);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [initiated, setInitiated] = useState(null);
  const [verify, setVerify] = useState(false);
  const [base64, setBase64] = useState(null);
  const [phone, setPhone] = useState("");
  const [popup, setPopup] = useState(false)

  const form = useRef();
  const fileTypes = ["JPG", "PNG"];

  useEffect(() => {
    const interval = setInterval(() => {
      checkMomo();
    }, 5000);
    if (initiated === null) {
      clearInterval(interval);
    }
  }, [initiated]);

  useEffect(() => {
    setInitiated(null);
    setVerify(false);
    setAccountName(null);
  }, [phone]);

  const checkMomo = async () => {
    checkMomoStatus({ userpaymentcategory: "NEW", TransID: initiated })
      .then((res) => {
        // console.log("Momo response: ", res.success);
        if (res.success) {
          setMessage("Payment successful");
          setStep(4);
        }
      })
      .catch((e) => {
        // console.error(e);
      });
  };

  const handleChange = async (file) => {
    console.log("File: ", file);
    setImg(URL.createObjectURL(file));
    // const converted = handleCompressedUpload(file);
    const resize = await resizeFile(file);
    console.log("Size before: ", file?.size);
    setFile(resize);
    // console.log(getBase64());
    // console.log("Size after: ", resize?.size)
    setBase64(resize);
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        400,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const request = async (e) => {
    e.preventDefault();
    const live = Cookies.get("temporaryuser");
    if (live === undefined) navigate("/login");

    console.log(e);
    setLoading(true);
    setError("");

    const dataID = JSON?.parse(Cookies.get("temporaryuser"));
    // console.log(dataID)
    let paymentsetupid = [];
    dataID?.allpaymentunpaid?.forEach((data) =>
      paymentsetupid.push({
        id: data.id,
        amount: "" + data.amount + "",
      })
    );

    if (stepM === 0 && paymentType === "MOMO") {
      // console.log("MOMO pay");
      if (verify === false) {
        const user = await queryPaymentAccount({
          txtNetwork: e.target[2].value,
          txtNumber: e.target[3].value,
        });

        // console.log(user)
        if (user?.success === true) {
          // console.log("User: ", user);
          setAccountName(user?.data);
        } else {
          // console.log("Error: ", user?.message);
          setError(user?.message);
        }
      } else {
        const uploadData = {
          paymentsetupid,
          paymentmode: "MOMO",
          txtNetwork: e.target[2].value,
          txtNumber: e.target[3].value,
          txtName: accountName,
          useremailaddress: dataID?.emailaddress.toLowerCase(),
          amount: total,
          paymentdetails: "",
          userpaymentcategory: "NEW",
        };

        // console.log("Payment data: ", uploadData);
        const user = await makeUserPayment(uploadData);
        if (user?.success === true) {
          console.log("Payment response: ", user);
          // setMessage(user.message);
          // setStep(4);
          // setAccountName(user?.data);
          setInitiated(user.data);
          setPopup(true)
        } else {
          console.log("Error: ", user?.message);
          setError(user?.message);
        }
      }
    } else {
      if (base64 === null) {
        setError("Upload a deposit image.");
        setLoading(false);
        return;
      }
      const uploadData = {
        paymentsetupid,
        paymentmode: "BANKTRANSFER",
        txtNetwork: "",
        txtNumber: "",
        txtName: "",
        useremailaddress: dataID?.emailaddress,
        amount: total,
        paymentdetails: base64,
        userpaymentcategory: "NEW",
      };
      // console.log("BANK pay: ", uploadData);
      const res = await makeUserPayment(uploadData);
      if (res?.success === true) {
        setMessage("Bank Transactions slip submitted awaiting approval");
        setStep(4);
      } else {
        // console.log("Error: ", res?.message);
        setError(res?.message);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <AccessForm
        key={0}
        onSubmit={(e) => (!false ? request(e) : null)}
        ref={form}
      >
        <button
          onClick={() => setStep(1)}
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
          back
        </button>
        <p
          style={{
            color: "black",
            marginBottom: 25,
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            borderRadius: 5,
            padding: "5px 7px",
          }}
        >
          You're required to make payment of an amount of
          <h2 style={{ color: colors.primary, display: "inline" }}>
            {" "}
            GH₵ {total}{" "}
          </h2>
          to have you're account reviewed
        </p>
        Choose Payment Method *
        <DataListInput
          style={{ marginBottom: 10 }}
          onChange={(e) => setTypePayment(e.target.value)}
          required
          name="paymentmode"
        >
          <option value="" disabled selected>
            select type
          </option>
          <option value="MOMO">Mobile Money</option>
          <option value="BANK">Bank Deposit</option>
        </DataListInput>
        {paymentType === "MOMO" ? (
          <>
            Choose Mobile Wallet *
            <DataListInput
              style={{ marginBottom: 10 }}
              onChange={(e) => console.log(e.target.value)}
              required
            >
              <option>MTN</option>
              <option>Vodafone</option>
              <option>AirtelTigo</option>
            </DataListInput>
            Phone number *
            <FormInput
              type="tel"
              required
              placeholder="input number"
              hidden={false}
              onChange={(e) => setPhone(e.target.value)}
            />
            {accountName !== null ? (
              <>
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
                  Please verify if
                  <h2
                    style={{ color: "black", display: "inline", fontSize: 17 }}
                  >
                    {" "}
                    {accountName}{" "}
                  </h2>
                  is the name on the account entered above.
                  <div
                    style={{
                      display: "flex",
                      fontWeight: "200",
                      marginTop: 10,
                      alignItems: "center",
                    }}
                  >
                    <input
                      type={"checkbox"}
                      style={{ marginRight: 10 }}
                      onChange={(e) => setVerify(e.target.checked)}
                      id={"verify"}
                    />{" "}
                    <label for="verify">I verify</label>
                  </div>
                </p>
              </>
            ) : null}
          </>
        ) : paymentType === "BANK" ? (
          <>
            <p style={{ marginBottom: 10 }}>Upload bank transaction receipt</p>
            <FileUploader
              handleChange={handleChange}
              name="file"
              label="Upload or drag and drop payment receipt here."
              types={fileTypes}
              multiple={false}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px 0",
              }}
            >
              {img !== null ? (
                <img src={img} alt="" style={{ height: 400, width: "auto" }} />
              ) : null}
            </div>
          </>
        ) : null}
        <p style={{ fontSize: 12, color: "red", marginTop: 5 }}>{error}</p>
        <GlobalButton
          background={colors.primary}
          color="white"
          border={colors.primary}
          style={{ marginTop: 25 }}
          type="submit"
        >
          {loading ? (
            <span style={{ padding: 10, marginTop: -10, marginBottom: 7 }}>
              <PropagateLoader color={"white"} loading={loading} size={15} />
            </span>
          ) : (
            <>
              {verify ? "Pay" : "Continue"}{" "}
              <HiArrowNarrowRight
                size={15}
                color="white"
                style={{ marginLeft: 10 }}
              />
            </>
          )}
        </GlobalButton>
      </AccessForm>
      <PopupView payView={popup}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingBottom: 20,
          }}
        >
          <IoNotificationsCircleOutline
            color={colors.primary}
            style={{ minWidth: 300, marginBottom: 20, alignSelf: "center" }}
            size={30}
          />
          <h3 style={{ textAlign: "center", marginBottom: 30 }}>
            Payment Confirmation
          </h3>
          <p
            style={{
              textAlign: "center",
              color: colors.secondary,
              fontSize: 14,
            }}
          >
            Please check your phone for payment authorization. An amount of{" "}
            <span style={{ fontWeight: "bold", color: "black" }}>
              GH₵ {total}
            </span>{" "}
            will be deducted from{" "}
            <span style={{ fontWeight: "bold", color: "black" }}>{phone}</span>{" "}
            upon authorization.
          </p>
          <GlobalButton
            background={colors.primary}
            color="white"
            border={colors.primary}
            style={{
              width: "max-content",
              paddingLeft: 40,
              paddingRight: 40,
              alignSelf: "center",
              marginTop: 30
            }}
            onClick={()=> setPopup(false)}
          >
            Okay
          </GlobalButton>
        </div>
      </PopupView>
    </>
  );
};

export default Step3;
