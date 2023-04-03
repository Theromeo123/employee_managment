import React, { useState, useEffect } from 'react'
// import './LeaveApp.css'
import LeaveTable from './LeaveTable'
import data from './LeaveData.json'


export default function LeaveApp() {
    const [showNewComponent, setShowNewComponent] = useState(false);

    const handleClick = () => {
        setShowNewComponent(true);
    }
    return (
        <div className='lparent'>
            <div className='lbaby-left'>
                {/* <Sidebar /> */}
            </div>
            <div className='lbaby-right'>
                {!showNewComponent && (<>
                    {/* <div> */}
                    <div>
                        {/* <h2 className="text">Leave Application</h2> */}
                        {/* <button variant="primary" onClick={handleClick}><RiAddFill style={{ paddingRight: "0.3rem" }} />
                            Add
                        </button> */}
                    </div>
                    {/* </div> */}
                    <LeaveTable />
                </>
                )}
            </div>
        </div>
    )
}
