import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
//import "./style.css";

const TableData = [
  { state: "Alpha" },
  { state: "Cogni" },
  { state: "Apple" },
  { state: "Google"},
  
];

const State = () => {
  const [tableData, setTableData] = useState(TableData);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [state, setState] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  let navigate = useNavigate();

  const handleAdd = () => {
    setState("");
    setShowAdd(true);
  };

  const handleAddSave = () => {
    setTableData([...tableData, { state }]);
    setShowAdd(false);
    Swal.fire("Submitted!",  "success");
  };

  const handleEdit = (index) => {
    setState(tableData[index].state);  
    setEditIndex(index);
    setShowEdit(true);
  };

  const handleEditSave = () => {
    const newData = [...tableData];
    newData[editIndex] = {state};
    setTableData(newData);
    setShowEdit(false);
    Swal.fire("Updated!",  "success")
  };

  const handleDelete = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };


  return (
    <div className="table-container">
      <div className="header">
      <Button onClick={() => navigate(-1)} className="back-button1">Back</Button> 
        <h3 className="text ">State Details</h3>
        <Button className="add-button btn-dark" onClick={handleAdd}>
        <i className="bi bi-plus-lg"></i>Add 
        </Button>
      </div>

      <Table bordered hover size="sm">
        <thead className="thead-light thead">
          <tr className="role-table-heading">
            <th>State</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.state}</td>
              <td className="actions-column">
                <i className="bi bi-pencil-square action-icons" onClick={() => handleEdit(index)}></i>
                <i className="bi bi-trash3-fill action-icons" onClick={() => handleDelete(index)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text">Add New Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-dark" className="btn" onClick={() => setShowAdd(false)}>
            Close
          </Button>
          <Button variant="btn btn-dark" className="btn" onClick={handleAddSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text">Edit Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-dark" className="btn" onClick={() => setShowEdit(false)}>
            Close
          </Button>
          <Button variant="btn btn-dark" className="btn" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default State;