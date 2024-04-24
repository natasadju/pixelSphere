import { useContext, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import {Button, Container, Form} from "react-bootstrap";

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userContext = useContext(UserContext);

    async function Login(e){
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if(data._id !== undefined){
            userContext.setUserContext(data);
        } else {
            setUsername("");
            setPassword("");
            setError("Invalid username or password");
        }
    }

    return (
        <Container className="py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                        <div className="card-body p-5 text-center">
                            <div className="mb-md-5 mt-md-4 pb-5">
                                <h2 className="fw-bold mb-2 text-uppercase">Login Form</h2>
                                <Form onSubmit={Login}>
                                    {userContext.user ? <Navigate replace to="/" /> : ""}
                                    <Form.Group className="mb-4">
                                        <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Group>
                                    <Button variant="outline-light" type="submit" className="btn-lg px-5">Log in</Button>
                                </Form>
                                {error && <p className="text-danger">{error}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Login;