import React, { useState, useEffect } from 'react'
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import '../employeeStyle.css';

export default function ETable() {
    const navigate=useNavigate()
    const [tableData, setTableData] = useState([]);
    const [showNewComponent, setShowNewComponent] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [schUni, setSchUni] = useState('');
    const [degree, setDegree] = useState('');
    const [grade, setGrade] = useState('');
    const [poy, setPoy] = useState('');

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('educationData')) || [];
        setTableData(storedData);
    }, []);

    function handleAdd(){
        setTimeout(()=>{
            setShowNewComponent(false)
        },100)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let id = Math.random().toString(16).slice(2);
        const newData = { id, schUni, degree, grade, poy };
        if (editIndex === null) {
            setTableData([...tableData, newData]);
        } else {
            const updatedData = [...tableData];
            updatedData[editIndex] = newData;
            setTableData(updatedData);
            setEditIndex(null);
        }
        const storedData = JSON.parse(localStorage.getItem('educationData')) || [];
        const updatedStoredData = editIndex === null
            ? [...storedData, newData]
            : storedData.map((d, i) => i === editIndex ? newData : d);
        localStorage.setItem('educationData', JSON.stringify(updatedStoredData));
        setSchUni('');
        setDegree('');
        setGrade('');
        setPoy('');
    };
 

    const editTableRow = (index) => {
        setEditIndex(index);
        setShowNewComponent(true);
        setSchUni(tableData[index].schUni);
        setDegree(tableData[index].degree);
        setGrade(tableData[index].grade);
        setPoy(tableData[index].poy);
    };

    const deleteTableRow = (id) => {
        // 10
        const updatedData = tableData.filter(d => d.id !== id);
        setTableData(updatedData);
        localStorage.setItem('educationData', JSON.stringify(updatedData));
    };

    return (
        <div className='component'>
            {!showNewComponent && (
                
                <div className='heading'>
                    <button className='back-button1' onClick={() => navigate(-1)}>Back</button> 
                    <h2 className="text">Employee Education Details</h2>
                    {/* <div className='eadd-button'> */}
                        <button className='add-button mr-2' style={{backgroundColor:"#555"}} onClick={() => setShowNewComponent(true)}>+ Add</button>
                    {/* </div> */}
                </div>
                
            )}
            {!showNewComponent && (
                <table className='edu-table'>
                    <thead>
                        <tr>
                            <th>School/University</th>
                            <th>Degree</th>
                            <th>Grade</th>
                            <th style={{width:"15%"}}>Passing Of Year</th>
                            <th style={{width:"10%"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((record, index) => {
                            return (
                                <tr className='box' key={record.id}>
                                    <td>{record.schUni}</td>
                                    <td>{record.degree}</td>
                                    <td>{record.grade}</td>
                                    <td>{record.poy}</td>
                                    <td className='edu-action-main'>
                                      <BiEdit className='edu-edit edu-action' onClick={() => editTableRow(index)} />
                                      <MdDelete className='edu-edit edu-action' onClick={() => deleteTableRow(record.id)} />

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
            {showNewComponent && (
                <div>
                    <div className='form-header'>
                        <h2 className="text">{editIndex === null ? 'Add Education Details' : 'Edit Education Details'}</h2>
                    </div>
                    <div className='form-detail'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor='schUni'>School: </label>
                                <input type='text' id='schUni' name='schUni' value={schUni} placeholder='School/Uni' onChange={(e) => setSchUni(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='degree'>Degree:</label>
                                <input type='text' id='degree' name='degree' value={degree} placeholder='Degree' onChange={(e) => setDegree(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='grade'>Grade:</label>
                                <input type='text' id='grade' name='grade' value={grade} placeholder='Grades in point' onChange={(e) => setGrade(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='poy'>Passing Of Year:</label>
                                <input type='text' id='poy' name='poy' value={poy} placeholder='Year' onChange={(e) => setPoy(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <button className='add-btn007' type='submit' onClick={handleAdd}>{editIndex === null ? 'Add' : 'Update'}</button>
                                <button className='add-btn007' onClick={() => setShowNewComponent(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}




