import React, { useState } from 'react'
// import Sidebar from '../../Sidebar'
// import './Education.css'
import { RiAddFill } from 'react-icons/ri';
import data from './Edata.json'
import { useNavigate } from 'react-router-dom';
import ETable from './ETable';

// import Eform from './Eform'

export default function Education() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(false);

    const [leaveType, setLeaveType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reason, setReason] = useState(false);
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(`LeaveApp  ${leaveType}, ${fromDate}, ${toDate}, ${reason}, ${status}`);
    }
    const [showNewComponent, setShowNewComponent] = useState(false);

    const handleClick = () => {
        setShowNewComponent(true);
    }




    /// Eform details

    const [tableData, setTableData] = useState(data);

    const [school, setSchUni] = useState('');
    const [degree, setDegree] = useState('');
    const [grade, setGrade] = useState('');
    const [poy, setPoy] = useState('');


    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // const handleSubmit1 = (e) => {
    //     e.preventDefault();
    //     const newData = { school, degree, grade, poy };
    //     setTableData([...tableData, newData]);
    //     console.log(`Education  ${school}, ${degree}, ${grade}, ${poy}`);

    //     // Store the new data in localStorage
    //     const storedData = JSON.parse(localStorage.getItem('educationData')) || [];
    //     storedData.push(newData);
    //     localStorage.setItem('educationData', JSON.stringify(storedData));

    //     // Clear input fields
    //     setSchUni('');
    //     setDegree('');
    //     setGrade('');
    //     setPoy('');
    // };


    return (
        <div>
            <div className='ebaby-left'>
                {/* <Sidebar /> */}
            </div>
            <div className='ebaby-right'>

                {!showNewComponent && (<>
                    <ETable />
                </>
                )}
            </div>
        </div>
    )
}

