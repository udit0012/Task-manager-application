import React, { useEffect, useState } from 'react'
import "./Navbar.css"

const Navbar = () => {
    const newdate = new Date()
    const year = newdate.getFullYear()
    const date = newdate.getDate()
    const month = newdate.getMonth()
    const monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
  return (
    <div className='navbar'>
        <div className='heading'>Task Manager</div>
        <div className='date'>{year}, {monthName[month].slice(0,3)} {date} </div>
        
    </div>
  )
}

export default Navbar