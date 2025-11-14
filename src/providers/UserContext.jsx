import React, { createContext, useEffect, useState, useContext, useRef, useMemo } from 'react'
import axios from "axios"
import {jwtDecode} from 'jwt-decode'
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const backend_host = import.meta.env.VITE_BACKEND_HOST

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
  const authTokensRef = useRef(authTokens)
  const userRef = useRef(user) 

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post(
        `${backend_host}/api/v1/general/users/sign_in`,
        {
          authentication: {
            document_number: credentials.document_number,
            password: credentials.password,
          }
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      if (response.status === 200) {
        const data = response.data;
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        const expireAt = data.expire_at;
        const user = data.user;
        const message = data.message;

        if (accessToken && refreshToken && expireAt && user) {
          const tokens = {
            access_token: accessToken,
            refresh_token: refreshToken,
            expire_at: expireAt,
            message: message,
            user: user
          }

          setAuthTokens(tokens)
          authTokensRef.current = tokens
          setUser(jwtDecode(accessToken))
          userRef.current = jwtDecode(accessToken)

          localStorage.setItem('authTokens', JSON.stringify(tokens))
          localStorage.setItem('user', JSON.stringify(user))
          window.location.href = '/'

        } else {
          console.error('Tokens are missing in the response data')
        }
      } else {
        alert('Something went wrong | incorrect credentials')
      }
    } catch (error) {
      console.error('Error en loginUser:', error.response ? error.response.data : error.message)
      alert('Something went wrong | Please try again later')
    }
  }


  const logoutUser = async () => {
    toast({
      title: "Nos vemos luego",
      description: "Tu sesión ha sido cerrada con éxito. ¡Hasta pronto!",
      action: <ToastAction altText="Nos vemos luego">Aceptar</ToastAction>,
    })

    try {
      if (authTokensRef.current) {
        await axios.delete(
          `${backend_host}/api/v1/general/users/sign_out`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: "Bearer " + authTokensRef.current.access_token,
            },
          }
        )
      }
    } catch (error) {
      console.error('Error en logoutUser:', error.response ? error.response.data : error.message)
    } finally {
      authTokensRef.current = null
      userRef.current = null
      localStorage.removeItem('authTokens')
      localStorage.removeItem('user')
      setAuthTokens(null)
      setUser(null)
      window.location.href = '/sign-in'
    }
  }


  const updateToken = async () => {
    try {
      const response = await axios.post(
        `${backend_host}/api/v1/general/users/tokens`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Refresh-Token': authTokensRef.current?.refresh_token,
            Authorization: "Bearer " + authTokensRef.current?.access_token,
          },
        }
      )

      if (response.status === 200) {
        const data = response.data
        const accessToken = data.access_token
        const refreshToken = data.refresh_token
        const expireAt = data.expire_at

        if (accessToken && refreshToken && expireAt) {
          const tokens = {
            access_token: accessToken,
            refresh_token: refreshToken,
            expire_at: expireAt,
          }

          authTokensRef.current = tokens
          userRef.current = jwtDecode(accessToken)

          localStorage.setItem('authTokens', JSON.stringify(tokens))
          localStorage.setItem('user', JSON.stringify(data.user))

        } else {
          console.error('Tokens are missing in the response data')
          logoutUser()
        }
      } else {
        console.error('Failed to update token, status:', response.status)
        logoutUser()
      }
      if (loading) {
        setLoading(false)
      }
    } catch (error) {
      console.error('Error en updateToken:', error.response ? error.response.data : error.message)
      logoutUser()
    } 
  }

  useEffect(() => {
    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logoutUser();
        }
        return Promise.reject(error);
      }
    )

    return () => axios.interceptors.response.eject(axiosInterceptor);
  }, [])

  useEffect(() => {
    const axiosInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = authTokensRef.current?.access_token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    return () => axios.interceptors.request.eject(axiosInterceptor)
  }, [])

  useEffect(() => {
    if (authTokensRef) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + authTokensRef.current?.access_token;
    } else {
      delete axios.defaults.headers.common["Authorization"]
      localStorage.removeItem("authTokens")
    }
  }, [authTokensRef])

  useEffect(() => {
    authTokensRef.current = authTokens
    userRef.current = user
  }, [authTokensRef, userRef])

  useEffect(() => {
    const intervalId = setInterval(() => {
      const expireAtRefInSeconds = parseInt(authTokensRef.current?.expire_at) || 0
      const expireAtInMillis = expireAtRefInSeconds * 1000
      const currentTime = new Date().getTime()
      const fiveMinutesInMillis = 5 * 60 * 1000
      const rest = expireAtInMillis - currentTime
      if (rest <= fiveMinutesInMillis && authTokens) {
        updateToken()
      }
    }, 60000)
    return () => clearInterval(intervalId)
  }, [authTokensRef])

  const contextData = useMemo(() => ({
    user: userRef?.current,
    authTokens: authTokensRef?.current,
    loginUser,
    logoutUser,
    setAuthTokens, 
    setUser, 
  }), [authTokensRef])

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => useContext(UserContext)

export default UserContext
