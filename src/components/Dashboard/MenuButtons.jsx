import React, { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useAuth } from "../../context/AuthProvider";
import { pages } from "../../utils/pages";
import DropList from "../Navigation/DropList";
import {
  DashboardSelectSection,
  DashSearchContainer,
  DashSearchInput,
  IconDashRight,
} from "../styles/Dashboard";
import { RowDivSpace } from "../styles/Global";

const MenuButtons = ({ navOpen, page, setNavOpen }) => {
  const [pagename, setPagename] = useState("");
  const { navigate } = useAuth();

  useEffect(() => {
    // console.log("Url: ", page);
    pages?.forEach((element) => {
      if (element?.path === page) setPagename(element?.name);
    });
  }, [page]);

  const direct = (url) => {
    setNavOpen(false);
    navigate(url);
  };

  return (
    <DashboardSelectSection isOpen={navOpen}>
      <h1 style={{ fontSize: 16, textTransform: "capitalize" }}>
        {pagename || page}
      </h1>
      <DashSearchContainer>
        <RiSearchLine color={"black"} size={20} />
        <DashSearchInput placeholder="search.." />
      </DashSearchContainer>
      <DropList title="Dashboard">
        <>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard")}
          >
            Homepage
          </RowDivSpace>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard/dev")}
          >
           Notifications (o)
          </RowDivSpace>
        </>
      </DropList>
      {/* <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/profile")}
      >
        Profile
        <IconDashRight />
      </RowDivSpace> */}
      <DropList title="Profile">
        <>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard/profile")}
          >
            View Profile
          </RowDivSpace>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard/editprofile")}
          >
            Edit Profile
          </RowDivSpace>
        </>
      </DropList>

      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/internshipRequire")}
      >
       View Internship Requirement
      </RowDivSpace>
      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/internshipReq")}
      >
        Internship Students Request
      </RowDivSpace>
      <DropList title="Workspace">
        <>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard/dues")}
          >
            Assign Mentor/Industry Supervisor
          </RowDivSpace>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard/dev")}
          >
            Contact University Supervisor
          </RowDivSpace>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard/dev")}
          >
            Contact Industry Liaison Office
          </RowDivSpace>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard/viewInternship")}
          >
           View Ongoing Internships 
          </RowDivSpace>
        </>
      </DropList>
      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/dev")}
      >
       Submit Student Assessment
      </RowDivSpace>
      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/dev")}
      >
       Incidence Report
        <IconDashRight />
      </RowDivSpace>
      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/dev")}
      >
       Give Feedback
      </RowDivSpace>
     
      
    </DashboardSelectSection>
  );
};

export default MenuButtons;
