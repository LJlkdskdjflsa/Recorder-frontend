import {createContext, useEffect, useReducer, useRef} from "react";
import {validateToken} from "../utils/jwt";
import {resetSession, setSession} from "../utils/session";
import axiosInstance from "../services/axios";


const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

export const AuthContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve()
})

interface Action {
    type: string;
    payload: any;
}

const handlers = {
    INITIALIZE: (state: any, action: Action) => {
        const {isAuthenticated, user} = action.payload;
        return {...state, isAuthenticated, isInitialized: true, user};
    },
    LOGIN: (state: any, action: any) => {
        const {user} = action.payload;
        return {...state, isAuthenticated: true, user};
    },
    LOGOUT: (state: any) => {
        return {...state, isAuthenticated: false, isInitialized: true, user: null};
    },
}


const reducer = (state: any, action: Action) => {
    // @ts-ignore
    if (handlers[action.type]) {
        // @ts-ignore
        return handlers[action.type](state, action);
    } else {
        return state;
    }
};

interface Prop {
    children: any
}

export const AuthProvider = (props: Prop) => {
    const {children} = props;
    const [state, dispatch] = useReducer(reducer, initialState)
    const isMounted = useRef(false)
    useEffect(() => {
        if (isMounted.current) return
        const initialize = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken")
                if (accessToken && validateToken(accessToken)) {
                    setSession(accessToken)
                    const response = await axiosInstance.get("/users/me")
                    const {data: user} = response;
                    dispatch({
                        type: "INITIALIZE", payload: {
                            isAuthenticated: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: "INITIALIZE",
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    });
                }
            } catch (error) {
                console.error(error)
                dispatch({
                    type: "INITIALIZE",
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        }

        initialize();
        isMounted.current = true;
    })

    const getTokens = async (email: string, password: string) => {
        const formData = new FormData();
        formData.append("username", email);
        formData.append("password", password);
        try {
            const response = await axiosInstance.post("/auth/login", formData);
            setSession(response.data.access_token, response.data.refresh_token)

        } catch (error) {
            throw error

        }
    }

    const login = async (email: string, password: string) => {
        try {
            await getTokens(email, password)
            const response = await axiosInstance.get("/users/me")
            const {data: user} = response;
            dispatch({
                type: "LOGIN",
                payload: {user,}
            })
        } catch (error) {
            return Promise.reject(error)

        }
    }

    const logout = async () => {
        resetSession();
        dispatch({
            type: "LOGOUT",
            payload: null
        })
    }

    return (<AuthContext.Provider value={{...state, login, logout}}>{children}</AuthContext.Provider>)
}

export const AuthConsumer = AuthContext.Consumer;