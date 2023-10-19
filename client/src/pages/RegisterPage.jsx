import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [message, setMessage] = useState('');
    let navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/userRegister',{
                email,
                password
            });
            if(response.status === 200){
                setMessage("Registration Successfully")
                // clear allFields 
                setEmail('');
                setPassword('');
                setTimeout(() => {
                    navigate('/monthly_transition')
                }, 1000);
            }
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }

    return (
        <div className="login_page">
            <div className="login_page_flex">
            <h1>Registration</h1>

            <form action="" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Email :</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" type="text" placeholder="Enter Your Email" required/>
                </div>

                <div className="form-group">
                    <label>Password : </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" placeholder="Enter Your Password" required/>
                </div>

                <button className="btn" type="submit">Submit</button>

            </form>
            {message && <p>{message}</p>}
        </div>
        </div>
    );
};

export default RegistrationPage;