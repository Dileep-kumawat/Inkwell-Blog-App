import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth"

const Home = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();
    const logout = async () => {
        const { success } = await handleLogout();
        if (success) navigate("/login");
    }
    return (
        <div>
            Welcome from home
            <h1>Logout : <button onClick={logout}>Logout</button></h1>
        </div>
    )
}

export default Home
