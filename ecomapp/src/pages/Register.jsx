import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { registerUser } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import { mobile } from "../Responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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
  ${'' /* flex-wrap: wrap; */}
  flex-direction:column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 0px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Span = styled.p`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  text-decoration:none;
  text-transform:uppercase;
`;

const Register = () => {
  const dispatch = useDispatch();
  const [name,setName] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  const newUser = useSelector((state)=>state.user.newUser)
  const naviagte  = useNavigate()

  const handleRegister= (e)=>{
    e.preventDefault();
    registerUser(dispatch,{name,username,email,password})
    newUser && naviagte("/login")
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" type="text"  onChange={(e)=>setName(e.target.value)} />
          <Input placeholder="username" type="text" onChange={(e)=>setUsername(e.target.value)} required/>
          <Input placeholder="email" type="email" onChange={(e)=>setEmail(e.target.value)} required />
          <Input placeholder="password"  type="password" onChange={(e)=>setPassword(e.target.value)} required/>
          {/* <Input placeholder="confirm password" /> */}

          <Span>already have an account ? <Link to="/login">Login</Link></Span>

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>

        
          <Button onClick={handleRegister}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;