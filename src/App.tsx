import './App.css'
import Days from './pages/Days'
import {db} from './db'
import Sidebar from './components/sidebar'
function App() {

  return (
    <>
        <div className='  gap-10 flex'>
          <div>
          <Sidebar/>
          </div>
          <div>

    <div className='container '>
     <h1 className='  text-6xl pb-1.5 font-bold'>75 days 
      <br></br>challenge</h1> 
     <button className=' text-2xl  bg-black border-2 border-black rounded-2xl px-1.5 py-1.5 cursor-pointer' onClick={()=>{
      db.challenge.clear()
      window.location.reload()
     }}>Reset</button>

   


    </div>
    <div className='containe pl-2.5 pt-2.5 pb-2.5 h-[500px] rounded-xl mt-10 flex gap-12 flex-wrap  border-2 border-black'>

      {Array(75).fill(0).map((_, index) => (
        <Days day={index} />
      ))}
    
    </div>
    </div>
    </div>

    
    </>
  )
}

export default App
