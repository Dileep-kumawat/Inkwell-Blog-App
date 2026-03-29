import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success } = await handleRegister(formData);

    if (success) {
      navigate('/');
    }
  }
  return (
    <div>
      Hello from register page
      <form onSubmit={handleSubmit}>
        <input
          value={formData.username}
          onChange={(e) => {
            setFormData(prev => {
              return {
                ...prev,
                username: e.target.value
              }
            });
          }}
          type="text" placeholder="username" />
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
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register
