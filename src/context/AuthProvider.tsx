import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from "react-toastify";


interface AuthProviderInterface {
    email: string,
    password: string
}

interface AuthContextValueInterface {
    user: AuthProviderInterface | null;
    login: (userData: AuthProviderInterface) => void;
    logout: () => void
}

interface AuthProviderPropsInterface {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextValueInterface | undefined>(undefined)


export const AuthProvider: React.FC<AuthProviderPropsInterface> = ({ children }) => {
    const [user, setUser] = useState<AuthProviderInterface | null>(null);


    const login = async (userDataToLogin: AuthProviderInterface) => {
        setUser(userDataToLogin);
        const loginData = {
            email: userDataToLogin.email,
            password: userDataToLogin.password
        }

        try {
            const response = await apiRequest('login', 'POST', loginData, null);
            localStorage.setItem('token', response.token)

            toast.success('Inicio de sesión exitoso', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error: any) {

            console.error('Error al realizar el login:', error.message)
            toast.error('Error al iniciar sesión', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        toast.info('Sesión cerrada correctamente', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const contextValue: AuthContextValueInterface = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };