import React, { useRef, useState } from "react";
import { colors } from "../../utils/colors";
import { AccessForm, DataListInput, FormInput } from "../styles/Access";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import PhoneInput from "react-phone-input-2";
import { DashSearchContainer } from "../../components/styles/Dashboard";
import { Form,Button } from "react-bootstrap";
import { Show,ValService } from "../../utils/service";
import { regions } from "../../utils/regions";
import Select from 'react-select'

const Step00 = ({setStep, setType }) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSelect = (val) => {
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setStep(2);
  }
  const regionList = [];
  for(var i=0;i<regions.length;i++){
    var itm = {};
    itm.value = regions[i].shortcode;
    itm.label = regions[i].fullname;
     regionList.push(itm); 
  }

  return (
    <AccessForm>
    <Form.Label> Name of Institution *</Form.Label>
      <Form.Control
        type="text"
        required
        placeholder="Company name"
        name="InstName"
        value={inputs.InstName || ""} 
        onChange={handleChange}
        hidden={false}
      />
      <br/>
       <Form.Label> Type of Institution *</Form.Label>
       <Form.Select>
      <option disabled selected>select institution type</option>
      <option value="1">Sole Proprietorshp</option>
      <option value="2">Limited Liability company</option>
      <option value="3">NGO/Foundation</option>
      <option value="4">MMDA'S</option>
      <option value="5">Religious Organization</option>
      <option value="6">Diplomatic Missions</option>
      <option value="7">Partnerships</option>
       </Form.Select>
    <br/>
       <Form.Label> Industry *</Form.Label>
       <Form.Select 
         name="Industry"
         value={inputs.Industry} 
         onChange={handleChange}
       >
      <option disabled selected>select industry</option>
      <option value='1'>Aerospace Industry</option>
<option value='2'>Agriculture; plantations;other rural sectors </option>
<option value='3'>Basic Metal Production </option>
<option value='4'>Chemical industries </option>
<option value='5'>Commerce </option>
<option value='6'>Construction </option>
<option value='7'>Education </option>
<option value='8'>Entertainment Industry</option>
<option value='9'>Financial services; professional services </option>
<option value='10'>Food; drink; tobacco </option>
<option value='11'>Forestry; wood; pulp and paper </option>
<option value='12'>Health services </option>
<option value='13'>Hotels; tourism; catering </option>
<option value='14'>Information Technology (IT) Industry</option>
<option value='15'>Mining (coal; other mining) </option>
<option value='16'>Mechanical and electrical engineering </option>
<option value='17'>Media; culture; graphical </option>
<option value='18'>New Media Industry</option>
<option value='19'>Oil and gas production; oil refining </option>
<option value='20'>Postal and telecommunications services </option>
<option value='21'>Public service </option>
<option value='22'>Shipping; ports; fisheries; inland waterways </option>
<option value='23'>Textiles; clothing; leather; footwear </option>
<option value='24'>Transport (including civil aviation; railways; road transport) </option>
<option value='25'>Transport equipment manufacturing </option>
<option value='26'>Utilities (water; gas; electricity) </option>
    </Form.Select>
    <br/>
       <Form.Label> Country *</Form.Label>
       <Form.Select  
       name="Industry"
         value={inputs.Country} 
         onChange={handleChange}
         >
      <option value="">select country</option>
      <option value="1">Ghana</option>
      <option value="2">Nigeria</option>
      <option value="3">Togo</option>
    </Form.Select>
    <Form.Group>
       <Form.Label> Region *</Form.Label>
       <Select 
       onChange={handleSelect}
        options={regionList}
       /></Form.Group>
    <Form.Label> City *</Form.Label>
      <Form.Control
        type="text"
        required
        placeholder="Enter City"
        name="City"
        value={inputs.City} 
        onChange={handleChange}
      />
      <br/>
      <Form.Label> Street Name *</Form.Label>
      <Form.Control
        type="text"
        required
        placeholder="Enter Street Name"
        name="Street"
        value={inputs.Street} 
        onChange={handleChange}
      />
        <br/>
      <Form.Label> Digital Address *</Form.Label>
      <Form.Control
        type="text"
        required
        placeholder="Enter Digital Address"
        name="Digital"
        value={inputs.Digital} 
        onChange={handleChange}
      />

     <div
        style={{
          display: "flex",
          fontWeight: "200",
          margin: "25px 0px",
          alignItems: "center",
        }}
      >
        <input type={"checkbox"} required style={{ marginRight: 10 }} /> I
        accept{" "}
        <a
          href={require("../../utils/docs/privacy.pdf")}
          target="_blank"
          style={{ color: "black", marginLeft: 5 }}
        >
          Privacy Policy
        </a>
        ,
        <a href={require("../../utils/docs/terms.pdf")}
          target="_blank" style={{ color: "black", marginLeft: 5 }}>
          Terms and Conditions
        </a>
      </div>
      <Button
        background={colors.primary}
        color="white"
        border={colors.primary}
       onClick={handleSubmit}
      >
       
          <>
            Continue{" "}
            <HiArrowNarrowRight
              size={15}
              color="white"
              style={{ marginLeft: 10 }}
            />
          </>
      </Button>
    </AccessForm>
  );
};

export default Step00;
