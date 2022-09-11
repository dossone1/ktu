import React, { useEffect, useState } from "react";
import {
  DashboardNav,
  DashIcon,
  DashIconMenu,
  DashIconSep,
  IconDashHome,
  IconDashLogoutNav,
  IconDashPayment,
  IconDashResources,
  IconDashSettings,
  IconDashShop,
} from "../styles/Dashboard";
import { useAuth } from "../../context/AuthProvider";
import { colors } from "../../utils/colors";
import { useExternalAPI } from "../../hooks/useExternalAPI";

const Navigation = ({ navOpen, setNavOpen, page }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { logout, user, navigate } = useAuth();
  const { loginOutUser } = useExternalAPI();
  const [active, setActive] = useState(null);

  useEffect(() => {
    setActive(1);
    window.addEventListener("resize", handleResize);
  }, []);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const onNavigate = (page) => {
    setActive(page);
    if (page === 1) {
      navigate("/dashboard");
    }else{
      navigate("/dashboard/dev")
    }
  };

  return (
    <DashboardNav>
      <DashIcon
        src={require("../../assets/logo-circular.png")}
        alt="icon"
        onClick={() => navigate("/dashboard")}
      />
      <DashIconMenu onClick={() => setNavOpen((open) => !open)} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: colors.primary,
            borderRadius: 15,
            padding: 7,
          }}
        >
          <DashIconSep
            title="Dashboard"
            active={page === "dashboard" ? true : false}
            onClick={() => onNavigate(1)}
          >
            <IconDashHome
              onClick={() => navigate("/dashboard")}
              color={page === "dashboard" ? colors.primary : "white"}
            />
          </DashIconSep>
          <DashIconSep
            title="Shop"
            active={page === "shop" ? true : false}
            onClick={() => onNavigate(2)}
          >
            <IconDashShop
              title="Shop"
              onClick={() => navigate("/dashboard/shop")}
              color={page === "shop" ? colors.primary : "white"}
            />
          </DashIconSep>
          <DashIconSep
            title="Events"
            active={page === "event" ? true: false}
            onClick={() => onNavigate(3)}
          >
            <IconDashResources
              title="Events"
              onClick={() => navigate("/dashboard/events")}
              color={page === "event" ?  colors.primary : "white"}
            />
          </DashIconSep>
          <DashIconSep
            title="Payments"
            active={page === "payment" ? true: false}
            onClick={() => onNavigate(4)}
          >
            <IconDashPayment
              title="Payment"
              onClick={() => navigate("/dashboard/payment")}
              color={page === "payment" ?  colors.primary : "white"}
            />
          </DashIconSep>
          <DashIconSep
            title="Settings"
            active={page === "settings" ? true : false}
            onClick={() => onNavigate(5)}
          >
            <IconDashSettings
              title="Settings"
              onClick={() => navigate("/dashboard/settings")}
              color={page === "settings" ?  colors.primary : "white"}
            />
          </DashIconSep>
        </div>
      </div>
      <IconDashLogoutNav title="Logout" onClick={() => loginOutUser()} />
    </DashboardNav>
  );
};

export default Navigation;
