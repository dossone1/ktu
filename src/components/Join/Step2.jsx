import React, { useRef, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import { AccessForm, DataListInput, FormInput } from "../styles/Access";
import { HiArrowNarrowRight } from "react-icons/hi";
import { DashSearchContainer } from "../styles/Dashboard";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import { useEffect } from "react";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import { colourStyles } from "../styles/Select2";
import { Form,Button } from "react-bootstrap";
import { Show,ValService } from "../../utils/service";

const Step2 = ({ setStep, setUserInfo }) => {
  
  const {getRegions } = useExternalAPI();

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setStep(3);
  }
  
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
    }
  };


  return (
    <AccessForm
    >
      <Form.Label> title *</Form.Label>
      <Form.Select style={{ marginBottom: 10 }} required>
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
      </Form.Select>
      <Form.Label>
      Sex *</Form.Label>
      <Form.Select style={{ marginBottom: 10 }} required>
        <option value="" disabled selected>
          choose gender
        </option>
        <option>Male</option>
        <option>Female</option>
      </Form.Select>
    <Form.Label>  First name *</Form.Label>
      <Form.Control
        type="text"
        required
        placeholder="John"
        style={{ marginBottom: 10 }}
      />
     <Form.Label> Other names</Form.Label>
     
      <Form.Control
        type="text"
        placeholder="(optional)"
        style={{ marginBottom: 10 }}
      />
     <Form.Label> Last name *</Form.Label>
      <Form.Control
        type="text"
        required
        placeholder="Agyei"
        style={{ marginBottom: 10 }}
      />
      <Form.Label> Position *</Form.Label>
      <Form.Control
        type="text"
        required
        placeholder=""
        style={{ marginBottom: 10 }}
      />
       <Form.Label> Email *</Form.Label>
      <Form.Control
        type="email"
        required
        placeholder=""
        style={{ marginBottom: 10 }}
      />
      
       <Form.Label> Phone Number *</Form.Label>
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
            value={inputs.CustPhone}
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
          
         name="phone"
          inputProps={{
              name: "phone",
              required: true,
              autoFocus: false,
            }}
            specialLabel=""
          />
        </DashSearchContainer>
      
      <Button      
      onClick={handleSubmit}>
         Next{" "}
            <HiArrowNarrowRight
              size={15}
              color="white"
              style={{ marginLeft: 10 }}
            />
        
      </Button>
    </AccessForm>
  );
};

export default Step2;
