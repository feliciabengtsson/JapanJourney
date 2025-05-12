import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";

const NavContainer = styled.div`
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
const NavWrapper = styled.div`
    display: block;
    background: var(--color-primary-medium);
    width: 70%;
    max-width: 800px;
    height: 70%;
    padding: 1rem;
    border-radius: 1rem;
`;
const IconWrapper = styled.div`
    display: flex;
    justify-content: end;
`;
const CloseIcon = styled.span`
    color: var(--color-secondary);
    cursor: pointer;
`;

interface Nav {
    isOpen: boolean;
    toggle: () => void;
}

function SideNav(props: Nav) {
    return (
        <Fragment>
            {props.isOpen && (
                <NavContainer>
                    <NavWrapper>
                        <IconWrapper>
                            <CloseIcon
                                onClick={props.toggle}
                                className="material-symbols-outlined"
                            >
                                close
                            </CloseIcon>
                        </IconWrapper>
                        <h3>How It Works:</h3>
                        <p>
                            📅 Monthly Pick - Each month, we select a new book
                            to read together.
                        </p>
                        <p>
                            💬 Weekly Check-Ins - Discuss key moments and themes
                            in our private group chats.
                        </p>
                        <p>
                            🎙️ Live Discussions - Join our virtual meet-ups for
                            deeper conversations and fun book-related
                            activities.
                        </p>
                        <p>
                            ✨ Cozy Extras - Get reading guides, discussion
                            prompts, and exclusive author Q&As!
                        </p>
                        <p>
                            👉 Want to start your own book circle? Create a
                            group with friends or join an existing one - the
                            more, the merrier!
                        </p>
                    </NavWrapper>
                </NavContainer>
            )}
        </Fragment>
    );
}

export default SideNav;
