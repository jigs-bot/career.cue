import React from 'react'
import { useEffect } from 'react'
function logout() {
    useEffect(() => {
        // setAuthToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('avatar');
        window.location.href = '/';
      }, []);
    
  return (
    <div>logout</div>
  )
}

export default logout