import { useState } from "react";
import axios from "axios"
import { Link, useNavigate} from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/api/v1/userLogin', {
          email,
          password,
        });

      setMessage(response.data.message);

      // Clear email and password fields upon successful login
      if (response.status === 200) {
        setEmail('');
        setPassword('');
        setMessage("Successfully Login");
        setTimeout(() => {
          // window.location.reload();
          navigate('/monthly_transition');
      }, 1000);
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // HTTP error (e.g., 400 Bad Request)
        setMessage( error.response.data.message);
      } else if (error.message) {
        // Network error
        setMessage( error.message);
      } else {
        // Other unexpected errors
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
   <div className="login_page">
     <div className="login_page_flex">
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email : </label>
          <input
            className="form-control"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email" required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            className="form-control"
            type="password" // Change to password type
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password" required
          />
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
      </form>

      <p>{message}</p>

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
   </div>
  );
};

export default LoginPage;
