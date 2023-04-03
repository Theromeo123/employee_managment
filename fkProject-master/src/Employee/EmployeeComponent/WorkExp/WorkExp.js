import React, { useState } from 'react'


import WTable from './WTable'
import { RiAddFill } from 'react-icons/ri';


export default function WorkExp() {
    const [showNewComponent, setShowNewComponent] = useState(false);
    const [cName, setCName] = useState('');
    const [fromDate, setfromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [designation, setDesignation] = useState('');
    


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(`LeaveApp  ${leaveType}, ${date1}, ${date2}, ${reason}, ${status}`);

    }

    const handleClick = () => {
        setShowNewComponent(true);
    }
    return (
        <div className='wparent'>
            <div className='wbaby-left'>
                {/* <Sidebar /> */}
            </div>
            <div className='wbaby-right'>
                {!showNewComponent && (<>
                    {/* <div> */}
                    <div>
                        {/* <h2 className="text" >Employee Work Experience Details</h2> */}
                        {/* <button variant="primary" onClick={handleClick}><RiAddFill style={{ paddingRight: "0.3rem" }} />
                            Add
                        </button> */}
                    </div>
                    {/* </div> */}


                    <WTable />
                </>
                )}
            </div>
        </div>
    )
}
