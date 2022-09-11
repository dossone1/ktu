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

const VOInternship = () => {
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
               Ongoing Internships
              </h4>
              
              
            </div>
            <DuesTableRow
              style={{ marginTop: 30, border: "none", color: "#3a5a40" }}
            >
              <h4 style={{ flex: 1, fontSize: 14, fontWeight: "bold" }}>
               #
              </h4>
              <h4 style={{ flex: 1, fontSize: 14, fontWeight: "bold" }}>
               Student Name
              </h4>
              <h4 style={{ flex: 1, fontSize: 14, fontWeight: "bold" }}>
              Contact
              </h4>
              <h4 style={{ flex: 1, fontSize: 14, fontWeight: "bold" }}>
              Department
              </h4>
              <h4 style={{ flex: 1, fontSize: 14, fontWeight: "bold" }}>
              Action
              </h4>
            </DuesTableRow>
            <DuesTableRow
              style={{ marginTop: 0, border: "none", color: "#3a5a40" }}
            >
              <p style={{ flex: 1, fontSize: 14 }}>
                1
              </p>
              <p style={{ flex: 1, fontSize: 14 }}>
               Doss Amanor
              </p>
              <p style={{ flex: 1, fontSize: 14 }}>
              0265729429
              </p>
              <p style={{ flex: 1, fontSize: 14 }}>
               IT Department
              </p>
              <p style={{ flex: 1, fontSize: 14 }}>
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
           
            Assign Officer
          </GlobalButton>
              </p>
            </DuesTableRow>
            <DuesTableRow
              style={{ marginTop: 0, border: "none", color: "#3a5a40" }}
            >
              <p style={{ flex: 1, fontSize: 14 }}>
                2
              </p>
              <p style={{ flex: 1, fontSize: 14 }}>
               Justice Adade Noah
              </p>
              <p style={{ flex: 1, fontSize: 14 }}>
              0501419780
              </p>
              <p style={{ flex: 1, fontSize: 14 }}>
              Electrical Works
              </p>
              <p style={{ flex: 1, fontSize: 14 }}>
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
           
            Assign Officer
          </GlobalButton>
              </p>
            </DuesTableRow>
         

          </div>
        </div>
      
      
      <PopupView payView={payView} setPayView={setPayView}>
        <Step3 />
      </PopupView>
    </div>
  );
};

export default VOInternship;
