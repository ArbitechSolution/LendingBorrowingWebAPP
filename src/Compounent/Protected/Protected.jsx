import React from 'react';
import { useNavigate } from 'react-router-dom';

function Protected({children , IsLogin}) {
    const navigate = useNavigate();
    // let IsLogin = localStorage.getItem("IsLogin");
    if( IsLogin === true)
    {
      return children;
    }
    else
    {
      return navigate("/");
    }
}

export default Protected;