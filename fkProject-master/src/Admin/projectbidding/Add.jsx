import React, { useState } from 'react';
import {Button,Form} from 'react-bootstrap';
import Promaster from './Promaster';
import {v4 as uuid} from "uuid";
import {Link,useNavigate} from 'react-router-dom';

function Add2() {
    const[project_title,setProject_title]=useState('');
    const[portal,setPortal]=useState('');
    const[project_url,setProject_url]=useState('');
    const[estimated_time,setEsimated_time]=useState('');
    const[estimated_cost,setEstimated_cost]=useState('');
    const[remark,setRemark]=useState('');
    

    let history= useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        const ids = uuid();

        let uniqeId = ids.slice(0,8);
        let a = project_title,
        b = portal,
        c = project_url,
        d = estimated_time,
        k = estimated_cost,
        f = remark;

        history('/project_bidding');

        Promaster.push({id:uniqeId,project_title:a,portal:b,
            project_url:c,estimated_time:d,estimated_cost:k,remark:f});

    }

  return (
    <div>
        <Form className="d-grid gap-2" style={{margin:"5em"}}>
            <Form.Group>
            <input class="form-control" type="text" placeholder='project_title'
              required onChange={(e)=>setProject_title(e.target.value)}/><br/>

             <input class="form-control" type="text"placeholder='project_url' 
              required onChange={(e)=>setPortal(e.target.value)}/><br/>

            <input class="form-control" type="text" placeholder='estimated_time'
              required onChange={(e)=>setProject_url(e.target.value)}/><br/>

            <input class="form-control" type="text" placeholder='estimated_cost'
              required onChange={(e)=>setEsimated_time(e.target.value)}/><br/>

            <input class="form-control" type="text" placeholder='remark'
              required onChange={(e)=>setEstimated_cost(e.target.value)}/><br/>

            <input class="form-control" type="text" placeholder='Portal Name'
              required onChange={(e)=>setRemark(e.target.value)}/><br/>
            
            </Form.Group>
            <Button  variant="btn btn-dark" className="btn" onClick={(e)=>handleSubmit(e)} type="submit">Submit</Button>

        </Form>
    </div>
  )
}

export default Add2;