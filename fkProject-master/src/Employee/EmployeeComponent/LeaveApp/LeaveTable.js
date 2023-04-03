import React, { useState, useEffect } from 'react'
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function LeaveTable() {
    const navigate = useNavigate()
    const [ltableData, setLTableData] = useState([]);
    const [showNewComponent, setShowNewComponent] = useState(false);
    const [editLeaveIndex, setEditLeaveIndex] = useState(null);
    const [leaveType, setLeaveType] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reasonforleave, setReason] = useState('');
    const [status, setStatus] = useState('');


    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('leaveApplicationData')) || [];
        setLTableData(storedData);
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        let id = Math.random().toString(16).slice(2);
        const newData = { id, leaveType, fromDate, toDate, reasonforleave, status };
        if (editLeaveIndex === null) {
            setLTableData([...ltableData, newData]);
        } else {
            const updatedData = [...ltableData];
            updatedData[editLeaveIndex] = newData;
            setLTableData(updatedData);
            setEditLeaveIndex(null);
        }
        const storedData = JSON.parse(localStorage.getItem('leaveApplicationData')) || [];
        const updatedStoredData = editLeaveIndex === null
            ? [...storedData, newData]
            : storedData.map((d, i) => i === editLeaveIndex ? newData : d);
        localStorage.setItem('leaveApplicationData', JSON.stringify(updatedStoredData));
        setLeaveType('');
        setFromDate('');
        setToDate('');
        setReason('');
        setStatus('');
    };

    const editTableRow = (index) => {
        setEditLeaveIndex(index);
        setShowNewComponent(true);
        setLeaveType(ltableData[index].leaveType);
        setFromDate(ltableData[index].fromDate);
        setToDate(ltableData[index].toDate);
        setReason(ltableData[index].reasonforleave);
        setStatus(ltableData[index].status);
    };

    const deleteTableRow = (id) => {
        // 10
        const updatedData = ltableData.filter(d => d.id !== id);
        setLTableData(updatedData);
        localStorage.setItem('LeaveApplication', JSON.stringify(updatedData));
    };

    return (
        <div className='component'>
            {!showNewComponent && (
                <div className='header wrk-exp'>
                    <button onClick={() => navigate(-1)} className="back-button1">Back</button>
                    <h2 className="text">Leave Application</h2>
                    <button className="add-button bg-dark text-white text" onClick={() => setShowNewComponent(true)}>+ Add</button>
                </div>

            )}
            {!showNewComponent && (
                <table className='wrk-exp-table'>
                    <thead>
                        <tr>
                            <th>Leave type</th>
                            <th>FromDate</th>
                            <th>ToDate</th>
                            <th>Reasonforleave</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ltableData.map((record, index) => {
                            return (
                                <tr className='box' key={record.id}>
                                    <td> {record.leaveType}</td>
                                    <td>  {record.fromDate}</td>
                                    <td> {record.toDate}</td>
                                    <td>{record.reasonforleave}</td>
                                    <td>{record.status}</td>
                                    <td>
                                        <nav>
                                            <BiEdit onClick={() => editTableRow(index)} style={{ paddingRight: "0.5rem" }} />
                                            <MdDelete onClick={() => deleteTableRow(record.id)} />
                                        </nav>
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
                        <h2>{editLeaveIndex === null ? 'Add LeaveApplicationEmp Details' : 'Edit LeaveApplicationEmp Details'}</h2>
                    </div>
                    <div className='form-detail'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor="leavetype">Leave Type</label>
                                <select id="leaveType" name="leaveType" value={leaveType} placeholder='LeaveType' onChange={(e) => setLeaveType(e.target.value)} required>
                                    <option value="d">Select Option</option>
                                    <option value="sick leave">Sick Leave</option>
                                    <option value="casusal leave">Casual Leave</option>
                                    <option value="privilege leave">Privilege Leave</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='fromDate'>FromDate</label>
                                <input type='date' id='fromDate' name='fromDate' value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='toDate'>ToDate</label>
                                <input type='date' id='toDate' name='toDate' value={toDate} onChange={(e) => setToDate(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="lname">ReasonForLeave</label>
                                <input type="text" id="lname" name="lastname" value={reasonforleave} placeholder="Reason.." onChange={(e) => setReason(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="country">Status</label>
                                <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                                    <option value="d">Select Option</option>
                                    <option value="approved">Approved</option>
                                    <option value="pending">Pending</option>
                                    <option value="notapproved">NotApproved</option>

                                </select>
                            </div>

                            <div className='form-group'>
                                <button type='submit'>{editLeaveIndex === null ? 'Add' : 'Update'}</button>
                                <button onClick={() => setShowNewComponent(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div >
            )
            }

        </div >
    )
}




