import './App.css'
import Days from './pages/Days'
import {db} from './db'
function App() {

  return (
    <>
    <div className='container'>
     <h1>75 days challenge</h1> 
     <button onClick={()=>{
      db.challenge.clear()
      window.location.reload()
     }}>Reset</button>

   


    </div>
    <div className='containe pl-2.5 pt-2.5 pb-2.5 h-[500px] mt-10 flex gap-12 flex-wrap  border-2 border-black'>

      {Array(75).fill(0).map((_, index) => (
        <Days day={index} />
      ))}
    
    </div>
    
    </>
  )
}

export default App
