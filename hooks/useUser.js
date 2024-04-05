import { useContext } from "react";
import UserContext from "../context/user";

export default function useModal(){
    const User = useContext(UserContext)
    return User
}