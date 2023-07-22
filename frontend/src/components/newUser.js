import { useState } from 'react';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import CryptoJS from "crypto-js";



const Validation = () => {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameIsInvalid, setUsernameIsInvalid] = useState(false)
    const [password, setPassword] = useState("");
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [passwordDontMatch, setPasswordDontMatch] = useState(false);
    const [msgCheck, setMsgCheck] = useState(false);
    
    const navigate = useNavigate();
    const regExp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/;
    const passwordMsg = "Minimum one upper letter, number and special charater. 6-20 characters";
    var hashedPassword =""
    var saveSalt =""
    

    const HandleChange = (e) => { 
        e.preventDefault()
        setPassword(e.target.value)
        console.log(e.target.value)
        console.log(regExp.test(e.target.value))

        if (!regExp.test(e.target.value)) {
            setUserMessage("Password is not valid")  
            setPasswordIsInvalid(true)
            setMsgCheck(false)  
        } else{
            setPasswordIsInvalid(false)
            setMsgCheck(true)
        }          
    }

    const PasswordChange = (e) => {
        if (password !== e.target.value){
            setUserMessage("Password don't match")
            setPasswordDontMatch(true)
        } else {
            setPasswordDontMatch(false)
        }
    }

    const UsernameChange = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
        console.log(e.target.value)

        if (e.target.value === ""){
            setUserMessage("Enter username")
            setUsernameIsInvalid(true)
        } else {
            setUsernameIsInvalid(false)
        }
    }

    const passwordEncrypt = async (pass) => {
        var salt = CryptoJS.lib.WordArray.random(128 / 8);
        saveSalt = salt.toString()
        hashedPassword = CryptoJS.SHA256(pass + salt).toString()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        
        
        if (form.checkValidity() === false) {
            setPasswordIsInvalid(false)
            setPasswordDontMatch(false)
            setUsernameIsInvalid(false)
            setMsgCheck(false)
            e.preventDefault();
            e.stopPropagation();
            return
        }
        
        setValidated(true)
        passwordEncrypt(password)
        
        const newUser = {username: username, hashedPassword: hashedPassword, saveSalt: saveSalt}

        console.log(newUser)
        await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then (res => {
            if(res.status === 409){
                throw res
            } else{
                navigate("/") 
                return res.json();  
            }
            
        })
        .catch(res => {
            window.alert("Username already in use!")
            return
        })
           
    }
    
    return (
        <Container className='newUserForm'>
            <Row>
                <Form className='newuser' noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="8" controlId="validationCustom01">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder=" Enter UserName"
                            onChange={UsernameChange}
                            value={username}
                            isInvalid={usernameIsInvalid}
                        />
                        <Form.Control.Feedback type='invalid'>{userMessage}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="8" controlId="validationCustom02">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            required
                            type="password"
                            placeholder="Enter Password"
                            onChange={HandleChange}
                            value={password}  
                            isInvalid={passwordIsInvalid}                     
                            />
                            <small className='req1'>{!msgCheck && passwordMsg}</small>
                            <small className='req2'>{msgCheck && passwordMsg}</small>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="8" controlId="secondpasswordValidation">
                        <Form.Label>Re-Enter Password</Form.Label>
                            <Form.Control
                            required
                            type="password"
                            placeholder="Re-Enter Password"
                            onChange={PasswordChange}
                            isInvalid={passwordDontMatch}     
                        />
                            <Form.Control.Feedback type="invalid">
                                {userMessage}
                            </Form.Control.Feedback>
                        </Form.Group>
    
                        <Form.Label>Role</Form.Label>
                            <Form.Group as={Col} md="4" controlId="formRole" className="mb-3">
                                <Form.Select>
                                    <option>Admin</option>
                                    <option>Employee</option>
                                    <option>Customer</option>
                                </Form.Select>
                            </Form.Group>
                        
                    <Button type="submit">Submit form</Button>
                </Form>
            </Row>
        </Container>
    );
}
 
export default Validation;
