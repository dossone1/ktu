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

const InternshipRequirement = () => {
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
                Industry Internship Requirements
              </h4>
              
              
            </div>
         
           Details of various requirements needed to qualify to receive students for internship goes here
          </div>
        </div>
      
      
      <PopupView payView={payView} setPayView={setPayView}>
        <Step3 />
      </PopupView>
    </div>
  );
};

export default InternshipRequirement;
