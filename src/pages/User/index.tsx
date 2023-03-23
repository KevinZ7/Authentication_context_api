import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


const User = () => {
  const [userDetail, setUserDetail] = useState<userDetailType>({});
  
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const getUserDetail = async () => {
      try{
        const response = await axiosPrivate.post("/account/details_users/");
        console.log(response);
        setUserDetail({
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          email: response.data.data.email,
          profile_icon: response.data.data.profile_icon
        });
      }
      catch(err){
        console.log(err);
      }
    };

    getUserDetail();
  }, [])

  return (
    <div>
      <Link to={"/userlist"}>
        <button>Back</button>
      </Link>
      <div>
        <img src={userDetail.profile_icon} alt="profile icon"/>
        <h1>{userDetail.first_name} {userDetail.last_name}</h1>
        <h2>{userDetail.email}</h2>
      </div>
    </div>
    
  )
}

interface userDetailType{
  first_name?: string,
  last_name?: string,
  email?: string,
  profile_icon?: string
}

export default User