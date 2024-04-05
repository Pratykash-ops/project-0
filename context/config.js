import { createContext, useState } from "react";
import ReactModal from "react-modal";

const configDefaultValue = {
    modalActive: false,
    modalClass: "h-auto flex items-center justify-center "
}
const modalStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}
const ConfigContext = createContext(configDefaultValue)

export const ConfigProvoider = ({ children }) => {
    ReactModal.setAppElement('#__next');
    const [Config, setConfig] = useState(configDefaultValue);
    const openModal = () => setConfig((prev) => ({ ...prev, modalActive: true }))
    const closeModal = () => setConfig((prev) => ({ ...prev, modalActive: false }))
    return <ConfigContext.Provider value={{ openModal, closeModal, modalStyles, ...Config }}>
        {children}
    </ConfigContext.Provider>
}

export default ConfigContext