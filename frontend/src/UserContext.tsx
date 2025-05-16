import { createContext } from "react";

interface User {
    users_id: number;
    username: string;
    email: string;
    password: string;
}
interface UserContext {
    user: User[];
    setUser: React.Dispatch<
        React.SetStateAction<User[]>
    > /* https://stackoverflow.com/questions/72420279/usestate-with-usecontext-in-typescript */;
}

const UserContext = createContext<UserContext>({
    user: [],
    setUser: () => {},
});

export default UserContext;
