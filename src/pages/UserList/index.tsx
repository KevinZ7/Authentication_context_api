import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  useAuth  from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { user } from "../../shared/interfaces/userList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import './userList.css';


const UserListPage = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState<user[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();
  
  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try{
        console.log("starting request");
        const response = await axiosPrivate.get("/account/list_users",
          {
            signal: controller.signal
          }
        );
        
        setIsLoading(false);
        isMounted && setAllUsers(response.data.data);
        console.log("request finished");
        
      }
      catch(err){
        console.log(err);
        
      }
    };

    getUsers();

    return () => {
      console.log("cleaning up");
      isMounted = false;
      setError("");
      setIsLoading(true);
      controller.abort();
    };


  }, [auth]);

  const logOutHandler = () => {
    setAuth({ access: "", refresh: "", loggedIn: false });
    navigate("/");
  }
  
  const userClickHandler = () => {
    navigate("/user");
  }

  return (
    <div>
      <Link to={"/"}>
        <button onClick={logOutHandler}>logout</button>
      </Link>
      <article>
        <h2>Users List</h2>
        {
          isLoading ? <p>Loading...</p> :
          allUsers?.length > 0
          ? (
              <div className="userList">
                {
                  allUsers.map((user, i) =>
                    <div className="user" key={i} onClick={userClickHandler}>
                      <img src={user.profile_icon} alt="profile" width="100" height="100" />
                      
                      <h5>{user.username}</h5>
                  
                      <h5>{user.email}</h5>
                     
                    </div>
                  )
                }
              </div>
          ) : <p>No users to display</p>
        }

      </article>
    </div>
  );
};

export default UserListPage;
