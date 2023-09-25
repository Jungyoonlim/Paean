import { message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import React from 'react';
import Swal from "sweetalert2";
import http from "../../utils/api";
import "./styles.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setisSubmitting] = useState(false);

    const handleLogin = async(e:any) => {
        e.preventDefault()
        const payload = {
            email,
            password,
        };
        setisSubmitting(true);
    }

}