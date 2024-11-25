"use client"

import Navbar from "@/components/Navbar"
import Discounts from "@/components/Discounts"
import Footer from "@/components/Footer"
import { useEffect } from 'react'

export default function Associado(){

  return (
    <div className="font-sans">
      <Navbar/>
      <Discounts/>
      {/* <Footer/> */}
    </div>
  )
}