import { ArrowLeftOutlined,ArrowRightOutlined, PropaneSharp } from "@mui/icons-material"
import { useState } from "react"
import {sliderItems} from "../data"
import styled from "styled-components"
import {mobile,tabs} from "../Responsive"
import {Link} from "react-router-dom"
// import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';

const Container = styled.div`
width:100%;
height:100vh;
display:flex;
${'' /* background-color:coral; */}
overflow: hidden;
position:relative;

${mobile({ display:"none" })}
${tabs({ display:"none" })}


`
const Arrow = styled.div`
width:50px;
height:50px;
background-color:#fff7f7;
border-radius:50%;
display : flex;
align-items:center;
justify-content:center;
position:absolute;
top:0;            //to make arrow in middle;
bottom:0;        //to make arrow in middle;
left: ${ (props) => props.direction === "left" && "10px"}; //margin 10px from left
right: ${ (props) => props.direction === "right" && "10px"}; //margin 10px from right
margin:auto;  // to make arrow in middle;
cursor:pointer;
opacity:0.5;
z-index: 1;     // to avoid overlapping can be applied only on the elements have position absolute, relative, fixed or sticky
`

const Wrapper = styled.div`
height: 100%;
display: flex;
transition: all 1.5s ease;
transform: translateX(${ (props) => props.$index * -100}vw);
`

const Slides = styled.div`
width:100vw;
height:100vh;
display: flex;
align-items: center;
background-color: #${(props) => props.$bg};
`

const ImageContainer = styled.div`
${'' /* padding-top:100px; */}
  height: 100%;
  flex: 1;
  diplay:flex;
`
const Image = styled.img`
${'' /* height: 100%; */}
height:80%;
`
const InfoContainer = styled.div`
 flex: 1;
 padding:50px;
`
const Title = styled.h1`
font-size:50px;
`
const Discription = styled.p`
margin:50px 0px;
margin-right:10px;
font-weight:500;
font-size:20px;
letter-spacing:3px;
`
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: black;
    color:white;
  }
  `

const Slider = () => {

  const [slideInd, setSlideInd] = useState(0);
  const handleClick = (direction)=>{
    if(direction === "left"){
      setSlideInd(slideInd > 0 ? slideInd-1 : 2);
    }else{
      setSlideInd(slideInd < 2 ? slideInd+1 : 0);
    }
  };


  return  (
    <Container>

    <Arrow direction ="left" onClick={()=>handleClick("left")}>
    <ArrowLeftOutlined/>
    </Arrow>

    <Wrapper $index = {slideInd}>

    {sliderItems.map((item) => (
      <Slides $bg = {item.bg} key={item.id} >
    <ImageContainer>
    {/* <Image src="https://cdn.pixabay.com/photo/2015/09/19/01/03/woman-946699_1280.jpg" /> */}
    <Image src= {item.img} />
   

    </ImageContainer>

    <InfoContainer>
    <Title>{item.title}</Title>
    <Discription>{item.desc}</Discription>
   {/* <Link to={`/products/${item.saleType}`}> */}
   <Button>VIEW SALE</Button>
   {/* </Link>  */}
    </InfoContainer> 
    </Slides>

    ))}




    </Wrapper>
    <Arrow direction ="right" onClick={()=>handleClick("right")}>
    <ArrowRightOutlined/>
    </Arrow>

    </Container>
    
    

  )
}

export default Slider
