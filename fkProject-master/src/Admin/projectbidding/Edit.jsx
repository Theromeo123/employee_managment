import React,{useState,useEffect } from 'react'
import {Button,Form} from 'react-bootstrap';
import {Link,useNavigate} from 'react-router-dom';
import Promaster from './Promaster';


function Edit2() {
    const[project_title,setProject_title]=useState('');
    const[portal,setPortal]=useState('');
    const[project_url,setProject_url]=useState('');
    const[estimated_time,setEsimated_time]=useState('');
    const[estimated_cost,setEstimated_cost]=useState('');
    const[remark,setRemark]=useState('');
    const[id,setId]=useState('');
      
        var index = Promaster.map(function(e){
            return e.id
          }).indexOf(id);
          let history= useNavigate();
          const handleUpdate=(e)=>{
            e.preventDefault();
            let a = Promaster[index];
            a.project_title = project_title;
            a.portal = portal;
            a.project_url = project_url;
            a.estimated_time = estimated_time;
            a.estimated_cost = estimated_cost;
            a.remark = remark;
            history('/project');
            
    }

    useEffect(()=>{
      setProject_title(localStorage.getItem('project_title'))
      setPortal(localStorage.getItem('portal'))
      setProject_url(localStorage.getItem('project_url'))
      setEsimated_time(localStorage.getItem('estimated_time'))
      setEstimated_cost(localStorage.getItem('estimated_cost'))
      setRemark(localStorage.getItem('remark'))
      setId(localStorage.getItem('id'))
    },[])
  return (
    <div>
        <Form className="d-grid gap-2" style={{margin:"5em"}}>
            <Form.Group>
            <input class="form-control" type="text" placeholder='project_title'
              value={project_title} required onChange={(e)=>setProject_title(e.target.value)}/><br/>

             <input class="form-control" type="text"placeholder='portal' 
              value={portal} required onChange={(e)=>setPortal(e.target.value)}/><br/>

            <input class="form-control" type="text" placeholder='project_url'
              value={project_url} required onChange={(e)=>setProject_url(e.target.value)}/><br/>

            <input class="form-control" type="text" placeholder='estimated_time'
              value={estimated_time} required onChange={(e)=>setEsimated_time(e.target.value)}/><br/>

            <input class="form-control" type="text" placeholder='estimated_cost'
              value={estimated_cost} required onChange={(e)=>setEstimated_cost(e.target.value)}/><br/>

            <input class="form-control" type="text" placeholder='remark'
              value={remark} required onChange={(e)=>setRemark(e.target.value)}/><br/>
            
            </Form.Group>
            <Button variant="btn btn-dark" className="btn" onClick={(e)=>handleUpdate(e)} type="submit">update</Button>

        </Form>
    </div>
  )
}

export default Edit2;