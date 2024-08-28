import styled from "styled-components"
import {FavoriteBorderOutlined, } from '@mui/icons-material';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { addToWishlist } from "../redux/apiCalls";


const IconContainer = styled.div`
position:absolute;
opacity:0;
z-index:5;
display: flex;
  align-items: center;
  justify-content: center;
  background-color:white;
  width:80%;
  height:8%;
  padding:5px;
  top:79.33%;
  left:7%;
  right:7%;
  border:1px solid gray;
  border-radius:5px;
  color:rgba(0,0,0,0.7);
  font-size:14px;
  font-weight:600;
 cursor:pointer;
  text-transform:uppercase;
  transition:  all 0.5s ease;
`


const Effect = styled.div`
width:100%;
height:100%;
background-color: rgba(0, 0, 0, 0.1);
position:absolute;
z-index:3;
top:0;
left:0;
opacity:0;
`

const Info = styled.div`

${'' /* width:320px; */}
padding:3px;
position: relative;
margin:0;
`

const Brand = styled.p`
text-transform:uppercase;
font-size:18px;
font-weight:800;
margin:5px;
`
const Desc = styled.p`


font-size:14px;
font-weight:500;
margin:5px;
color:rgba(80,80,80,1);
opacity:1;
word-wrap: break-word;
`

const Container = styled.div`
margin: 5px;
margin-bottom:20px;
width: 230px;
${'' /* max-width:300px; */}
height: 320px;
align-items: center;
justify-content: center;
background-color:white;
position: relative;
cursor:pointer;

&:hover ${Effect}{
opacity:1;
}  
&:hover ${IconContainer}{
  opacity:1;
}
&:hover ${Brand}{
opacity:0;
}  
&:hover ${Desc}{
opacity:0;
}  
`
const Image =  styled.img`
top:0;
height: 75%;
width:230px;
z-index: 2;
object-fit: cover;
opacity:1;
  `


const Rating = styled.div`
background-color:rgba(240,240,240,0.7);
${'' /* left:0; */}
bottom:25%;
position:absolute;
z-index:4;
border-radius:2px;
display:flex;
align-item:center;
justify-content:center;
font-size:10px;
margin-left:10px;
margin-bottom:5px;
padding:5px;
font-weight:720;
color:black; 
`
const Button = styled.div``


const PriceConatiner = styled.div`
display:flex;
margin:5px;
`
const Price = styled.p`
font-size:18px;
font-weight:520;
`
const OldPrice = styled.p`
font-size:14px;
font-weight:500;
color:rgba(80,80,80,1);
margin-left:3px;
padding:1px;
text-decoration-line:line-through;
`
const Concession = styled.p`
font-size:14px;
font-weight:500;
margin-left:3px;
padding:1px;
color:red;
`
 


const SellingProduct = ({item}) => {

  const [wishbtn,setWishbtn]=useState("Wishlist")
 const [wishlisted,setWishlisted] = useState(false)
 const user = useSelector((state) => state.user);
//  console.log(user.currentUser)
 const navigate = useNavigate();
  // console.log(item._id)
  
 const dispatch = useDispatch()

  const handleWish = (item) => {
    console.log(item._id)
    console.log("hello wish")
    
if(user.currentUser){
  if(!wishlisted){
    // console.log(item)
  addToWishlist(dispatch,item)
      setWishlisted(true);
      setWishbtn("wishlisted")
  }else{
    alert("already wishlisted")
  }
}else{
navigate("/login")
}
 
    


  }
  return (
    <Container> 
    <Image src={item.img} />
  
    {item.rating ? 
    <Rating>
    
    {item.rating ?  item.rating +`★ | ` : null}
    {item.review ? item.review : null} 
    </Rating>
    : null}
 
      <Info>
      
      <Brand>{item.title}</Brand>
      <Desc>{item.desc}</Desc>
      <PriceConatiner>
      <Price>Rs. {item.price}</Price>
      <OldPrice>{item.oldprice ? item.oldprice : ""}</OldPrice>
      <Concession>{item.oldprice ? `(` + parseFloat(item.price*100/item.oldprice).toFixed(2) + `% OFF )` : ""}</Concession>
      </PriceConatiner>

     </Info>
     
     <Button onClick={()=>handleWish(item)}  >
     <IconContainer>
     {wishlisted ?<FavoriteBorderOutlined style={{paddingRight:8,fontWeight:500,color:"red"}}/>:
     <FavoriteBorderOutlined style={{paddingRight:8,fontWeight:500}}/>
     }
      {wishbtn}
      </IconContainer>
      </Button>
     

      <Link to = {`/product/${item._id}`}>
      <Effect>
      </Effect>
      </Link>
      
    </Container>
 
  )
}

export default SellingProduct
