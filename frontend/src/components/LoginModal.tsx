/* https://stackoverflow.com/questions/34558264/fetch-api-with-cookie
https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions*/
import styled from "styled-components";
import { useState, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const ModalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;
const ModalWrapper = styled.div`
    display: block;
    background: rgba(255, 196, 178, 0.9);
    width: 70%;
    max-width: 600px;
    height: fit-content;
    padding: 0.5rem 1rem 1rem;
    border-radius: 1rem;
`;
const CloseWrapper = styled.div`
    display: flex;
    justify-content: end;
`;
const CloseIcon = styled.span`
    color: var(--color-neutral-dark);
    cursor: pointer;
    font-size: 2rem;
`;
const LoginHeader = styled.h2`
    display: flex;
    justify-content: center;
    margin: 0 auto 1rem;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const LoginInput = styled.input`
    width: 15rem;
    height: 3rem;
    border-radius: 3rem;
    background: var(--color-neutral-light);
    border: none;
    font-family: Poppins;
    padding-left: 1rem;
    margin-bottom: 1rem;
`;
const LoginBtn = styled.input`
    width: 7rem;
    height: 2.5rem;
    border-radius: 3rem;
    background: var(--color-secondary);
    color: var(--color-neutral-light);
    border: none;
    font-family: Poppins;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    text-align: center;
    cursor: pointer;
`;

interface Login {
    isOpenLogin: boolean;
    toggleLogin: () => void;
}
interface FormType {
    email: string;
    password: string;
}
interface User {
    users_id: number;
    username: string;
    email: string;
    password: string;
}

function LoginModal(props: Login) {
    const [input, setInput] = useState<FormType>({
        email: "",
        password: "",
    });
    const [loginInfo, setLoginInfo] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents default form submission behavior

        try {
            if (input.email !== "" && input.password !== "") {
                const response = await fetch("/api/login", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(input),
                });

                if (response.ok) {
                    const userData = (await response.json()) as User;
                    login(userData);
                    navigate("/places"); /// Redirect to new page
                } else {
                    setLoginInfo(true);
                }
            }
        } catch (error) {
            console.error("error", error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setInput((prev) => ({
            ...prev,
            [name]: value, // Update form data for the input field that changed
        }));
    };

    return (
        <Fragment>
            {props.isOpenLogin && (
                <ModalContainer>
                    <ModalWrapper>
                        <CloseWrapper>
                            <CloseIcon
                                onClick={props.toggleLogin}
                                className="material-symbols-outlined"
                            >
                                close
                            </CloseIcon>
                        </CloseWrapper>
                        <LoginHeader>Login</LoginHeader>
                        <Form onSubmit={handleLogin} method="post">
                            <label htmlFor="user-email">Email:</label>
                            <LoginInput
                                onChange={handleInputChange}
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                aria-describedby="user-email"
                                aria-invalid="false"
                            />
                            <label htmlFor="user-password">Password:</label>
                            <LoginInput
                                value={input.password}
                                onChange={handleInputChange}
                                name="password"
                                type="password"
                                placeholder="password"
                                aria-describedby="user-password"
                                aria-invalid="false"
                            />
                            {loginInfo ? (
                                <p>Wrong login information!</p>
                            ) : (
                                <p></p>
                            )}
                            <LoginBtn type="submit" value="Login" />
                        </Form>
                    </ModalWrapper>
                </ModalContainer>
            )}
        </Fragment>
    );
}

export default LoginModal;
