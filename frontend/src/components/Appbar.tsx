import { userAtom } from "../store/atoms/user";
import { Avatar } from "./BlogCard"
import { Link, useNavigate } from "react-router-dom"
import {useRecoilState } from 'recoil';

export const Appbar = () => {
    const [user,setUser] = useRecoilState(userAtom);
    const navigate = useNavigate()
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
                Medium
        </Link>
        <div className=" flex items-center">
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 ">New</button>
            </Link>

            <Avatar size={"big"} name={user.username} />
            {user && <div onClick={() =>{setUser("") ; localStorage.clear(); navigate("/signin")}} className="mx-4 text-white bg-green-700 cursor-pointer hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2">Sign out</div>}
        </div>
    </div>
}