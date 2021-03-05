import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children } ) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  //only want to run this when we mount the component, only runs once
  useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged(user => {
       setCurrentUser(user)
       setLoading(false)
    
  })
    //when we call the useEffect method, unsubscribe us from the listener when component unmounts
  return unsubscribe
  //
  }, [])
 

  const value = {
    currentUser, 
    signup
  }
  
  return (
    <AuthContext.Provider value={value}>
        {/* if not loading, then we render children otherwise, do not render */}
      {!loading && children}
    </AuthContext.Provider>
  )
}

