import { useNavigate } from "react-router-dom";
import { login } from "../auth";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ username: "user" }); // Save user data in localStorage
    navigate("/dashboard"); // Redirect to dashboard
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
