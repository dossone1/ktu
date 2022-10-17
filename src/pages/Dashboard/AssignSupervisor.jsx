import React, { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  AccessForm
} from "../../components/styles/Access";
import { GlobalButton, RowDivSpace } from "../../components/styles/Global";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import "../../components/styles/Customcheckbox.css";
import { DuesCheck, DuesDot, DuesTableRow } from "../../components/styles/Dues";
import {
  DashSearchContainer,
  IconDashReceipt,
  IconDashRight,
} from "../../components/styles/Dashboard";
import Step3 from "../../components/PendingDue/Step3";
import { useAuth } from "../../context/AuthProvider";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { Button } from "react-bootstrap";
import { Show } from "../../utils/service";

const AssignSupervisor = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    Show.Success("Request successfully submitted for approval!");
  }

  return (
    <div style={{ marginTop: 20, display: "flex" }}>
     
        <div style={{ flex: 1 }}>
          <h3>
           Industry supervisor assignment
          </h3>
          <div style={{ width: "100%" }}>
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: 5,
                padding: 5,
              }}
            >
              <h4
                style={{
                  marginBottom: 10,
                  fontSize: 14,
                  color: colors.primary,
                }}
              >
               Map supervisor to student below
              </h4>
              
            </div>
         
           
          </div>
         
          <Container fluid="md">
      <Row><Col sm={8}>
          <AccessForm>

<Form.Group>
     <Form.Label>Intern *</Form.Label>
     <Form.Select aria-label="Default select example">
      <option disabled selected>select intern</option>
      <option value="1">Doss Amanor</option>
      <option value="2">Justice Kwaku Adade</option>
    </Form.Select>
    </Form.Group>
    <Form.Group>
      <Form.Label>Supervisor *</Form.Label>
      <Form.Select aria-label="Default select example">
      <option disabled selected>select supervisor</option>
      <option value="1">Yusuf Mohammed</option>
      <option value="2">Isaac Bekoe</option>
      <option value="3">John Kwame</option>
      </Form.Select>
      </Form.Group>
      <br/>
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

export default AssignSupervisor;
