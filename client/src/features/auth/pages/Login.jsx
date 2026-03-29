import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { success } = await handleLogin(formData);

        if (success) {
            navigate('/');
        }
    }
    return (
        <div>
            Hello from login page
            <form onSubmit={handleSubmit}>
                <input
                    value={formData.email}
                    onChange={(e) => {
                        setFormData(prev => {
                            return {
                                ...prev,
                                email: e.target.value
                            }
                        });
                    }}
                    type="email" placeholder="email" />
                <input
                    value={formData.password}
                    onChange={(e) => {
                        setFormData(prev => {
                            return {
                                ...prev,
                                password: e.target.value
                            }
                        });
                    }}
                    type="password" placeholder="password" />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login
