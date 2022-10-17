import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { RiSearchLine } from "react-icons/ri";
import {
  AccessInfo,
  DataListInput,
  FormInput,
} from "../../components/styles/Access";
import {
  DashSearchContainer,
  DashSearchInput,
} from "../../components/styles/Dashboard";
import { GlobalButton } from "../../components/styles/Global";
import {
  PendingFilterContainer,
  PendingSearch,
} from "../../components/styles/PendingRegistrations";
import Select from "react-select";
import { colourStyles } from "../../components/styles/Select2";
import { colors } from "../../utils/colors";
import "../../components/styles/join.css";
import { MultiSelect } from "react-multi-select-component";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import { ClipLoader } from "react-spinners";
import { MdError } from "react-icons/md";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { useRef } from "react";

const VideoCall = () => {
    const [addDues, setAddDues] = useState(false);
    const [type, setType] = useState(null);
    const [group, setGroup] = useState(null);
    const [duesCategory, setDuesCategory] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [studentChapter, setStudentChapter] = useState(null);
    const { getChapter, getFees, setFee } = useExternalAPI();
    const [chapter, setChapter] = useState(null);
    const [isMinAmount, setIsMinAmount] = useState(false);
    const [paycategory, setPaycategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dueData, setDueData] = useState(null);
    const [duesError, setDuesError] = useState(null);
    const [duesLoad, setDuesLoad] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        if (group === "STUDENT") setSelectedChapter(studentChapter);
    }, [group]);

    useEffect(() => {
        console.log(isMinAmount);
    }, [isMinAmount]);

    const search = (e) => {
        e.preventDefault();
    };

    const fetch = async () => {
        setError("");
        setDueData([
            {
                id:"1",
                title:"INTERN-06-06-22-01",
                startat:"01-01-2022",
                endat:"01-03-2022",
                status:"ACTIVE",
                createdby:"Mr. Jones",
            },
            {
                id:"2",
                title:"INTERN-06-06-22-01",
                startat:"01-01-2022",
                endat:"01-03-2022",
                status:"COMPLETED",
                createdby:"Mr. Osei",
            }
        ])
    };


    const request = async (e) => {
        e.preventDefault();
        console.log(e.target[0].name, e.target[0].value);
        console.log("Form: ", e);
        setDuesLoad(false);
    };

  return (
    <div>
        <h4
            style={{
            margin: "15px 0",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
        >
        <AccessInfo style={{ margin: "0 20px 0 0" }}>Schedule New Video Session</AccessInfo>
        {addDues ? null : (
            <GlobalButton
                style={{ height: "max-content" }}
                color="white"
                background={colors.primary}
                onClick={() => setAddDues(true)}
            >
                Add new
            </GlobalButton>
        )}
        </h4>
        
        <AnimateHeight height={addDues ? "auto" : 0}>
            <form
                style={{ fontSize: 14, color: "grey" }}
                onSubmit={(e) => request(e)}
                ref={formRef}
            >

            Guests Email(s) *
            <FormInput
                type="text"
                required
                placeholder="enter emails (separate with comma)"
                hidden={false}
                style={{ marginBottom: 30 }}
                name="internshipcode"
            />

            Video URL *
            <FormInput
                type="text"
                required
                placeholder="enter video url"
                hidden={false}
                style={{ marginBottom: 30 }}
                name="internshipcode"
            />

            Date *
            <FormInput
                type="date"
                name="date1"
                required
                hidden={false}
                style={{ marginBottom: 30 }}
            />

            Start at *
            <FormInput
                type="time"
                name="date1"
                required
                hidden={false}
                style={{ marginBottom: 30 }}
            />

            
            {duesLoad ? (
                <DashSearchContainer
                style={{
                    margin: "10px 0",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid rgba(0, 0, 0, 0.09)",
                }}
                >
                Please wait, adding dues..
                <ClipLoader color={colors.primary} loading={loading} size={15} />
                </DashSearchContainer>
            ) : (
                <span style={{ marginTop: 20, display: "flex" }}>
                <GlobalButton
                    background={colors.primary}
                    color={"white"}
                    style={{
                    margin: 0,
                    marginRight: 20,
                    borderRadius: 5,
                    padding: "10px 20px",
                    width: 100,
                    }}
                    type="button"
                    onClick={() => {
                    formRef.current.reset();
                    setAddDues(false);
                    }}
                >
                    Cancel
                </GlobalButton>
                <GlobalButton
                    background={"green"}
                    color={"white"}
                    style={{
                        margin: 0,
                        borderRadius: 5,
                        padding: "10px 20px",
                        width: 100,
                    }}
                    type="submit"
                >
                    Add
                </GlobalButton>
                </span>
            )}
            </form>
        </AnimateHeight>

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
            <ClipLoader color={colors.primary} loading={true} size={15} />
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
        ) : dueData === [] || dueData === null || dueData.length === 0 ? (
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
            Currently don't have any Internship set ups
            <IoNotificationsCircleSharp color={colors.primary} size={30} />
            </DashSearchContainer>
        ) : (
            <>
            <PendingFilterContainer onSubmit={(e) => search(e)}>
                <PendingSearch>
                    <DashSearchInput
                        placeholder="Enter search text here.."
                        style={{ flex: 1, alignSelf: "center" }}
                    />
                    <GlobalButton
                        background={colors.primary}
                        color={"white"}
                        style={{ margin: 0, borderRadius: 5, padding: "5px 10px" }}
                        type="submit"
                    >
                        <RiSearchLine color={"white"} size={20} />
                    </GlobalButton>
                </PendingSearch>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "max-content",
                    }}
                >
                    <DashSearchContainer
                        style={{
                        alignItems: "center",
                        margin: 0,
                        width: "max-content",
                        marginRight: 5,
                        }}
                    >
                        <DataListInput
                            style={{
                                height: "max-content",
                                width: "max-content",
                                padding: 10,
                                fontSize: 12,
                                border: "none",
                                margin: 0,
                                marginRight: 10,
                            }}
                        >
                            <option value="" disabled selected>sort by</option>
                            <option>Title</option>
                            <option>Date ascending</option>
                            <option>Date descending</option>
                        </DataListInput>
                    </DashSearchContainer>

                    <DashSearchContainer
                        style={{
                        alignItems: "center",
                        margin: 0,
                        width: "max-content",
                        }}
                    >
                        <DataListInput
                        style={{
                            height: "max-content",
                            width: "max-content",
                            padding: 10,
                            fontSize: 12,
                            border: "none",
                            margin: 0,
                            marginRight: 10,
                        }}
                        >
                            <option value="" disabled selected>filter by</option>
                            <option>All</option>
                        </DataListInput>
                    </DashSearchContainer>
                </div>
            </PendingFilterContainer>

            <div
        style={{
          display: "flex",
          color: "black",
          flexDirection: "row",
          flexWrap: "wrap",
          fontSize: 12,
        }}
      >
        <div
          style={{
            width: "max-content",
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: 15,
            padding: 10,
            margin: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 22,
              fontWeight: "bold"
            }}
          >
            <img
              alt="logo"
              src={
                "https://glydetek.com/wp-content/uploads/2021/04/sam-300x400.jpg"
              }
              width={50}
              height={50}
              style={{ marginRight: 10, borderRadius: "50%" }}
            />
            Mr Kojo Owusu Agyei
          </div>
          <p style={{ fontSize: 12, marginTop: 10, marginBottom: 5 }}>
            Time:{" "}
            <span style={{ fontWeight: "bold", fontSize: 15 }}>
              3:00 PM, 14th September, 2022
            </span>
          </p>
          <p style={{ fontSize: 12, marginTop: 10, marginBottom: 5 }}>
            Phone number{" "}
            <span style={{ fontWeight: "bold", fontSize: 15 }}>
              +233 554 644 586
            </span>
          </p>
          <a href="https://meet.google.com/emj-wfwg-enf" target={"_blank"}>
          <GlobalButton
            background={colors.primary}
            color={"white"}
            style={{
              margin: 0,
              borderRadius: 5,
              padding: "10px 20px",
              width: "100%",
              fontSize: 12,
              marginTop: 10,
            }}
            type="button"
            // onClick={() => setViewDialog(true)}
          >
            Join meeting
            <img
              alt="logo"
              src={require("../../../src/assets/meet.jpeg")}
              width={20}
              height={20}
              style={{ marginLeft: 10 }}
            />
          </GlobalButton>
          </a>
        </div>
      </div>

            {/* <ul class="responsive-table">
                <li class="table-header">
                    <div
                        class="col col-d-1"
                        style={{ display: "flex", alignItems: "center" }}
                    >Code</div>
                    <div class="col col-d-2">Start At</div>
                    <div class="col col-d-3">End At</div>
                    <div class="col col-d-4">Status</div>
                </li>
                    
                {dueData.map((data, index) => (
                    <InternshipDurationRow data={data} key={index} fetch={fetch} />
                ))}
            </ul> */}
            </>
        )}
    </div>
  );
};

export default VideoCall;