import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import "./Signup.scss";
import { axiosClient } from "../../utils/axiosClient";
function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await axiosClient.post("/auth/signup", {
                name,
                email,
                password,
            });
            navigate("/login");
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="Signup">
            <div className="signup-box">
                <h2 className="heading">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="submit" className="submit" />
                </form>
                <p className="subheading">
                    Already have an account? <Link to="/login">Log In</Link>{" "}
                </p>
            </div>
        </div>
    );
}

export default Signup;
