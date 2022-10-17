import React, { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PropagateLoader } from "react-spinners";
import { colors } from "../../utils/colors";
import {
  AccessForm,
  DataListInput,
  FormInput,
} from "../../components/styles/Access";
import { GlobalButton, RowDivSpace } from "../../components/styles/Global";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useExternalAPI } from "../../hooks/useExternalAPI";
import "../../components/styles/Customcheckbox.css";
import { DuesCheck, DuesDot, DuesTableRow } from "../../components/styles/Dues";
import AnimateHeight from "react-animate-height";
import {
  DashSearchContainer,
  IconDashReceipt,
  IconDashRight,
} from "../../components/styles/Dashboard";
import { useAuth } from "../../context/AuthProvider";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { Card, Dropdown, Table } from "react-bootstrap";

const VOInternship = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payingList, setPayingList] = useState([
    {
      id: 1,
      amount: 240,
    },
  ]);
  const [total, setTotal] = useState(0);
  const [drop, setDrop] = useState(false);
  const [payView, setPayView] = useState(false);
 
  useEffect(() => {
    let total = [];
    payingList.forEach(({ amount }) => total.push(amount));
    total = total === [] ? 0 : total.reduce((a, b) => a + b, 0);
    setTotal(total);
  }, [payingList]);

  return (
    <div style={{ marginTop: 20, display: "flex" }}>
     
        <div style={{ flex: 1 }}>
         
        <h3>Ongoing Internships</h3>
           <Card>
            <Card.Body>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th> Student Name</th>
          <th>Contact</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td>1</td>
        <td>Doss Amanor</td>
        <td>0265729429</td>
          <td> IT Department</td>
          <td>
            <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       Action
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">Assign to Supervisor</Dropdown.Item>
        <Dropdown.Item href="#">Assign to Department</Dropdown.Item>
        <Dropdown.Item href="#">View Internship Progress</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </td>
        </tr>
        <tr>
        <td>2</td>
        <td> Justice Adade Noah</td>
        <td>0501419780</td>
          <td> Electrical Works</td>
          <td> <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       Action
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">Assign to Supervisor</Dropdown.Item>
        <Dropdown.Item href="#">Assign to Department</Dropdown.Item>
        <Dropdown.Item href="#">View Internship Progress</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown></td>
        </tr>
      
         </tbody>
    </Table>
    </Card.Body>
    </Card>
        </div>
            
    </div>
  );
};

export default VOInternship;
