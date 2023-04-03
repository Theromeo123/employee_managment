import React, { useState } from 'react'
import "./city.css"
import {FaUserEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";

export default function Table() {
    let [array,setArray]=useState([]);
    let [inputdata,setInputdata]=useState({country:"",state:"",city:""});
    let [index,setIndex]=useState();
    let [bolin,setBolin]=useState(false);
    let {country,state,city}=inputdata;

    function data(e){
        setInputdata({...inputdata,[e.target.name]:e.target.value})
    }

 
    function addinputdata(){

        if(country==="" || state==="" || city===""){
            alert("Enter all the details")
        }
        else{
        setArray([...array,{country,state,city}])
        // console.log(inputdata)
        setInputdata({country:"",state:"",city:""})
    }
    }



// deleting row 
function deletedata(i){
    console.log(i,"this index row want to be delete")
    let total=[...array]
    total.splice(i,1)
    setArray(total)

}

// updatedata
function updatedata(i){

    let {country,state,city}=array[i]//this perticular index no row data shoud be update so we get this index no row data in country or state 
    setInputdata({country,state,city})
    setBolin(true)
    setIndex(i)

}

//know add data at perticular index means update it on that index
function updateinfo(){
    let total=[...array]
    total.splice(index,1,{country,state,city})
    setArray(total)
     setBolin(false)
     setInputdata({country:"",state:"",city:""})
}
  return (
    <div>
          
            <input type="text" value={inputdata.country || ""} name='country' autoComplete='off' placeholder='Enter Country' onChange={data}  />
            <input type="text" value={inputdata.state || ""} name="state" autoComplete='off' placeholder='Enter State' onChange={data} />
            <input type="text" value={inputdata.city || ""} name='city' autoComplete='off' placeholder='Enter City' onChange={data}  />
            <button className='add-btn' onClick={!bolin?addinputdata:updateinfo}>{!bolin?`Add Data`:`Update Data`}</button>

            <br />

            <table className='city-table' border="1" >
                <tbody>
                    <tr>
                        <th>Country</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                {

array && array.map(
(item,i)=>{
    return(
        <tr key={i}>
            <td>{item.country}</td>
            <td>{item.state}</td>
            <td>{item.city}</td>
            <td><button className='edit-btn' onClick={()=>updatedata(i)}><FaUserEdit/></button></td>
            <td><button className='dlt-btn' onClick={()=>deletedata(i)}><AiFillDelete/></button></td>
        </tr>
    )
}
)
}
</tbody>
</table>

</div>
  )
}