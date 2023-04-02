
import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}) {
  const profile=localStorage.getItem('profile') || null
  
  if(!profile) return <Navigate to='/'></Navigate>

  return children
  
}
