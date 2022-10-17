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
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";

const InternshipRequest = () => {
  const { navigate } = useAuth();

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
                Industry Internship Request <Button   onClick={() => navigate("/dashboard/requestIntern")} className="float-end">Place A Request</Button>
              </h3>
              
              
            </div>
         
           
          </div>
        
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Operating Region</th>
          <th>Branch</th>
          <th>Operating City</th>
          <th>Prefered Course of Study</th>
          <th>No. of Slots</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td>1</td>
        <td>Ashanti</td>
        <td>Manhyia</td>
          <td>Kumasi</td>
          <td>Bachelor of Technology in Entrepreneurship & Finance</td>
          <td>3</td>
          <td> <Button variant="warning">pending</Button></td>
        </tr>
        <tr>
        <td>2</td>
        <td>Ashanti</td>
        <td>Tech Campus</td>
          <td>Kumasi</td>
          <td>Bachelor of Technology in Data Science</td>
          <td>6</td>
          <td> <Button variant="warning">pending</Button></td>
       </tr>
        <tr>
        <td>3</td>
        <td>Greater Accra</td>
        <td>East Legon</td>
          <td>Accra</td>
          <td>Bachelor of Technology in Electrical/Electronic Engineering</td>
          <td>2</td>
          <td> <Button variant="warning">pending</Button></td>
         </tr>
         </tbody>
    </Table>

         
        </div>
      
    </div>
  );
};

export default InternshipRequest;
