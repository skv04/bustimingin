import Header from "./Header";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import './styles/Signin.css';
function Signin() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error,setError]=useState("");
  const navigate=useNavigate();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://bustimingin-backend.onrender.com/signin", {
        Email,
        Password,
      });
      setError(response.data.error);
      if(response.data.message){
        alert(response.data.message);
        navigate("/");
      }
      
    } catch (error) {
      console.error("Error Occurs while Genering sign in!");
    }
  };
  return (
    <div style={{paddingTop:'150px'}}>
      <Header />
      
      <div className="card1">
        <h1>Sign in</h1>
      <div className="signin">
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" className="submit" onClick={handleSubmit} />
        <p>
          New Account?<Link to="/Signup">Sign Up</Link>
        </p>
      </div>
      <p>
          {Error && <p>{Error}</p>}
        </p>
      </div>
    </div>
  );
}

export default Signin;
