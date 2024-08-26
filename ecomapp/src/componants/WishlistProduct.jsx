import styled from "styled-components"

import { Link } from "react-router-dom"
import { ClearOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import {removeWishlistItemSuccess } from "../redux/reduxWishlist"
import { userRequest } from "../requestMethods";
import { useEffect, useState } from "react"
import { findWishlist } from '../redux/apiCalls';
import { toast } from 'react-toastify';



const Effect = styled.div`
width:100%;
height:100%;
background-color: rgba(0, 0, 0, 0.1);
position:absolute;
z-index:1;
top:0;
left:0;
opacity:0;
`

const Container = styled.div`
margin: 5px;
${'' /* padding:5px; */}
margin-bottom:20px;
min-width: 230px;
height: 320px;
align-items: center;
justify-content: center;
background-color:white;
position: relative;
cursor:pointer;

&:hover ${Effect}{
opacity:1;
}   
`
const Image =  styled.img`
top:0;
height: 75%;
width:230px;
z-index: 0;
object-fit: cover;
opacity:1;
position:relative;
  `

  const RemoveProduct = styled.div`
 top:5px;
 right:0px;
 border:1px solid transparent;
 z-index:2;
 
 

  position:absolute;
  `
  const Button = styled.button`
   border:none;
   background-color:rgba(255,255,255,0.8);

 `

  const Info = styled.div`
padding:3px;
${'' /* position: relative; */}
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
`

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

const WishlistProduct = ({item}) => {
    const dispatch = useDispatch()
    const [products, setProducts] = useState([]);
    const user = useSelector((state) => state.user)
    const notify = () => toast.success("item removed successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
      });


    const handleRemove = async(item) => {

    // console.log(item)
    const res = await userRequest.delete(`/wishlist/remove/${user.currentUser._id}/${item._id}`);
    // console.log(res.data)
    setProducts(res.data);
    // console.log(res.status);
    dispatch(removeWishlistItemSuccess(res.data))
    if(res.status===200){ notify();}
    }

    useEffect(()=>{
      findWishlist(dispatch,user.currentUser._id)
    },[products])

  return (
    <Container> 
    <Image src={item.img} />
    <RemoveProduct>
      <Button onClick={()=>handleRemove(item)}><ClearOutlined style={{fontSize:"20px"}}/></Button>
    </RemoveProduct>
     
     <Info>
      
      <Brand>{item.title}</Brand>
      <Desc>{item.desc}</Desc>
      <PriceConatiner>
      <Price>Rs. {item.price}</Price>
      <OldPrice>{item.oldprice ? item.oldprice : ""}</OldPrice>
      <Concession>{item.oldprice ? `(` + parseFloat(item.price*100/item.oldprice).toFixed(2) + `% OFF )` : ""}</Concession>
      </PriceConatiner>

     </Info>
     

      <Link to = {`/product/${item._id}`}>
      <Effect>
      </Effect>
      </Link>
      
    </Container>
  )
}

export default WishlistProduct
