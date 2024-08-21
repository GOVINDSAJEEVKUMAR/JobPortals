// import { createContext, useContext, useEffect, useState } from "react";

// const UserContext = createContext();

// const UserProvider = ({ children }) => {

//     const [token,setToken] = useState(null);
//     const [user,setUser]  = useState(JSON.parse(localStorage.getItem('user')));
//     const [loading,setLoading] = useState(true);

//     useEffect(() => {
//         const soterToken = JSON.parse(localStorage.getItem('token'));;
//         setToken(soterToken);
//         setLoading(false);
//     },[])

//     const logout = ()=>{
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         setToken(null);
//         setUser(null);
//     }
//     if(loading){
//         return null
//     }


//     return (
//         <>
//         <UserContext.Provider value={{token,setToken,user,setToken,logout}}>
//             {children}
//         </UserContext.Provider>
        
        
        
//         </>
//     )
// }
// export const userAuth =()=> useContext(UserContext)

// export default UserProvider

// import { createContext, useContext, useEffect, useState } from "react";

// const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     } catch (error) {
//       console.error('Failed to parse user from localStorage:', error);
//     }

//     try {
//       const storedToken = localStorage.getItem('token');
//       if (storedToken) {
//         setToken(JSON.parse(storedToken));
//       }
//     } catch (error) {
//       console.error('Failed to parse token from localStorage:', error);
//     }

//     setLoading(false);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setToken(null);
//     setUser(null);
//   };

//   if (loading) {
//     return null;
//   }

//   return (
//     <UserContext.Provider value={{ token, setToken, user, setUser, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const userAuth = () => useContext(UserContext);

// export default UserProvider;


import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = Cookies.get('accessToken');
    if (storedToken) {
      setToken(storedToken);
      // You might need to fetch the user data using the token
      // fetchUser(storedToken).then(setUser);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setToken(null);
    setUser(null);
  };

  if (loading) {
    return null; // You might want to return a loading spinner here
  }

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const userAuth = () => useContext(UserContext);

export default UserProvider;
