import styled from "styled-components";
import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

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
    background: rgba(255, 196, 178, 0.61);
    width: 70%;
    max-width: 800px;
    height: fit-content;
    padding: .5rem 1rem 1rem;
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
    background: var(--color-accent-light);
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

function LoginModal(props: Login) {
    const [formData, setFormData] = useState<FormType>({
        email: "",
        password: "",
    });
	const [loginInfo, setLoginInfo] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData({
            ...formData, // Keep existing form data
            [name]: value, // Update form data for the input field that changed
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents default form submission behavior

        try {
            const response = await fetch("http://localhost:8080/jj/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            console.log(response, "sent to backend");

            if (response.ok) {
                navigate("/places"); // Redirect to new page
            } else {
                console.log("fel inlogg)");
				setLoginInfo(true)
            }
        } catch (error) {
            console.error("error", error);
        }
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
                        <Form onSubmit={handleSubmit} method="post">
                            <label htmlFor="email">Email:</label>
                            <LoginInput
                                value={formData.email}
                                onChange={handleInputChange}
                                name="email"
                                type="text"
                                placeholder="email"
                            />
                            <label htmlFor="password">Password:</label>
                            <LoginInput
                                value={formData.password}
                                onChange={handleInputChange}
                                name="password"
                                type="password"
                                placeholder="password"
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
