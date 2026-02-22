import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'

const Dashboard = () => {
  return <div>
      <Appbar />
      <div className="mt-8 pl-8 pr-8">
      <Balance value={"10,000"} />
      <Users />
    </div>
    </div>
    
}

export default Dashboard
