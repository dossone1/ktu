import React, { useRef, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import { AccessForm, DataListInput, FormInput } from "../styles/Access";
import { GlobalButton } from "../styles/Global";
import { HiArrowNarrowRight } from "react-icons/hi";
import { universities } from "../../utils/universities";
import { DashSearchContainer } from "../styles/Dashboard";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import { useEffect } from "react";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import { colourStyles } from "../styles/Select2";

const Step2 = ({ setStep, setUserInfo }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [typelist, setTypelist] = useState([]);
  const [regions, setRegions] = useState(null);
  const [typeMessage, setTypeMessage] = useState("loading data..");
  const form = useRef();
  const { getSchools, getRegions } = useExternalAPI();

  useEffect(() => {
    fecth();
  }, []);

  const fecth = async () => {
    const request = await getRegions();
    console.log("Fetch: ", request);

    if (request?.success === true) {
      const schools = request?.data.sort((a, b) => a.fullname - b.fullname);
      const data = [];
      schools.forEach((e) => {
        data.push({ label: e.fullname, value: e.shortcode });
      });
      setTypelist(data);
      setTypeMessage("choose");
    }
  };

  const request = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);

    if (regions === null) {
      setError("Region can't be empty.");
      setLoading(false);
      return;
    }

    if (phone === "") {
      setError("Phone can't be empty.");
      setLoading(false);
      return;
    }

    // let code;
    // const index = typelist.findIndex(
    //   (data) => data.fullname === e.target[5].value
    // );
    // code = typelist[index].shortcode || "";

    const userData = {
      title: e.target[0].value,
      gender: e.target[1].value,
      firstname: e.target[2].value,
      othername: e.target[3].value,
      lastname: e.target[4].value,
      region: regions.value,
      // university: type === "Student" ? code : "",
      phonenumber: e.target[6].value,
    };

    // console.log("Form: ", userData)

    setLoading(false);
    setUserInfo((e) => ({
      ...e,
      ...userData,
    }));
    setStep(3);
  };

  return (
    <AccessForm
      key={0}
      onSubmit={(e) => (!false ? request(e) : null)}
      ref={form}
    >
      Select title *
      <DataListInput style={{ marginBottom: 10 }} required>
        <option value="" disabled selected>
          choose title
        </option>
        <option>Mr.</option>
        <option>Mrs.</option>
        <option>Miss</option>
        <option>Dr.</option>
        <option>Prof.</option>
        <option>Alhaji</option>
        <option>Ing</option>
      </DataListInput>
      Sex *
      <DataListInput style={{ marginBottom: 10 }} required>
        <option value="" disabled selected>
          choose gender
        </option>
        <option>Male</option>
        <option>Female</option>
      </DataListInput>
      First name *
      <FormInput
        type="text"
        required
        placeholder="John"
        style={{ marginBottom: 10 }}
      />
      Other names
      <FormInput
        type="text"
        placeholder="(optional)"
        style={{ marginBottom: 10 }}
      />
      Last name *
      <FormInput
        type="text"
        required
        placeholder="Agyei"
        style={{ marginBottom: 10 }}
      />
      Region *
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
        onChange={(e) => setRegions(e)}
      />
      <>
        Your phone *
        <DashSearchContainer
          style={{
            marginTop: 10,
            marginBottom: 15,
            padding: 0,
            border: "0.5px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <PhoneInput
            country={"gh"}
            value={phone}
            dropdownStyle={{ height: 150 }}
            inputStyle={{
              width: "100%",
              outline: "none",
              border: "none",
              outlineColor: colors.primary,
              boxShadow: `none`,
            }}
            containerStyle={{
              outlineColor: colors.primary,
            }}
            onChange={(phone) => setPhone(phone)}
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: false,
            }}
            specialLabel=""
          />
        </DashSearchContainer>
      </>
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

export default Step2;
