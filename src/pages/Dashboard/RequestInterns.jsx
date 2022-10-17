import React, { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import {
  AccessForm,
  DataListInput,
  FormInput,
} from "../../components/styles/Access";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import "../../components/styles/Customcheckbox.css";
import AnimateHeight from "react-animate-height";
import {
  DashSearchContainer,
  IconDashReceipt,
  IconDashRight,
} from "../../components/styles/Dashboard";
import { useAuth } from "../../context/AuthProvider";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { Button,Form,Col,Row,Container } from "react-bootstrap";
import { Show } from "../../utils/service";
import { regions } from "../../utils/regions";
import Select from "react-select";
const RequestInterns = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    Show.Success("Request for Intern successfully sent! Thank you.");
    window.location.reload(false);
  }
  const regionList = [];
  for(var i=0;i<regions.length;i++){
    var itm = {};
    itm.value = regions[i].shortcode;
    itm.label = regions[i].fullname;
     regionList.push(itm); 
  }
  return (
    <div style={{ marginTop: 20, display: "flex" }}>
     
        <div style={{ flex: 1 }}>
         
          <div style={{ width: "100%" }}>
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: 5,
                padding: 5,
              }}
            >
              <h3>
              Request Intern from University
              </h3>
            </div>
          </div>
        
          <Container fluid="md">
      <Row><Col sm={8}>
          <AccessForm>
          <Form.Group className="mb-3">
       <Form.Label> Operating Region *</Form.Label>
       <Select 
        options={regionList}
       /></Form.Group>
   
   <Form.Group className="mb-3">
       <Form.Label>Branch *</Form.Label>
     <Form.Select aria-label="Default select">
      <option disabled> select branch</option>
      <option value="1">Manhyia</option>
      <option value="2">Tech Campus</option>
      <option value="3">East Legon</option>
    </Form.Select>
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Operating City *</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="mb-3">
       <Form.Label>Prefered Course of Study *</Form.Label>
     <Form.Select aria-label="Default select">
      <option disabled> select branch</option>
      <option value='1'> BTech Heating, Ventilation & Air Conditioning Engineering</option>
<option value='2'>Bachelor of Technology in Chemical Engineering</option>
<option value='3'>Bachelor of Technology in Building Technology (Top-Up)</option>
<option value='4'>Bachelor of Technology in Estate Management (Top-up)</option>
<option value='5'>Bachelor of Technology in Entrepreneurship & Finance</option>
<option value='6'>Bachelor of Technology in Electrical/Electronic Engineering (Top-Up)</option>
<option value='7'>Bachelor of Technology in Civil Engineering (Two Years - Top up)</option>
<option value='8'>Bachelor of Technology in Civil Engineering (4 years)</option>
<option value='9'>Bachelor of Technology in Hospitality Managment and Catering Technology</option>
<option value='10'>Bachelor of Technology in Data Science (Regular/Evening)</option>
<option value='11'>Bachelor of Technology in Environmental Statistics</option>
<option value='12'>Bachelor of Technology in Agribusiness with Entrepreneurship</option>
<option value='13'>Bachelor of Technology in Secretaryship and Management</option>
<option value='14'>Bachelor of Technology in Mechanical Engineering</option>
<option value='15'>Bachelor of Technology in Fashion Design and Textiles Studies (Regular/Evening)</option>
<option value='16'>Bachelor of Technology In Accounting With Computing (4 Years)</option>
<option value='17'>Bachelor of Technology in Accounting with Computing (Top Up)</option>
<option value='18'>Bachelor of Technology in Electrical/Electronic Engineering</option>
<option value='19'>Bachelor of Technology in Building Technology</option>
<option value='20'>Bachelor of Technology in Pharmaceutical Sciences</option>
<option value='21'>Bachelor of Technology in Marketing (Regular/Weekend) Top-up</option>
<option value='22'>Bachelor of Technology in Fashion Design And Modeling (Top-up)</option>
<option value='23'>Bachelor of Technology in Health Statistics (Top-Up)</option>
<option value='24'>Bachelor of Technology in Library and Information Science</option>
<option value='25'>Bachelor of Technology in Procurement and Supply Chain Management(Regular/ Evening/Weekend)</option>
    </Form.Select>
    </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>No. of Slots *</Form.Label>
        <Form.Control type="text" name="nos" />
      </Form.Group>
      <Button 
        onClick={handleSubmit}
      >
              Submit Request
          </Button>
    </AccessForm>
    </Col>
      </Row>
    </Container>
         
        </div>
      
    </div>
  );
};

export default RequestInterns;
