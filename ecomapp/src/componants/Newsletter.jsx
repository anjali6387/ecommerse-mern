// import { Send } from "@material-ui/icons";
import styled from "styled-components";
// import { mobile } from "../responsive";
import { Send } from "@mui/icons-material";
import {mobile} from "../Responsive";

const Container = styled.div`
  height: 60vh;
  background-color:#F0FFF0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family:Montserrat;
  
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({fontSize:'50px'})}
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}

`;

const InputContainer = styled.div`
  width: 50%;
  height: 30px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 7;
  padding-left: 20px;
  outline:none;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  cursor:pointer;
  ${'' /* &:hover{
    background-color: black;
    cursor:pointer;
  } */}
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send/>
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;