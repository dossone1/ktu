import React, { useRef, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import { AccessForm, DataListInput, FormInput } from "../styles/Access";
import { GlobalButton } from "../styles/Global";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useEffect } from "react";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";
import { colourStyles } from "../styles/Select2";
import "../styles/join.css";

const Step2Student = ({ setStep, setUserInfo }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [typelist, setTypelist] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const form = useRef();
  const { getSchools, getChapter } = useExternalAPI();

  useEffect(() => {
    fecth();
  }, []);

  const fecth = async () => {
    if (typelist === null) {
      await getSchools().then((e) => {
        if (e.success) {
          const data = [];
          e.data.forEach((e) => {
            data.push({ label: e.fullname, value: e.shortcode });
          });
          setTypelist(data);
        }
      });
    }

    if (chapter === null) {
      getChapter().then((e) => {
        if (e.success) {
          const data = [];
          // console.log("Chapters: ", e.data)
          e.data.forEach((e) => {
            data.push({ label: e.fullname, value: e.id });
            if(e.fullname === "Students Chapter"){
              setSelectedChapter([{ label: e.fullname, value: e.id }])
            }
          });
          setChapter(data);
        }
      });
    }
  };

  const request = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);

    if (selectedSchool === null) {
      setError("School can't be empty");
      setLoading(false);
      return;
    }

    const chapter = [];
    selectedChapter?.forEach((e) => {
      chapter.push(e.value.toString());
    });

    const userData = {
      university: selectedSchool.value,
      chapter: JSON.stringify(chapter),
      otherstudentdata: JSON.stringify({
        educationlevel: e.target[1].value,
        courselevel: e.target[2].value,
        stundentindex: e.target[3].value,
        gpa: e.target[4].value,
      }),
      otherlawyerdata: JSON.stringify({})
    };

    setUserInfo((e) => ({
      ...e,
      ...userData,
    }));
    setStep(4);
  };

  return (
    <AccessForm
      key={0}
      onSubmit={(e) => (!false ? request(e) : null)}
      ref={form}
    >
      University *
      {/* <DataListInput style={{ marginBottom: 10 }} required>
        <option value="" disabled selected>
          {typeMessage}
        </option>
        {typelist?.map((data, index) => (
          <option key={index}>{data.fullname}</option>
        ))}
      </DataListInput> */}
      <Select
        closeMenuOnSelect={false}
        styles={colourStyles}
        options={typelist}
        onChange={(e) => setSelectedSchool(e)}
      />
      Educational level *
      <DataListInput style={{ marginBottom: 10 }} required>
        <option value="" disabled selected>
          choose level
        </option>
        <option>Diploma</option>
        <option>Higher National Diplomas</option>
        <option>Bachelor's Degree</option>
        <option>Master's Degree</option>
        <option>Doctoral Degree</option>
        <option>Professional</option>
      </DataListInput>
      Course level *
      <DataListInput style={{ marginBottom: 10 }} required>
        <option value="" disabled selected>
          choose level
        </option>
        <option>Level 1</option>
        <option>Level 2</option>
        <option>Level 3</option>
        <option>Level 4</option>
        <option>Professional</option>
      </DataListInput>
      Student Index number *
      <FormInput
        type="text"
        required
        placeholder="input index no"
        style={{ marginBottom: 10 }}
      />
      Current GPA *
      <FormInput
        type="number"
        max={4}
        min={0}
        step="0.01"
        placeholder="input GPA"
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

export default Step2Student;
