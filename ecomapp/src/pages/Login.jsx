import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loginUser } from "../redux/apiCalls";
import { Link } from "react-router-dom";

import {mobile} from "../Responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: 
  linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
 
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  width:100%;
  flex-direction: column;

`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled{
    color:green;
    background-color:white;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
color:red;
`

const Span = styled.p`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  text-decoration:none;
  text-transform:uppercase;
`;

const Br = styled.br`
`

const Login = () => {
  
  const [username, setUsername] = useState("")
  const [password,setPassword] = useState("")
  const {isFetching,isError} = useSelector((state)=>state.user)
   
  const dispatch = useDispatch()


  const handleLogin = (e)=>{
    e.preventDefault();
    loginUser(dispatch,{username,password})

    // console.log("hellow")
  }

 
   
 
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username" type="text" onChange={(e)=>setUsername(e.target.value)} />
          <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
          <Button 
          // key={key}
          disabled={isFetching} 
          onClick={handleLogin} >LOGIN</Button>
          {isError?
          <Error>something went Wrong...</Error>:null}
         <Span>Don't have an account ? <Br/><Link to="/register">create an account</Link></Span>
        </Form>
      </Wrapper>
    </Container>
    
  );
};

export default Login;