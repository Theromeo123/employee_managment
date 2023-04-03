import React,{useState,useEffect } from 'react'
import {Button,Form} from 'react-bootstrap';
import {Link,useNavigate} from 'react-router-dom';
import Employee from './role';


function Edit() {
    const[company,setName]=useState('');
    const[role,setRole]=useState('');
    const[id,setId]=useState('');
      
        var index = Employee.map(function(e){
            return e.id
          }).indexOf(id);
          let history= useNavigate();
          const handleUpdate=(e)=>{
            e.preventDefault();
            let a = Employee[index];
            a.company = company;
            a.role = role;
            history('/portal_master');
            
    }

    useEffect(()=>{
        setName(localStorage.getItem('company'))
        setRole(localStorage.getItem('role'))
        setId(localStorage.getItem('id'))
    },[])
  return (
    <div>
        <Form className="d-grid gap-2" style={{marginTop:"7em",marginLeft:"50px"}}>
            <Form.Group>
            <input class="form-control" type="text" placeholder='Portal Name'
              value={company} required onChange={(e)=>setName(e.target.value)}/><br/>
             <input class="form-control" type="text"placeholder='Status' 
              value={role} required onChange={(e)=>setRole(e.target.value)}/>
            
            </Form.Group>
            <Button style={{width:"150px"}} variant="btn btn-dark" className="btn" onClick={(e)=>handleUpdate(e)} type="submit">update</Button>

        </Form>
    </div>
  )
}

export default Edit