import React, { useState } from "react";
import { useEffect } from "react";
import { TbEdit } from "react-icons/tb";
import { useAuth } from "../../context/AuthProvider";
import { colors } from "../../utils/colors";
import {
  ProfileButtonContainer,
  ProfileDataContainer,
  ProfileDataInputContainer,
  ProfileDataTitle,
  ProfileInput,
  ProfileInputSelect,
} from "../styles/Profile";
import Select from "react-select";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import { colourStyles } from "../styles/Select2";
import { CareerCustomWidth } from "../styles/Edit";
import { useLocalStorage } from "../../context/useLocalStorage";

const CareerSection = () => {
  const [edit, setEdit] = useState(false);
  const { user, navigate } = useAuth();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [regions, setRegions] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [province, setProvince] = useState(null);
  const [area, setArea] = useState(null);
  const [selectedPractice, setSelectedPractice] = useState([]);
  const [selectedChamber, setSelectedChamber] = useState([]);
  const [chamber, setChamber] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userdata, setUser] = useLocalStorage("user", null);

  const {
    fullregionname,
    phonenumber,
    region,
    typeofuser,
    fullchapter,
    fullprovice,
    fullareaofp,
    fullchamber,
  } = user;
  const {
    getSchools,
    getRegions,
    getProvince,
    getArea,
    getChapter,
    getChamber,
    chaneProfileData
  } = useExternalAPI();

  useEffect(() => {
    fecth();
  }, []);

  const fecth = async () => {
    const request = await getRegions();
    // console.log("Res: ", request)
    if (request?.success === true) {
      const data = [];
      request?.data?.forEach((e) => {
        // console.log(e)
        data.push({ label: e.fullname, value: e.shortcode });
        if (fullregionname === e.fullname) {
          // console.log(fullregionname ,e.fullname)
          setSelectedRegion({ label: e.fullname, value: e.shortcode });
        }
        setRegions(data);
      });
    }

    if (province === null) {
      getProvince().then((e) => {
        if (e.success) {
          const data = [];
          e.data.forEach((e) => {
            data.push({ label: e.city, value: e.id });
            if (fullprovice.city === e.city) {
              setSelectedProvince({ label: e.city, value: e.id });
            }
          });
          setProvince(data);
        }
      });
    }

    if (area === null) {
      getArea().then((e) => {
        if (e.success) {
          const data = [];
          const selected = [];
          e?.data.forEach((e) => {
            data.push({ label: e.fullname, value: e.id });
            const exist = fullareaofp?.findIndex(
              (x) => x.fullname === e.fullname
            );
            console.log("Exist: ", exist);
            if (exist !== -1) {
              // console.log({ label: e.fullname, value: e.id })
              selected.push({ label: e.fullname, value: e.id });
            }
          });
          console.log("Selected AOP: ", selected);
          setSelectedPractice(selected);
          setArea(data);
        }
      });
    }

    if (chamber === null) {
      getChamber().then((e) => {
        if (e.success) {
          const data = [];
          e.data.forEach((e) => {
            data.push({ label: e.name, value: e.id });
            if (fullchamber.name === e.name) {
              setSelectedChamber({ label: e.name, value: e.id });
            }
          });
          setChamber(data);
        }
      });
    }

    if (chapter === null) {
      getChapter().then((e) => {
        if (e.success) {
          const data = [];
          const selected = [];
          e.data.forEach((e) => {
            data.push({ label: e.fullname, value: e.id });
            const exist = fullchapter?.findIndex(
              (x) => x.fullname === e.fullname
            );
            // console.log("Exist: ", exist);
            if (exist !== -1) {
              // console.log({ label: e.fullname, value: e.id })
              selected.push({ label: e.fullname, value: e.id });
            }
          });
          setSelectedChapter(selected);
          setChapter(data);
        }
      });
    }
  };

  const request = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    if (selectedRegion === null) {
      setError("Region can't be empty");
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
      ...user,
      region: selectedRegion.value,
      chapter: JSON.stringify(chapter),
      chamber: selectedChamber.value.toString(),
      areaofpractice: JSON.stringify(area),
      province: selectedProvince.value,
    };

    // console.log("Data: ", userData);
    await chaneProfileData(userData).then((res) => {
      if (res.success) setUser(userData);
    });

    setEdit(false);
    setLoading(false);
  };

  return (
    <ProfileDataContainer>
      <ProfileDataTitle
        style={{
          display: "flex",
          paddingRight: 5,
          alignItems: "center",
          height: "max-content",
        }}
      >
        Career Information <div style={{ flex: 1 }} />{" "}
        {edit ? null : (
          <ProfileButtonContainer onClick={() => setEdit(true)}>
            <TbEdit size={25} />
          </ProfileButtonContainer>
        )}
      </ProfileDataTitle>
      <div
        style={{
          flex: 0.8,
          fontSize: 14,
          color: "grey",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <form
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
          onSubmit={(e) => request(e)}
        >
          <CareerCustomWidth>
            Region
            <Select
              closeMenuOnSelect={false}
              styles={colourStyles}
              options={regions}
              value={selectedRegion}
              isDisabled={!edit}
              onChange={(e) => setSelectedRegion(e)}
            />
          </CareerCustomWidth>
          <CareerCustomWidth>
            Province / City
            <Select
              closeMenuOnSelect={false}
              styles={colourStyles}
              value={selectedProvince}
              options={province}
              isDisabled={!edit}
              onChange={(e) => setSelectedProvince(e)}
            />
          </CareerCustomWidth>
          <CareerCustomWidth>
            Chapter
            <Select
              closeMenuOnSelect={false}
              // components={animatedComponents}
              isMulti
              styles={colourStyles}
              options={chapter}
              value={selectedChapter}
              isDisabled={!edit}
              onChange={(e) => setSelectedChapter(e)}
            />
          </CareerCustomWidth>
          <CareerCustomWidth>
            Area of practice
            <Select
              closeMenuOnSelect={false}
              // components={animatedComponents}
              isMulti
              styles={colourStyles}
              options={area}
              value={selectedPractice}
              isDisabled={!edit}
              onChange={(e) => setSelectedPractice(e)}
            />
          </CareerCustomWidth>
          {/* Area of Practice
        <ProfileInputSelect
          placeholder="Enter Area"
          disabled={!edit}
          // onChange={(e) => setUserEmail(e.target.value)}
        >
          <option value="Area A" selected>
            Area A
          </option>
          <option>Area B</option>
        </ProfileInputSelect> */}
          <CareerCustomWidth>
            Legal dpt. / Chamber name
            <Select
              closeMenuOnSelect={false}
              styles={colourStyles}
              options={chamber}
              value={selectedChamber}
              isDisabled={!edit}
              onChange={(e) => setSelectedChamber(e)}
            />
          </CareerCustomWidth>
        {edit ? (
          <>
            <p style={{ fontSize: 12, color: "red", marginTop: 5 }}>{error}</p>
            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => setEdit(false)}
                style={{
                  fontSize: 14,
                  color: colors.primary,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  marginBottom: 20,
                }}
                type="button"
              >
                cancel
              </button>
              <button
                // onClick={() => setEdit(false)}
                style={{
                  fontSize: 14,
                  color: "#5CA275",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  marginLeft: 20,
                }}
                type="submit"
              >
                save
              </button>
            </div>
          </>
        ) : null}
        </form>
      </div>
    </ProfileDataContainer>
  );
};

export default CareerSection;
