import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const SendMoney = () => {
  const token = localStorage.getItem("token");

  const [ searchParams ] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [ amount , setAmount ] = useState(0);
  const navigate = useNavigate();

  return <div className="flex justify-center h-screen bg-gray-100">
    <div className="h-full flex flex-col justify-center">
      <div className="border h-min text-card-foreground max-w-md p-4 space-y-8  w-96 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col space-y-1.5 p-2">
          <h2 className="text-3xl font-bold text-center space-x-4">Send Money</h2>
        </div>
        <div className="p-4">
          <div className="flex items-cente space-x-4 mb-2">
            <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <span class="text-2xl text-white" >{name[0].toUpperCase()}</span>
            </div>
            <h3 class="text-2xl pt-2 font-semibold">{name}</h3>
            
          </div>
          <div class="space-y-4">
            <div class="space-y-2">
              <label  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount">
                Amount (in Rs)
              </label>
              <input onChange={(e) => (
                setAmount(e.target.value)
              )} 
              type="number"
              class="flex h-10 w-full rounded-md border-input bg-slate-200 px-3 py-2 text-sm"
              id="amount"
              placeholder="Enter amount"
              />
            </div>
            <button onClick={async () => {
              try {
                await axios.post("http://localhost:3000/api/v1/account/transfer" , {
                  to : id, 
                  amount
                }, {
                  headers: {
                    token : token
                  }
                })
                toast.success(`${amount} transferred successfully to ${name}`)
                setTimeout(() => {
                  navigate("/dashboard")
                }, 1500)
              } catch (err) {
                toast.error(`Transfer to ${name} failed`)
              }
            }}
            class="justify-center rounded-md text-sm font-medium ring-offset-slate-500 transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
            >Initiate Transfer</button>

          </div>
        </div>


      </div>
    </div>
    </div>
}

export default SendMoney
