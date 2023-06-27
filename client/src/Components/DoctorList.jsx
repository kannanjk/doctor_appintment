import React from 'react'
import { useNavigate } from 'react-router-dom'

function DoctorList({doctor}) {
    const navigate = useNavigate()
  return (
    <>
    <div className="card m-2"
    style={{cursor:'pointer'}}
    onClick={()=> navigate(`/book-appointment/${doctor._id}`)}
    >
        <div className="card-header">
            Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
            <p>
                <b>Specialzation</b> {doctor.specialzation}
            </p>
            <p>
                <b>Exprerience</b> {doctor.exprerience}
            </p>
            <p>
                <b>Fees Pre Cunsaltaion</b> {doctor.feesPreCunsaltaion}
            </p>
            <p>
                <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
            </p>
        </div>
    </div>
    </>
  )
}

export default DoctorList