import Balance from '../components/Balance'
import Users from '../components/Users';
import Appbar from '../components/Appbar'

const Dashboard = () => {
  return  <div>
      <Appbar />
      <div className='pr-8 pl-8'>
        <Balance value={"10,000"} />
        <Users />
      </div>
    </div>
    
}

export default Dashboard