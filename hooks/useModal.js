import { useContext } from "react";
import ConfigContext from "../context/config";

export default function useModal(){
    const Config = useContext(ConfigContext)
    return {
        ...Config
    }
}