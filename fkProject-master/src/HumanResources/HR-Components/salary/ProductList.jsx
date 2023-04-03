import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";


const ProductList = () => {
  const [tableData, setTableData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [salary, setSalary] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [holder, setHolder] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [tax, setTax] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  let navigate = useNavigate();

   //add new entry
  const handleAdd = () => {
    setSalary("");
    setBank("");
    setAccount("");
    setHolder("");
    setIfsc("");
    setTax("");
    setShowAdd(true);
  };



  const handleAddSave = async ()=>{
    const response = await fetch("http://localhost:4000/api/hr/salary/",{
      method: "POST",
      body: JSON.stringify({salary,bank, account, holder, ifsc, tax}),
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await response.json()
    setTableData([]);
    setShowAdd(false);
    if(response.ok){
      console.log("New entry added")
    }else{
      console.log(response.error)
    }
    Swal.fire("Added!",  "success")
  }

 //delete an entry
 const handleDelete = async (id) =>{
  const response = await fetch("http://localhost:4000/api/hr/salary/"+id,{
    method:"DELETE"
  })

  if(response.ok){
    console.log("Entry deleted successfully")
  }else{
      console.log(response.error)
  }
  Swal.fire("Deleted!",  "success")
}

 //edit an entry
 const handleEdit = (id,index) =>{
      setSalary(tableData[index].salary);
      setBank(tableData[index].bank);
      setAccount(tableData[index].account);
      setHolder(tableData[index].holder);
      setIfsc(tableData[index].ifsc);
      setTax(tableData[index].tax);
      setEditIndex(id)
      setShowEdit(true)
}

//handle edit save
const handleEditSave = async ()=>{
  const response = await fetch("http://localhost:4000/api/hr/salary/"+editIndex,{
    method: "PATCH",
    body: JSON.stringify({salary,bank, account, holder, ifsc, tax}),
    headers: {
      "content-type": "application/json"
    }
    
  })
  
  const data = await response.json()
  setTableData([]);
  setShowEdit(false);
  if(response.ok){
    console.log("Entry edited")
  }else{
    console.log(response.error)
  }
  Swal.fire("Updated!",  "success")
}
 //initial data loading from the databse
 useEffect(()=>{
  const fetchData = async () =>{
    const response = await fetch("http://localhost:4000/api/hr/salary/")
    const data = await response.json()

    if(response.ok){
      setTableData(data)
    }
  }
  fetchData()
},[tableData])

 
  return (
    <div className="table-container">
      <div className="header">
      <Button onClick={() => navigate(-1)} className="bi bi-skip-backward-fill add-button btn-dark"></Button> 
        <h3 className="text">Salary Details</h3>
        <Button className="add-button btn-dark" onClick={handleAdd}>
        <i class="bi bi-database-add"></i>Add 
        </Button>
      </div>

      <Table bordered hover size="sm">
        <thead className="thead-light thead">
          <tr className="role-table-heading ">
              <th>Salary</th>
              <th>Bank Name</th>
             <th>Account No</th>
             <th>Holder Name</th>
            <th>IFSC Code</th>
            <th>Tax</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
               <td>{data.salary}</td>
               <td>{data.bank}</td>
               <td>{data.account}</td>
               <td>{data.holder}</td>
               <td>{data.ifsc}</td>
               <td>{data.tax}</td>
              <td className="actions-column">
                <i className="bi bi-pencil action-icons" onClick={() => handleEdit(data._id,index)}></i>
                <i className="bi bi-person-x-fill action-icons" onClick={() => handleDelete(data._id)}></i>
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
               <Form.Label>Salary</Form.Label>
               <Form.Control
                value={salary}
                onChange={(e) => setSalary(e.target.value)}               />
             </Form.Group>

             <Form.Group>
               <Form.Label>Bank Name</Form.Label>
               <Form.Control
                value={bank}
                onChange={(e) =>setBank(e.target.value)}
              />
            </Form.Group>
             <Form.Group>
               <Form.Label>Account No</Form.Label>
               <Form.Control
                value={account}
                onChange={(e) =>setAccount(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Holder Name</Form.Label>
              <Form.Control
                value={holder}
                onChange={(e) =>setHolder(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>IFSC Code</Form.Label>
              <Form.Control
                value={ifsc}
                onChange={(e) =>setIfsc(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Tax</Form.Label>
              <Form.Control
                value={tax}
                onChange={(e) =>setTax(e.target.value)}
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
          <Modal.Title className="text">Edit Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group>
              <Form.Label>Salary</Form.Label>
              <Form.Control
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                value={bank}
                onChange={(e) =>setBank(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Account No</Form.Label>
              <Form.Control
                value={account}
                onChange={(e) =>setAccount(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Holder Name</Form.Label>
              <Form.Control
                value={holder}
                onChange={(e) =>setHolder(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>IFSC Code</Form.Label>
              <Form.Control
                value={ifsc}
                onChange={(e) =>setIfsc(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Tax</Form.Label>
              <Form.Control
                value={tax}
                onChange={(e) =>setTax(e.target.value)}
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

export default ProductList;

  