/* https://medium.com/@katherinewest285/user-authentication-made-easy-usecontext-cc79b5a3ce82 
https://legacy.reactjs.org/docs/hooks-reference.html#usecontext*/
import { createContext, useState, type ReactNode } from "react";

interface User {
    users_id: number;
    username?: string;
    email: string;
    password: string;
}
interface UserContext {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const UserContext = createContext<UserContext>({
    user: null,
    login: () => {},
    logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
    };
    const logout = () => {
        setUser(null);
    };

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	)
};

export default UserContext;
