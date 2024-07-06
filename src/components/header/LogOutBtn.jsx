import { useDispatch } from "react-redux";
import authservices from "../../Appwriter/auth";
import { logout } from "../../store/authSlice";


export const LogOutBtn = () => {
    const dispatch = useDispatch();

    function logoutHandler(){
        authservices.logout()
        .then(() => dispatch(logout()));
    }

  return <button
   className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
  onClick={logoutHandler}>LogOutBtn</button>

  
}

export default LogOutBtn;
