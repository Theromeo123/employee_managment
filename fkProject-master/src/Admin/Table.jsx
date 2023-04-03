import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";

const TableData = [
  { company: "Company A", position: "1" },
  { company: "Company B", position: "2" },
  { company: "Company C", position: "3" },
  { company: "Company F", position: "4" },
  { company: "Company E", position: "5" },
  { company: "Company D", position: "6" },
];

const TableComponent = (props) => {
  const [tableData, setTableData] = useState(TableData);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [editIndex, setEditIndex] = useState(null);


  const handleAdd = () => {
    setCompany("");
    setPosition("");
    setShowAdd(true);
  };

  const handleAddSave = () => {
    setTableData([...tableData, { company, position }]);
    setShowAdd(false);
  };

  const handleEdit = (index) => {
    setCompany(tableData[index].company);
    setPosition(tableData[index].position);
    setEditIndex(index);
    setShowEdit(true);
  };

  const handleEditSave = () => {
    const newData = [...tableData];
    newData[editIndex] = { company, position };
    setTableData(newData);
    setShowEdit(false);
  };

  const handleDelete = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };


  return (
    <div className="table-container">
      <div className="header">
        <h3>{props.title}</h3>
        <Button className="add-button" onClick={handleAdd}>
        <i className="bi bi-plus-lg"></i>Add 
        </Button>
      </div>

      <Table bordered hover size="sm">
        <thead className="thead-light">
          <tr>
            <th>{props.col1}</th>
            <th>{props.col2}</th>
            <th className="actions-column"></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.company}</td>
              <td>{data.position}</td>
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
          <Modal.Title>Add New Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TableComponent