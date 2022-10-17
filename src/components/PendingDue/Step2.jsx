import React, { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import { AccessForm, DataListInput, FormInput } from "../styles/Access";
import { GlobalButton } from "../styles/Global";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import "../styles/Customcheckbox.css";
import { DuesCheck, DuesDot, DuesTableRow } from "../styles/Dues";
import AnimateHeight from "react-animate-height";
import Cookies from "js-cookie";

const Step2 = ({ setTotalUnpaid, setTotalUnpaidData, setStep }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payingList, setPayingList] = useState([
    {
      id: 1,
      amount: 240,
    },
  ]);
  const [total, setTotal] = useState(0);
  const [drop, setDrop] = useState(false);
  const [unpaid, setUnpaid] = useState(null);

  useEffect(() => {
    try {
      // console.log(
      //   "Current payments step2: ",
      //   JSON?.parse(data).allpaymentunpaid
      // );
      const data = JSON?.parse(Cookies.get("temporaryuser"));
      setUnpaid(data.allpaymentunpaid);
      const all = []
      data.allpaymentunpaid.map((data) => all.push(data.amount));
      console.log("All: ", all)
      setTotal(all.reduce((a, b) => a + b, 0))
    } catch (e) {
      console.error(e);
    }
  }, []);

  // useEffect(() => {
  //   let total = [];
  //   payingList.forEach(({ amount }) => total.push(amount));
  //   total = total === [] ? 0 : total.reduce((a, b) => a + b, 0);
  //   setTotal(total);
  // }, [payingList]);

  const exist = (id, checked, amount) => {
    const exist = payingList.find((element) => {
      if (element.id === id) {
        return true;
      }

      return false;
    });

    if (exist && !checked) {
      setPayingList((e) => e.filter((data) => data.id !== id));
    }
    if (!exist && checked) {
      setPayingList((e) => [...e, { amount, id }]);
    }
  };

  const form = useRef();
  const fileTypes = ["JPG", "PNG"];

  const request = (e) => {
    e.preventDefault();
    setTotalUnpaid(total);
    setTotalUnpaidData(unpaid)
    setStep(2);
  };

  return (
    <AccessForm
      key={0}
      onSubmit={(e) => (!false ? request(e) : null)}
      ref={form}
    >
      <p
        style={{
          color: "black",
          marginBottom: 25,
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          borderRadius: 5,
          padding: "5px 7px",
        }}
      >
        Your account's fees are listed below
      </p>
      <div style={{ width: "100%" }}>
        <div
          style={{
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 5,
            padding: 5,
          }}
        >
          <h4 style={{ marginBottom: 10, fontSize: 14, color: colors.primary }}>
            Mandatory Dues
          </h4>
          {unpaid?.map((data, index) => (
            <DuesTableRow key={index}>
              {/* <DuesCheck>
              <DuesDot active={true} />
            </DuesCheck> */}
              <label class="container">
                <input
                  type={"checkbox"}
                  checked={true}
                  disabled={true}
                  style={{ marginRight: 5 }}
                  // onChange={(e) => setCheck(e.target.checked)}
                />
                <span class="checkmark" />
              </label>
              <p style={{ flex: 1, color: "black", fontSize: 14 }}>
                Annual dues
                <p style={{ fontSize: 12, color: "grey" }}>{data.desctext}</p>
              </p>
              <p style={{ color: "black", fontSize: 16 }}>GH₵ {data.amount}</p>
            </DuesTableRow>
          ))}
        </div>
        {/* <div
          style={{
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 5,
            padding: 5,
            marginTop: 20,
          }}
        >
          <h4 style={{ marginBottom: 10, fontSize: 14, color: "#219ebc" }}>Optional Dues</h4>
          <DuesTableRow>
             <DuesCheck>
            <DuesDot active={exist(2)} />
          </DuesCheck> 
            <label class="container">
              <input
                type={"checkbox"}
                style={{ marginRight: 5 }}
                onChange={(e) => exist(2, e.target.checked, 50)}
              />
              <span class="checkmark" />
            </label>
            <p style={{ flex: 1, color: "black", fontSize: 14 }}>
              Accra Chapter Dues
            </p>
            <p style={{ color: "black", fontSize: 16 }}>GH₵ 50.00</p>
          </DuesTableRow>
          <DuesTableRow>
             <DuesCheck>
            <DuesDot active={exist(2)} />
          </DuesCheck> 
            <label class="container">
              <input
                type={"checkbox"}
                style={{ marginRight: 5 }}
                onChange={(e) => exist(3, e.target.checked, 100)}
              />
              <span class="checkmark" />
            </label>
            <p style={{ flex: 1, color: "black", fontSize: 14 }}>
              Student Entrance Dues
            </p>
            <p style={{ color: "black", fontSize: 16 }}>GH₵ 100.00</p>
          </DuesTableRow>
        </div>
        <div
          style={{
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 5,
            padding: 5,
            marginTop: 20,
          }}
        >
          <h4 style={{ marginBottom: 10, fontSize: 14 }}>
            Optional Minimum Dues
          </h4>
          <DuesTableRow>
            <label class="container">
              <input
                type={"checkbox"}
                style={{ marginRight: 5 }}
                onChange={(e) => exist(3, e.target.checked, 55)}
              />
              <span class="checkmark" />
            </label>
            <p style={{ flex: 1, color: "black", fontSize: 14 }}>Donation</p>
            <p style={{ color: "black", fontSize: 16, display: "flex", justifyContent: "right", alignItems: "center" }}>
               <span
                style={{
                  color: "gray",
                  fontSize: 11,
                }}
              >
                minimum of{" "}
              </span>{" "} 
              GH₵ 55.00
              {!drop ? (
                <GlobalButton
                  background={"green"}
                  color={"white"}
                  style={{
                    margin: 0,
                    borderRadius: 5,
                    padding: "10px 20px",
                    display: "inline",
                    marginLeft: 5,
                  }}
                  type="button"
                  onClick={() => setDrop(true)}
                >
                  change
                </GlobalButton>
              ) : null}
            </p>
          </DuesTableRow>
          <AnimateHeight height={drop ? "auto" : 0}>
            <div style={{ display: "flex" }}>
              <FormInput type="number" placeholder="input amount" />
              <GlobalButton
                background={"green"}
                color={"white"}
                style={{
                  margin: 0,
                  borderRadius: 5,
                  padding: "10px 20px",
                  display: "inline",
                  marginLeft: 5,
                  height: "max-content",
                  alignSelf: "flex-end",
                }}
                type="button"
                onClick={() => setDrop(false)}
              >
                confirm
              </GlobalButton>
            </div>
          </AnimateHeight>
        </div>*/}
        <DuesTableRow
          style={{ marginTop: 30, border: "none", color: "#3a5a40" }}
        >
          <p style={{ flex: 1, fontSize: 14, fontWeight: "bold" }}>
            Total Amount Due
          </p>
          <h2 style={{ fontSize: 16 }}>GH₵ {total}</h2>
        </DuesTableRow>
      </div>
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

export default Step2;
