import React, { useRef, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import { AccessForm, DataListInput, FormInput } from "../styles/Access";
import { GlobalButton } from "../styles/Global";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useEffect } from "react";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";
import "../styles/join.css";
import makeAnimated from "react-select/animated";
import { colourStyles } from "../styles/Select2";
import gh from "../../utils/gh.json";

const animatedComponents = makeAnimated();

const Step2Lawyer = ({ setStep, setUserInfo }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [yearList, setYearList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedChamber, setSelectedChamber] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [province, setProvince] = useState(null);
  const [area, setArea] = useState(null);
  const [chamber, setChamber] = useState(null);
  const [chapter, setChapter] = useState(null);
  const form = useRef();
  const { getArea, getChamber, getChapter, getProvince } = useExternalAPI();

  useEffect(() => {
    fecth();
    years();
  }, []);

  const years = () => {
    setYearList([]);

    for (let i = 0; i <= 100; i++) {
      setYearList((years) => [
        ...years,
        {
          label: new Date().getFullYear() - i,
          value: new Date().getFullYear() - i,
        },
      ]);
    }

    // console.log("List: ", yearList);
  };

  const fecth = async (data) => {
    if (province === null) {
      getProvince().then((e) => {
        if (e.success) {
          const data = [];
          e.data.forEach((e) => {
            data.push({ label: e.city, value: e.id });
          });
          setProvince(data);
        }
      });
    }

    if (chapter === null) {
      getChapter().then((e) => {
        if (e.success) {
          const data = [];
          e.data.forEach((e) => {
            data.push({ label: e.fullname, value: e.id });
          });
          setChapter(data);
        }
      });
    }

    if (chamber === null) {
      getChamber().then((e) => {
        if (e.success) {
          const data = [];
          e.data.forEach((e) => {
            data.push({ label: e.name, value: e.id });
          });
          setChamber(data);
        }
      });
    }

    if (area === null) {
      getArea().then((e) => {
        if (e.success) {
          const data = [];
          e.data.forEach((e) => {
            data.push({ label: e.fullname, value: e.id });
          });
          setArea(data);
        }
      });
    }

    if (chamber === null || chapter === null || area === null) {
      // fecth();
    }
  };

  const request = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);

    if (selectedYear === null) {
      setError("Year of call can't be empty");
      setLoading(false);
      return;
    }

    if (selectedChamber === null) {
      setError("Chamber can't be empty");
      setLoading(false);
      return;
    }

    if (selectedChapter === null) {
      setError("Chapter can't be empty");
      setLoading(false);
      return;
    }

    if (selectedPractice === null) {
      setError("Area of practice can't be empty");
      setLoading(false);
      return;
    }

    if (selectedProvince === null) {
      setError("Province can't be empty");
      setLoading(false);
      return;
    }

    const chapter = [];
    selectedChapter.forEach((e) => {
      chapter.push(e.value.toString());
    });

    const area = [];
    selectedPractice.forEach((e) => {
      area.push(e.value.toString());
    });

    const userData = {
      yearofcall: selectedYear.value.toString(),
      certificatenumber: e.target[5].value,
      chapter: JSON.stringify(chapter),
      chamber: selectedChamber.value.toString(),
      areaofpractice: JSON.stringify(area),
      province: selectedProvince.value,
      otherstudentdata: JSON.stringify({}),
      otherlawyerdata: JSON.stringify({})
    };

    console.log("Form: ", userData);

    setLoading(false);

    // let code;
    // const index = typelist.findIndex(
    //   (data) => data.fullname === e.target[5].value
    // );
    // code = typelist[index].shortcode || "";

    // const userData = {
    //   title: e.target[0].value,
    //   gender: e.target[1].value,
    //   firstname: e.target[2].value,
    //   othername: e.target[3].value,
    //   lastname: e.target[4].value,
    //   phonenumber: e.target[6].value,
    // };

    setUserInfo((e) => ({
      ...e,
      ...userData,
    }));
    setStep(4);
  };

  return (
    <AccessForm
      key={0}
      style={{ overflow: "overlay" }}
      onSubmit={(e) => (!false ? request(e) : null)}
      ref={form}
    >
      Year of call *
      <Select
        closeMenuOnSelect={false}
        styles={colourStyles}
        options={yearList}
        onChange={(e) => setSelectedYear(e)}
      />
      Province / City *
      <Select
        closeMenuOnSelect={false}
        styles={colourStyles}
        options={province}
        onChange={(e) => setSelectedProvince(e)}
      />
      Chapter *
      {/* <MultiSelect
        options={chapters}
        value={selectedChapter}
        onChange={setSelectedChapter}
        className="rmsc"
        labelledBy="Select"
      /> */}
      <Select
        closeMenuOnSelect={false}
        // components={animatedComponents}
        isMulti
        styles={colourStyles}
        options={chapter}
        onChange={(e) => setSelectedChapter(e)}
      />
      Chamber *
      <Select
        closeMenuOnSelect={false}
        styles={colourStyles}
        options={chamber}
        onChange={(e) => setSelectedChamber(e)}
      />
      Area of practice *
      <Select
        closeMenuOnSelect={false}
        // components={animatedComponents}
        isMulti
        styles={colourStyles}
        options={area}
        onChange={(e) => setSelectedPractice(e)}
      />
      {/* Legal department / Chamber name
      <FormInput
        type="text"
        placeholder="input name"
        style={{ marginBottom: 10 }}
      /> */}
      Certificate number (optional)
      <FormInput
        type="text"
        placeholder="input number"
        style={{ marginBottom: 10 }}
      />
      <p style={{ fontSize: 12, color: "red", marginTop: 5 }}>{error}</p>
      <GlobalButton
        background={colors.primary}
        color="white"
        border={colors.primary}
        style={{ marginTop: 25 }}
        //   onClick={() => setOn((on) => (on++ === 3 ? 1 : on++))}
        type="submit"
      >
        {loading ? (
          <span style={{ padding: 10, marginTop: -10, marginBottom: 7 }}>
            <PropagateLoader color={"white"} loading={loading} size={15} />
          </span>
        ) : (
          <>
            Next{" "}
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
export default Step2Lawyer;
