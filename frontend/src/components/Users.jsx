import { useNavigate } from "react-router-dom"
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
    //For the Database calls or backend calls
    const [ users, setUsers] = useState([]);
    const [ filter , setFilter ] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `http://localhost:3000/api/v1/user/bulk?filter=${filter}`,
                    {
                        headers: { token }
                    }
                );

                setUsers(response.data.user);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };

        fetchUsers();
    }, [filter]);
  
  return <>
    <div className="font-bold mt-6 text-lg">
      Users
    </div>
    <div className="my-2">
        <input onChange={(e) => {
            setFilter(e.target.value)
        }} type="text" placeholder="Search Users" className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
    <div>
        {users.map(user => <User key={user._id} user={user} />)}
    </div>
  </>
}

//To find the User and map it in the frontend
function User({user}){
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full font-bold ">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button label={"Send Money"}
            onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName)
            }}/>
        </div>
    </div>
}

export default Users
