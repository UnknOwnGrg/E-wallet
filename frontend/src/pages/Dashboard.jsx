import Balance from '../components/Balance'
import Users from '../components/Users';
import Appbar from '../components/Appbar'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [ balance , setBalance ] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try{
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            token 
          }
        })

        setBalance(response.data.balance)
      }catch(err){
        console.error("Error fetching balance",err)
      }
    }

    fetchBalance();
  },[]);
  return  <div>
      <Appbar />
      <div className='pr-8 pl-8'>
        <Balance value={balance} />
        <Users />
      </div>
    </div>
    
}

export default Dashboard