import React, { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import {
  AccessForm,
  DataListInput,
  FormInput,
} from "../../components/styles/Access";
import { GlobalButton, RowDivSpace } from "../../components/styles/Global";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import "../../components/styles/Customcheckbox.css";
import { DuesCheck, DuesDot, DuesTableRow } from "../../components/styles/Dues";
import AnimateHeight from "react-animate-height";
import {
  DashSearchContainer,
  IconDashReceipt,
  IconDashRight,
} from "../../components/styles/Dashboard";
import PopupView from "../../components/General/PopupPendingView";
import Step3 from "../../components/PendingDue/Step3";
import { useAuth } from "../../context/AuthProvider";
import { IoNotificationsCircleSharp } from "react-icons/io5";

const Dues = () => {
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
  const [payView, setPayView] = useState(false);
  const { user } = useAuth();

  const {
    fullregionname,
    phonenumber,
    region,
    typeofuser,
    fullchapter,
    fullprovice,
    fullareaofp,
    fullchamber,
    userpaymentdata,
  } = user;

  useEffect(() => {
    let total = [];
    payingList.forEach(({ amount }) => total.push(amount));
    total = total === [] ? 0 : total.reduce((a, b) => a + b, 0);
    setTotal(total);
  }, [payingList]);

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

  const request = () => {};

  return (
    <div style={{ marginTop: 20, display: "flex" }}>
     
        <div style={{ flex: 1 }}>
          <p
            style={{
              color: "black",
              marginBottom: 25,
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: 5,
              padding: "5px 7px",
            }}
          >
           Industry supervisor assignment
          </p>
          <div style={{ width: "100%" }}>
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: 5,
                padding: 5,
              }}
            >
              <h4
                style={{
                  marginBottom: 10,
                  fontSize: 14,
                  color: colors.primary,
                }}
              >
               Map supervisor to student below
              </h4>
              
            </div>
         
           
          </div>
         
          <AccessForm
      key={0}
      onSubmit={(e) => (!false ? request(e) : null)}
      ref={form}
    >
     Select Intern *
      <FormInput
        type="text"
        required
        placeholder=""
        hidden={false}
      />
      Select Supervisor *
      <FormInput
        type="number"
        required
        placeholder=""
        hidden={false}
      />
   
      <GlobalButton
            background={"green"}
            color={"white"}
            style={{
              margin: 0,
              borderRadius: 5,
              padding: "10px 20px",
              display: "inline",
              marginTop: 10,
            }}
            type="button"
            onClick={() => setPayView(true)}
          >
            {loading ? (
              <span style={{ padding: 10, marginTop: -10, marginBottom: 7 }}>
                <PropagateLoader color={"white"} loading={loading} size={15} />
              </span>
            ) : (
              "Submit Request"
            )}
          </GlobalButton>
    </AccessForm>

        </div>
      
      <div
        style={{
          padding: 10,
          border: "1px solid #E8E4E0",
          borderRadius: 10,
          width: 250,
          height: "max-content",
          marginLeft: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h5>Receipts</h5>
          <IconDashReceipt />
        </div>
        <p style={{ fontSize: 12, marginTop: 10, marginBottom: 5 }}>
          Payments, donations, resources etc.
        </p>
        <RowDivSpace
          style={{ fontSize: 14, marginTop: 10, cursor: "pointer" }}
          // onClick={() => direct("/dashboard/dues")}
        >
          Mandatory
          <IconDashRight />
        </RowDivSpace>
        <RowDivSpace
          style={{
            fontSize: 14,
            marginTop: 10,
            marginBottom: 10,
            cursor: "pointer",
          }}
          // onClick={() => direct("/dashboard/dues")}
        >
          Optional
          <IconDashRight />
        </RowDivSpace>
        <a
          style={{
            color: colors.primary,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          View all
        </a>
      </div>
      <PopupView payView={payView} setPayView={setPayView}>
        <Step3 />
      </PopupView>
    </div>
  );
};

export default Dues;
