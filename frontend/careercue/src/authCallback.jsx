import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { TokenContext } from './context/TokenContext';
import {jwtDecode} from 'jwt-decode';

const AuthCallback = () => {
  const location = useLocation();
  const {updateToken,token} = useContext(TokenContext)
  // console.log("token in auth fron context:",token)
  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    console.log("params:",params)
    const token = params.get('token');
    const avatar=params.get('dp')
    // localStorage.setItem('id',req.user._id)
    
    console.log("token in auth:",token)

    if (token) {
      // const decoded=jwtDecode(token)
      // console.log("decoded:",decoded)
      // updateToken(token)
      // localStorage.setItem('user', decoded.name);
      // localStorage.setItem('token',token)

      localStorage.setItem('avatar',avatar);
      localStorage.setItem('authToken', token);
      // Redirect to your desired route after saving the token
      window.location.href = '/blogs';
    }
  }, [location,updateToken]);

  return <div>Loading...</div>;
};

export default AuthCallback;
