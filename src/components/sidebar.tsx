import { useState } from "react"
export default function Sidebar(){
    const [open,setOpen] = useState(false)
    return (
        <nav
        onClick={()=>{
            setOpen(!open)
        }}
        style={{
            width: open ? "250px" : "100px",
            }} className="  w-[100px]  border-2  sticky   h-screen   text-white border-black rounded-3xl">


        </nav>
    )
}