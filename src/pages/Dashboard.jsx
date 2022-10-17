import React, { useEffect, useState } from "react";
import {
  DashboardContainer,
  DashboardWorkSection,
  DashDate,
  DashDropMenu,
  DashDropMenuItem,
  IconDashDropDown,
  IconDashLogout,
  IconDashNotification,
  IconDashProfile,
} from "../components/styles/Dashboard";
import { RowDivSpace, RowSpan } from "../components/styles/Global";
import dateFormat from "dateformat";
import { Divider } from "rc-menu";

import "rc-dropdown/assets/index.css";
import { useAuth } from "../context/AuthProvider";
import MenuButtons from "../components/Dashboard/MenuButtons";
import Navigation from "../components/Dashboard/Navigation";
import { Route, Routes, useLocation } from "react-router-dom";
import EditProfile from "./Dashboard/EditProfile";
import Profile from "./Dashboard/Profile";
import Home from "./Dashboard/Home";
import DashNotFound from "./Dashboard/DashNotFound";
import Popup from "../components/General/PopupPendingView";
import PopupView from "../components/General/PopupPendingView";
import Unavailable from "./Dashboard/Unavailable";
import Dues from "./Dashboard/Dues";
import InternshipRequest from "./Dashboard/InternshipRequest";
import Donations from "./Dashboard/Donations";
import { useExternalAPI } from "../hooks/useExternalAPI";
import InternshipRequirement from "./Dashboard/InternshipRequirement";
import VOInternship from "./Dashboard/VOInternship";
import ContactUni from "./Dashboard/ContactUni";
import ContactInd from "./Dashboard/ContactInd";
import Feedback from "./Dashboard/Feedback";
import StudentAss from "./Dashboard/StudentAss";
import IncidentRpt from "./Dashboard/IncidentRpt";
import AssignSupervisor from "./Dashboard/AssignSupervisor";
import RequestInterns from "./Dashboard/RequestInterns";
import VideoCall from "./Dashboard/VideoCall";

const Dashboard = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { loginOutUser } = useExternalAPI();
  const { logout, user, navigate } = useAuth();
  const [page, setPage] = useState("");
  const location = useLocation();

  useEffect(() => {
    try {
      const pages = location.pathname?.split("/");
      // console.log("Url: ", pages);
      setPage(pages.length === 3 ? pages[2] : pages[1]);
    } catch (e) {
      console.error(e);
    }
  }, [location]);

  useEffect(() => {
    if (user?.typeofuser === undefined || user?.typeofuser === null)
      loginOutUser();
  }, []);

  function onSelect({ key }) {
    console.log(`${key} selected`);
    if (key === "2") loginOutUser();
  }

  function onVisibleChange(visible) {
    console.log(visible);
  }

  const menu = (
    <DashDropMenu onSelect={onSelect} style={{ padding: 10, fontSize: 15 }}>
      <DashDropMenuItem key="1">Edit Profile</DashDropMenuItem>
      <Divider />
      <DashDropMenuItem key="2" style={{ marginTop: 10 }}>
        Sign out <IconDashLogout />
      </DashDropMenuItem>
    </DashDropMenu>
  );

  return (
    <DashboardContainer>
      <Navigation setNavOpen={setNavOpen} page={page} />
      <MenuButtons navOpen={navOpen} setNavOpen={setNavOpen} page={page} />
      <DashboardWorkSection>
        <RowDivSpace style={{ fontSize: 14, alignItems: "center" }}>
          <DashDate>{dateFormat(Date.now(), "dddd, dS mmmm")}</DashDate>
          <RowSpan>
            <IconDashNotification />
            {/* <IconDashProfile onClick={() => navigate("dashboard/profile")} /> */}
            {/* <ColumnSpan style={{ marginLeft: 10, fontSize: 16 }}>
              <DashProfileName>{user?.email}</DashProfileName>
              <DashDate style={{ color: "grey" }}>Lawyer</DashDate>
            </ColumnSpan> 
            <Dropdown
              trigger={["click"]}
              overlay={menu}
              animation="slide-up"
              onVisibleChange={onVisibleChange}
            >
              <IconDashDropDown />
            </Dropdown> */}
          </RowSpan>
        </RowDivSpace>
        {user?.typeofuser ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="editprofile" element={<EditProfile />} />
            <Route path="dues" element={<Dues />} />
            <Route path="internshipReq" element={<InternshipRequest />} />
            <Route path="internshipRequire" element={<InternshipRequirement />} />
            <Route path="viewInternship" element={<VOInternship />} />
            <Route path="contactUni" element={<ContactUni />} />
            <Route path="contactInd" element={<ContactInd />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="incidentRpt" element={<IncidentRpt />} />
            <Route path="stdAssessment" element={<StudentAss />} />
            <Route path="assignSupervisor" element={<AssignSupervisor />} />
            <Route path="requestIntern" element={<RequestInterns />} />
            <Route path="videoCall" element={<VideoCall />} />
             <Route path="donations" element={<Donations />} />
            <Route path="dev" element={<Unavailable />} />
            <Route path="*" element={<DashNotFound />} />
          </Routes>
        ) : (
          loginOutUser()
        )}
      </DashboardWorkSection>
    </DashboardContainer>
  );
};

export default Dashboard;
