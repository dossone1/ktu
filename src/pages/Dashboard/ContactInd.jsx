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

const ContactInd = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    Show.Success("Request successfully sent! Thank you.");
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
               Contact Industry Supervisor
              </h3>
              
            </div>
         
           
          </div>
        
          <Container fluid="md">
      <Row><Col sm={8}>
          <AccessForm>

     <Form.Label>Supervisor *</Form.Label>
     <Form.Select aria-label="Default select example">
      <option disabled> select supervisor</option>
      <option value="1">Laison Office</option>
      <option value="2">Administration</option>
    </Form.Select>
      
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Message *</Form.Label>
        <Form.Control as="textarea" rows={3} />
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

export default ContactInd;
