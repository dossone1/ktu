import React, { useEffect, useState } from "react";
import {
  HomeCardContainer,
  HomeCardContainerLong,
  HomeCardContainerLong2,
  HomeCardContainerLong3,
  HomeContainer,
  HomeSectionContainer,
  HomedoubleDivContainer,
} from "../../components/styles/Home";
import { TbUsers } from "react-icons/tb";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { colors } from "../../utils/colors";
import { MdError, MdOutlineVerifiedUser } from "react-icons/md";
import { VscError, VscGraphLeft } from "react-icons/vsc";
import { FaUserGraduate } from "react-icons/fa";
import { Chart } from "react-google-charts";
import ChatrtsGraph from "../../components/Dashboard/ChatrtsGraph";
import dateFormat from "dateformat";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import { DashSearchContainer } from "../../components/styles/Dashboard";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../../context/AuthProvider";

const Home = () => {
  const [rate, setRate] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sumTrans, setTrans] = useState({})
  const { getDashboardData, fetchTransactions } = useExternalAPI();
  const { navigate } = useAuth();

  const genRand = (min, max, decimalPlaces) => {
    var rand =
      Math.random() < 0.5
        ? (1 - Math.random()) * (max - min) + min
        : Math.random() * (max - min) + min; // could be min or max or anything in between
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
  };

  const round = (num) => {
    return Math.round(num * 100) / 100;
  };

  useEffect(() => {
    const randomNum = genRand(0, 1, 2);
    setRate(randomNum);

    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, success, message } = await getDashboardData();
    console.log("Data: ", data);

    if (success) {
      setData(data);
      fetchTransactions().then((res) => {
        if (res.success) {
          setTrans(res.data)
        }
      });
    } else {
      setError(message || "An error occured!, try again later");
    }
    setLoading(false);
  };

  return loading ? (
    <DashSearchContainer
      style={{
        margin: "10px 0",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid rgba(0, 0, 0, 0.09)",
      }}
    >
      Loading..
      <ClipLoader color={colors.primary} loading={loading} size={15} />
    </DashSearchContainer>
  ) : error !== "" ? (
    <DashSearchContainer
      style={{
        margin: "10px 0",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#E6505C",
        border: "none",
        color: "white",
      }}
    >
      {error}
      <MdError color={"white"} size={20} />
    </DashSearchContainer>
  ) : (
    <>
      <HomeContainer>
        {loading ? (
          <DashSearchContainer
            style={{
              margin: "10px 0",
              padding: 10,
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid rgba(0, 0, 0, 0.09)",
            }}
          >
            Loading..
            <ClipLoader color={colors.primary} loading={loading} size={15} />
          </DashSearchContainer>
        ) : null}
        {error !== "" ? (
          <DashSearchContainer
            style={{
              margin: "10px 0",
              padding: 10,
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#E6505C",
              border: "none",
              color: "white",
            }}
          >
            {error}
            <MdError color={"white"} size={20} />
          </DashSearchContainer>
        ) : null}
        <HomeSectionContainer>
          <HomeCardContainer>
            <span
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <div>
                <p
                  style={{
                    color: "grey",
                    fontSize: 12,
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                >
                 Internship Requests
                </p>
                <TbUsers size={30} />
              </div>
              <div style={{ width: 50, height: 50 }}>
                <CircularProgressbar
                  value={3 }
                  si
                  text={`${
                    round(3 ) || 0
                  }%`}
                  styles={{
                    path: {
                      // Path color
                      stroke: colors.primary,
                    },
                    text: {
                      // Text color
                      fill: "black",
                      // Text size
                      fontSize: "16px",
                    },
                  }}
                />
              </div>
            </span>
            <h2>
              3
            </h2>
            <p
              style={{
                color: "grey",
                fontSize: 10,
              }}
            >
             pending internship requests
            </p>
          </HomeCardContainer>
          <HomeCardContainerLong>
            <HomeCardContainerLong2>
              <HomeCardContainerLong3
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/dashboard/pendingregistration")}
              >
                <span
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "grey",
                        fontSize: 12,
                        marginRight: 10,
                        marginBottom: 10,
                      }}
                    >
                     Ongoing Internship
                    </p>
                    <MdOutlineVerifiedUser size={30} />
                  </div>
                  <div style={{ width: 50, height: 50 }}>
                    <CircularProgressbar
                      value={
                        (data?.pendingusers /
                          (data?.approvedusers + data?.pendingusers)) *
                          100 || 0
                      }
                      si
                      text={`${
                        round(
                          (data?.pendingusers /
                            (data?.approvedusers + data?.pendingusers)) *
                            100
                        ) || 0
                      }%`}
                      styles={{
                        path: {
                          // Path color
                          stroke: colors.primary,
                        },
                        text: {
                          // Text color
                          fill: "black",
                          // Text size
                          fontSize: "16px",
                        },
                      }}
                    />
                  </div>
                </span>
                <h2>2</h2>
                <p
                  style={{
                    color: "grey",
                    fontSize: 10,
                  }}
                >
                 admitted Interns
                </p>
              </HomeCardContainerLong3>
            </HomeCardContainerLong2>
          </HomeCardContainerLong>
        </HomeSectionContainer>
        <HomeSectionContainer>
          <HomeCardContainer>
            <span
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <div>
                <p
                  style={{
                    color: "grey",
                    fontSize: 12,
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                >
                 Interns To-Date
                </p>
                <TbUsers size={30} />
              </div>
              <div style={{ width: 50, height: 50 }}>
                <CircularProgressbar
                  value={0}
                  si
                  text={`${
                    round(
                      (data?.rejectedusers /
                        (data?.approvedusers +
                          data?.pendingusers +
                          data?.rejectedusers)) *
                        100
                    ) || 0
                  }%`}
                  styles={{
                    path: {
                      // Path color
                      stroke: colors.primary,
                    },
                    text: {
                      // Text color
                      fill: "black",
                      // Text size
                      fontSize: "16px",
                    },
                  }}
                />
              </div>
            </span>
            <h2>21</h2>
            <p
              style={{
                color: "grey",
                fontSize: 10,
              }}
            >
             Total interns Year To Date
            </p>
          </HomeCardContainer>
          <HomeCardContainer   onClick={() => navigate("/dashboard/videoCall")}>
            <span
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <div>
                <p
                  style={{
                    color: "grey",
                    fontSize: 12,
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                >
                 Pending Video Calls
                </p>
                <FaUserGraduate size={30} />
              </div>
              <div style={{ width: 50, height: 50 }}>
                <CircularProgressbar
                  value={
                    (data?.approvedstudents /
                      (data?.approvedstudents + data?.pendingstudents)) *
                      100 || 0
                  }
                  si
                  text={`${
                  1
                  }%`}
                  styles={{
                    path: {
                      // Path color
                      stroke: colors.primary,
                    },
                    text: {
                      // Text color
                      fill: "black",
                      // Text size
                      fontSize: "16px",
                    },
                  }}
                />
              </div>
            </span>
            <h2>
             1
            </h2>
            <p
              style={{
                color: "grey",
                fontSize: 10,
              }}
            >
              Interactions
            </p>
          </HomeCardContainer>
        </HomeSectionContainer>
        <HomeSectionContainer>
          <HomeCardContainer
            style={{
              background: colors.primary,
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <GaugeChart
              id="gauge-chart5"
              nrOfLevels={100}
              arcsLength={[0.25, 0.25, 0.25, 0.25]}
              colors={["white", "grey", "yellow", "green"]}
              needleBaseColor={colors.ivory_dark}
              textColor={"white"}
              needleColor={"black"}
              percent={rate}
              arcPadding={0.02}
            /> */}
            <Chart
              chartType="PieChart"
              data={[
                ["Payments", "Per amount"],
                ["Mobile money", sumTrans?.momo?.totalPaidTransaction],
                ["Bank deposit", sumTrans?.bank?.totalPaidTransaction],
              ]}
              options={{
                title: "",
                backgroundColor: "transparent",
                legend: "none",
                width: "100%",
                height: "100px",
                chartArea: { width: "100%", height: "100%" },
              }}
              style={{ background: "transparent" }}
            />

            <VscGraphLeft size={40} style={{ marginTop: 25 }} />
            <p
              style={{
                fontSize: 12,
                marginRight: 10,
                marginBottom: 25,
              }}
            >
             Attendance
            </p>
            <h2>1/2</h2>
            <p
              style={{
                fontSize: 10,
              }}
            >
              Reported Interns/Total Interns
            </p>
          </HomeCardContainer>
          <HomedoubleDivContainer>
            <HomeCardContainer
              style={{ width: "100%", marginBottom: 10, height: "100%" }}
            >
              <span
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                  overflow: "hidden",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "grey",
                      fontSize: 12,
                      marginRight: 10,
                      marginBottom: 10,
                    }}
                  >
                    Clocked In
                  </p>
                  <h1 style={{fontSize: 20}}>1</h1>
                </div>
                <div
                  style={{
                    padding: "10px 15px",
                    borderRadius: 10,
                    backgroundColor: "#4065C5",
                    color: "white",
                  }}
                >
                  50%
                </div>
              </span>
            </HomeCardContainer>
            <HomeCardContainer style={{ width: "100%" }}>
              <span
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                  overflow: "hidden",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "grey",
                      fontSize: 12,
                      marginRight: 10,
                      marginBottom: 10,
                    }}
                  >
                   Absent
                  </p>
                  <h1 style={{fontSize: 20}}>1</h1>
                </div>
                <div
                  style={{
                    padding: "10px 15px",
                    borderRadius: 10,
                    backgroundColor: "#4065C5",
                    color: "white",
                  }}
                >
                50%
                </div>
              </span>
            </HomeCardContainer>
          </HomedoubleDivContainer>
        </HomeSectionContainer>
        <HomeSectionContainer>
          <HomeCardContainer
            style={{
              width: "100%",
              height: "max-content",
              position: "relative",
            }}
          >
            <ChatrtsGraph />
          </HomeCardContainer>
        </HomeSectionContainer>
      </HomeContainer>
      <div style={{ flex: 1, width: "100%" }} />
      <HomeCardContainer
        style={{
          width: "100%",
          height: "max-content",
          position: "relative",
          marginTop: 20,
          borderRadius: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            color: "grey",
            fontSize: 12,
            marginRight: 10,
          }}
        >
          Reports
        </p>
        <p
          style={{
            color: "grey",
            fontSize: 12,
            marginRight: 10,
          }}
        >
          {dateFormat(Date.now(), "h:MM TT")}
        </p>
        <p
          style={{
            color: "grey",
            fontSize: 12,
            marginRight: 10,
          }}
        >
          Completed
        </p>
      </HomeCardContainer>
    </>
  );
};

export default Home;
