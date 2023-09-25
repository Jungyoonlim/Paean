import React from "react";
import { useState } from "react";
import "./styles.scss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import http from "../../utils/api";
import { Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRegister = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await http.post("/signup", { email, password });
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'You have successfully created an account',
                confirmButtonColor: '#221daf',
              }).then(() => navigate("/login"));
        } catch (err) {
            const errorMessage = err?.response?.data?.message || 'An error occurred. Please try again.';
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed!',
                text: errorMessage,
                confirmButtonColor: '#221daf',
            });  
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="register-page">
          <section>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <div className="login-card">
                    <h3>Create an account</h3>
                    <form onSubmit={handleRegister}>
                      {/* <div className="form-group">
                        <label>Full name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="form-control"
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div> */}
                      <div className="form-group">
                        <label>Email address</label>
                        <input
                          type="email"
                          placeholder="you@mail.com"
                          className="form-control"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          placeholder="password"
                          className="form-control"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <button className="btn btn-main btn-block mb-3" type="submit">
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                      </button>
                      <p>
                        Already have an account? <Link to="/login">Login</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );

}

export default Register;