import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth,setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('/refresh_token/', {
          "refresh": auth?.refresh
        },{
            withCredentials: true
        });

        const access = response?.data?.access;

        setAuth((prev) => {
            return {
                ...prev,
                access
            }
        });

        return access;
    }
    return refresh;
};

export default useRefreshToken;
