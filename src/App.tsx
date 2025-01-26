import  { useState, useEffect } from 'react';
import './App.css';
import Days from './pages/Days';
import { db } from './db';

function App() {
  const [completedDays, setCompletedDays] = useState(0);
  const checkCompletedDays = async () => {
    const allChallenges = await db.challenge.toArray();
    const completed = allChallenges.filter(challenge => challenge.selected).length;
    setCompletedDays(completed);
  };

  useEffect(() => {
  
    checkCompletedDays();
  }, []);

  return (
    <div className='bg-black text-white min-h-screen p-8'>
      <div className='max-w-6xl  flex gap-10'>
        <div className='w-full mx-auto'>
          <div className='container mb-10'>
            <h1 className='text-6xl pb-1.5 font-bold text-white'>
              120 days challenge
            </h1>
            <div className='text-xl mt-2'>
              Completed Days: {completedDays}/120
            </div>
            <button 
              className='mt-4 text-2xl bg-gray-800 border-2 border-white rounded-2xl px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors' 
              onClick={() => {
                db.challenge.clear();
                window.location.reload();
              }}
            >
              Reset Challenge
            </button>
          </div>
          <div className='bg-gray-900 w-[1280px] border-2 border-gray-700 rounded-xl p-6 flex gap-12 flex-wrap'>
            {Array(120).fill(0).map((_, index) => (
              <Days f={checkCompletedDays} key={index} day={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;