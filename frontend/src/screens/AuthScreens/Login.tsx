import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../utils/api";
import "./styles.scss";
import React from 'react';

const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { data } = await http.post("/login", { email, password });
            const { user } = data;

            window.localStorage.setItem('flashCardUser', JSON.stringify(user));

            Swal.fire({
                icon: 'success',
                title: 'Login successful.',
                text: 'You are successfully logged in.',
                confirmButtonColor: '#221daf',  
            }).then(() => {
                setIsSubmitting(false);
                navigate("/dashboard");
            });
        } catch (err) {
            const errorMessage = err?.response?.data?.message || 'An error occurred, please try again';
            Swal.fire({
                icon: 'error',
                title: 'Login Failed!',
                text: errorMessage,
                confirmButtonColor: '#221daf',
            });
            setIsSubmitting(false);
        }
    };
    return { email, setEmail, password, setPassword, isSubmitting, handleLogin };
};

const Login = () => {
    const { email, setEmail, password, setPassword, isSubmitting, handleLogin } = useLogin();

    return (
        <div className="login-page">
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="login-card">
                                <h3>Welcome Back.</h3>
                                <form onSubmit={handleLogin}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="you@mail.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <button className="btn btn-main btn-block mb-3" type='submit'>
                                        {isSubmitting ? 'Logging in...' : 'Login'}
                                    </button>
                                    <p>
                                        I don’t have an account?{" "}
                                        <Link to="/register">Create account</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
