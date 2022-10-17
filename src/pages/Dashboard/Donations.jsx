import React, { useState } from "react";
import { BiHappyAlt } from "react-icons/bi";
import { FaSmileBeam } from "react-icons/fa";
import PopupView from "../../components/General/PopupPendingView";
import Step3 from "../../components/PendingDue/Step3";
import { FormInput } from "../../components/styles/Access";
import {
  DashSearchContainer,
  IconDashReceipt,
  IconDashRight,
} from "../../components/styles/Dashboard";
import { GlobalButton, RowDivSpace } from "../../components/styles/Global";
import { colors } from "../../utils/colors";

const Donations = () => {
  const [payView, setPayView] = useState(false)

  return (
    <div style={{ marginTop: 20, display: "flex" }}>
      <div style={{ flex: 1 }}>
        <DashSearchContainer
          style={{
            margin: "10px 0",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid rgba(0, 0, 0, 0.09)",
            backgroundColor: "#f8f8fa",
            fontSize: 14,
          }}
        >
          Do you want to donate an amounnt to support the association?
          <FaSmileBeam color={colors.primary} size={30} />
        </DashSearchContainer>
        <div style={{}}>
          <FormInput
            type="number"
            placeholder="input amount"
            style={{ height: "min-content" }}
          />
          <GlobalButton
            background={"green"}
            color={"white"}
            style={{
              margin: 0,
              borderRadius: 5,
              padding: "10px 20px",
              display: "inline",
              height: "max-content",
              alignSelf: "flex-end",
              marginTop: 20,
            }}
            type="button"
            onClick={() => setPayView(true)}
          >
            Confirm Payment
          </GlobalButton>
        </div>
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
        <RowDivSpace
          style={{ fontSize: 14, marginTop: 10, cursor: "pointer" }}
          // onClick={() => direct("/dashboard/dues")}
        >
          This week
          <IconDashRight />
        </RowDivSpace>
        <RowDivSpace
          style={{ fontSize: 14, marginTop: 10, cursor: "pointer" }}
          // onClick={() => direct("/dashboard/dues")}
        >
          This month
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

export default Donations;
