import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user]);
    return (
        children
    )
}

export default ProtectedRoute
