import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router";
import CryptoJS from "crypto-js";


const LoginForm = () => {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [IsValid, setIsValid] = useState(false)
  const [checkPassword, setCheckPassword] = useState(false)
  const navigate = useNavigate();
  var testPassword;
  
  const usernameChange = (e) => {
    if (e.target.value === ""){
      e.preventDefault()
      setIsValid(false)

    } else {
      setUsername(e.target.value)
      setIsValid(true)
    }
  }

  const passwordChange = (e)  => {
    if (e.target.value === ""){
      e.preventDefault()
      setCheckPassword(false)

    } else {
      setPassword(e.target.value)
      setCheckPassword(true)
    }
  }

  const fetchUser = async(username) => {
    const user = {username: username}
    await fetch(`http://localhost:3000/login/username`, {
        method: "POST",
        headers: {
              "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
        }).then(res => {
          if(!res.ok){
              throw Error("Could not fetch Data")
          }
          return res.json();
        }).then(data => {
           testPassword = CryptoJS.SHA256(password + data.salt).toString()
        })
        .catch(error => {
            window.alert(error)
            return
        })
    
  }

  const sendHash = async(username, testPassword) => {
    const user = {username: username, hashedPassword: testPassword}
    await fetch(`http://localhost:3000/login/hash`, {
        method: "POST",
        headers: {
              "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
        }).then(res => {
          if(!res.ok){
              throw Error("Could not fetch Data")
          }
          return res.json();
        }).then(data => {
          if(data.test){
            
            navigate("/loggedIn")
          }
          else{
            console.log("HELLO")
          }
      })
      .catch(error => {
          window.alert(error)
          return
      })
  
  } 

  const onSubmit = async(e) => {
    e.preventDefault()
    await fetchUser(username)
    console.log(testPassword)
    await sendHash(username, testPassword)

  }

  return (
    <Form className='form' onSubmit={onSubmit}>
      <div className='login'>
        <h1>Login</h1>
      </div>
      <Form.Group as={Row} className="inputbox" controlId="formPlaintextUsername">
        <Col sm="10">
          <Form.Control 
            required
            type='text' 
            placeholder='UserName'
            onChange={usernameChange}
            isValid={IsValid}
            
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="inputbox" controlId="formPlaintextPassword">
        <Col sm="10">
          <Form.Control
           required
           type="password" 
           placeholder="Password"
           onChange={passwordChange} 
           isValid={checkPassword}
           />
        </Col>
      </Form.Group>
      <div className='items'>
        <button className='submitbtn'>Submit</button>
        <NavLink to="/newUser"  className="newUserLink">
          New User? Click Here
        </NavLink>
      </div>
        
    </Form>
  );
}

export default LoginForm;