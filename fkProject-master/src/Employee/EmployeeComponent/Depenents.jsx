import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./employeeStyle.css"

export default function Dependents() {
  let LOCAL_STR="store";
  const navigate = useNavigate()
  let [array,setArray]=useState([])
//   console.log(array)
  let [inputdata, setInputdata]=useState({fullname:"", rel:"", date:"", occ:""})
//   console.log(inputdata)
  let [index, setIndex]=useState(null)
  let [bool, setBool]=useState(false)
  
  function data(e){
    setInputdata({...inputdata,[e.target.name]:e.target.value})
  }

let{fullname,rel,date,occ}=inputdata;
function addinputdata(){
   setArray([...array,{fullname,rel,date,occ}])
   //console.log(inputdata)
   setInputdata({fullname:"", rel:"", date:"", occ:""})
}
//console.log(array,"total array")


//delete row
function deletedata(i){
   console.log(i, "this row want to delete")
   let total=[...array]
   total.splice(i,1)
   setArray(total)
  }

// updating data
function handleUpdate(i){
    console.log(i)
    setIndex(i)
    setBool(true)

}
function updatedata(){
  let {fullname,rel,date,occ}=inputdata
  array[index].fullname=fullname;
  array[index].rel=rel;
  array[index].date=date;
  array[index].occ=occ;
 setBool(false)
 setInputdata({fullname:"", rel:"", date:"", occ:""})
}

// LOCALSTORAGE SEETINGS
useEffect(()=>{
  let retiveData=JSON.parse(localStorage.getItem(LOCAL_STR));
  if(retiveData){
    setArray(retiveData)
  }
},[])

 useEffect(()=>{
  localStorage.setItem(LOCAL_STR,JSON.stringify(array))
 },[array])

 return (
    
<>
<div className=' container-fluid p-3'>
<div className="header">
<button onClick={() => navigate(-1)} className="back-button1">Back</button>
<h3 className='text-left p-3'>Dependents</h3>  
<button type="button" class="add-button btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">+NEW</button>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-dark">
        <h5 class="modal-title text-white" id="exampleModalLabel">Add FamilyInfo Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="fullname" class="col-form-label">Full Name</label>
            <input type="text" name="fullname" value={inputdata.fullname || ""} class="form-control" id="school" onChange={data} />
            <label for="rel" class="col-form-label">Relationship</label>
            <input type="text" name="rel"  value={inputdata.rel || ""} class="form-control" id="degree"  onChange={data}/>
            <label for="date" class="col-form-label">DOB</label>
            <input type="date" name="date"  value={inputdata.date || ""} class="form-control" id="grade"  onChange={data} />
            <label for="occ" class="col-form-label">Occupation</label>
            <input type="text" name="occ" value={inputdata.occ || ""} class="form-control" id="poy"  onChange={data} />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="reset" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
        <button type="submit" onClick={bool?updatedata:addinputdata} class="btn btn-dark">Submit</button>
      </div>
    </div>
  </div>
</div>        
</div>

<div className='container-fluid'>
<div class="table-responsive">
  <table class="table table-bordered">
  <thead className='text-center thead'>
    <tr className='role-table-heading'>
      <th scope="col">Full Name</th>
      <th scope="col">Relationship</th>
      <th scope="col">DOB</th>
      <th scope="col">Occupation</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
    {
      array && array.map( 
        (item,i)=>{
        return(
          <tr key={i}>
            <td>{item.fullname}</td>
            <td>{item.rel}</td>
            <td>{item.date}</td>
            <td>{item.occ}</td>
            <td><button class="btn btn-dark"data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={()=>handleUpdate(i)}>Update</button></td>
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

    </>
    
      )
}