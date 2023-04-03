import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './employeeStyle.css';

export default function Employee() {
  const navigate = useNavigate()
  let [array, setArray] = useState([])
  let [inputdata, setInputdata] = useState({ fname: "", mname: "", lname: "", gender: "", contact: "", date: "", hobbies: "", address: "" })
  let [index, setIndex] = useState()
  let [bolin, setBolin] = useState(false)
  // let [showEdit, setShowEdit] = useState(false);  
  // let [editIndex, setEditIndex] = useState(null);
  let LOCALSTR_KEY="KEY"

  function data(e) {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value })
  }

  useEffect(()=>{
    const list=  JSON.parse(localStorage.getItem(LOCALSTR_KEY));
    if(list){
      setArray(list)
    }
  },[])
  
  useEffect(()=>{
    localStorage.setItem(LOCALSTR_KEY,JSON.stringify(array))
  },[array])



  let { fname, mname, lname, gender, contact, date, hobbies, address } = inputdata;

  function addinputdata() {
    setArray([...array, { fname, mname, lname, gender, contact, date, hobbies, address }])
    //console.log(inputdata)
    setInputdata({ fname: "", mname: "", lname: "", gender: "", contact: "", date: "", hobbies: "", address: "" })
  }

  //console.log(array,"total array")


  //delete row
  function deletedata(i) {
    console.log(i, "this row want to delete")
    let total = [...array]
    total.splice(i, 1)
    setArray(total)
  }
  function handleUpdate(i) {
    setIndex(i)
    setBolin(true)
    setInputdata(array[i])
  }

  // updating data
  function updatedata() {
    array[index] = inputdata
    console.log(array[index])
    setInputdata({ fname: "", mname: "", lname: "", gender: "", contact: "", date: "", hobbies: "", address: "" })
  }


  return (
    <div className='employee-info-main'>
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-button1 ml-3">Back</button>
        <h3 className='text-left p-3'>Employee Personal Details</h3>
        <button type="button" class="add-button btn-dark mr-3" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={() => setBolin(false)}>+NEW</button>
      </div>
      <div className='container-fluid p-3'>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header bg-dark">
                <h5 class="modal-title text-white" id="exampleModalLabel">Add Employee Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="fname" class="col-form-label">Fisrt Name</label>
                    <input type="text" name="fname" value={inputdata.fname || ""} class="form-control" id="fname" onChange={data} />
                    <label for="mname" class="col-form-label">Middle Name</label>
                    <input type="text" name="mname" value={inputdata.mname || ""} class="form-control" id="mname" onChange={data} />
                    <label for="lname" class="col-form-label">Last Name</label>
                    <input type="text" name="lname" value={inputdata.lname || ""} class="form-control" id="lname" onChange={data} />
                    <label for="contact" class="col-form-label">Contact</label>
                    <input type="text" name="contact" value={inputdata.contact || ""} class="form-control" id="contact" onChange={data} />
                    <label for="gender" class="form-label" >Gender</label>
                    <select class="form-select" for="gender" name="gender" value={inputdata.gender || ""} id="gender" onChange={data}>
                      <option selected>select</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    <label for="date" class="col-form-label">DOB</label>
                    <input type="date" name="date" value={inputdata.date || ""} class="form-control" id="date" onChange={data} />
                    <label for="hobbies" class="col-form-label">Hobbies</label>
                    <input type="text" name="hobbies" value={inputdata.hobbies || ""} class="form-control" id="hobbies" onChange={data} />
                    <label for="address" class="col-form-label">Present Address</label>
                    <input type="text" name="address" value={inputdata.address || ""} class="form-control" id="address" onChange={data} />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="reset" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                <button type="submit" onClick={bolin ? updatedata : addinputdata} class="btn btn-dark">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container-fluid'>
        <div class="table-responsive">
          <table class="table ">
            <thead className='text-center'>
              <tr>
                <th scope="col">Fisrt Name</th>
                <th scope="col">Middle Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Contact</th>
                <th scope="col">DOB</th>
                <th scope="col">Hobbies</th>
                <th scope="col">Present Address</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
              {
                array && array.map(
                  (item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.fname}</td>
                        <td>{item.mname}</td>
                        <td>{item.lname}</td>
                        <td>{item.gender}</td>
                        <td>{item.contact}</td>
                        <td>{item.date}</td>
                        <td>{item.hobbies}</td>
                        <td>{item.address}</td>
                        <td><button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={() => handleUpdate(i)}>Update</button></td>
                        <td><button onClick={() => deletedata(i)} class="btn btn-dark">Delete</button></td>
                      </tr>
                    )
                  }
                )
              }

            </thead>
          </table>
        </div>
      </div>

    </div>

  )
}