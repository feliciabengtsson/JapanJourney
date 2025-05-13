import { useState } from "react";
/* https://blog.theashishmaurya.me/creating-a-react-modal-with-react-custom-hooks-and-typescript
 */
function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenSignup, setisOpenSignup] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const toggleLogin = () => {
        setIsOpenLogin(!isOpenLogin);
    };
    const toggleSignup = () => {
        setisOpenSignup(!isOpenSignup);
    };

    return {
        isOpen,
        toggle,
        isOpenLogin,
        toggleLogin,
        isOpenSignup,
        toggleSignup,
    };
}

export default useModal;
