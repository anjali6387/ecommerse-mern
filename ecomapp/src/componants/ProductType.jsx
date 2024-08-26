import styled from "styled-components";
import { productItem } from "../data";
import {mobile,tabs} from "../Responsive"
import {Link} from "react-router-dom"




const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center; 
  flex-wrap:wrap;
  margin-bottom:50px;
  ${mobile({ padding: "0px", flexDirection:"column", alignItem:"center" })}

`;
const Wrapper = styled.div`
 ${'' /* flex: 1; */}
 width:19%;
  margin: 5px;
  height: 50vh;
  position: relative;
  transition:1s;


   &:hover {
  transform:scale(1.05);
  z-index:2;
  cursor:pointer;
  }
  ${mobile({width:"98%",height:"30vh" })}
  
  `
  
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${'' /* ${mobile({ height: "20vh" })} */}

`

const Info = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;

  `
const Title = styled.h1`
    color:black;
    margin-left:3px;
    opacity:0.6;
    margin-bottom: 15px;
    font-size:25px;
    ${mobile({ fontSize:"20px" })}
    `

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
    font-size:10px;

    
  &:hover {
    background-color: black;
    color:white;
  }
    `


const Head = styled.div`
${'' /* font-family: Palanquin; */}
font-family:Montserrat;
font-size:40px;
display:flex;
align-item:center;
${'' /* margin:0px 25px; */}
justify-content:center;
font-weight:600;
text-transform:uppercase;
${mobile({fontSize:'20px', padding:'40px 0px 20px 0px', margin:'0px'})}
${tabs({fontSize:'30px', padding:'30px 0px 20px 0px', margin:'0px'})}
`

const ProductType= () => {
  return (
    <>
    
    <Head>
     <span style={{borderBottom:'2px solid gray'}}>choose by</span> <span style={{color:'white',background:'teal',padding:'0px 2px',marginLeft:'5px'}}> category </span>
    </Head>
    <Container>
    
      {productItem.map((item) => (
       <Wrapper key={item.id}>
       <Link to = {`/products/${item.category}`}>
       <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
       
        <Button>SHOP NOW</Button>
        
      </Info>
      </Link>
       </Wrapper>
       

      ))}
    </Container>
    </>
  );
};

export default ProductType;