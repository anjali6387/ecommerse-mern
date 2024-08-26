import styled from "styled-components"

const Container = styled.div`
${'' /* height:30px; */}
font-weight:500;
background-color:teal;
color:white;
display:flex;
align-item:center;
justify-content: center;
font-size: 14px;
padding:10px;
font-family:Montserrat;

`

const Announce = () => {
  return (
      <Container>
       Super Deal! Free Shipping on Orders Over Rs. 1,000/-
      </Container>
  
  )
}

export default Announce
