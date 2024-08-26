
import styled from "styled-components";
import Navbar from '../componants/Navi'
import Announce from '../componants/Announce';
import {  ClearOutlined, } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { deleteCartProductFailure, deleteCartProductStart, deleteCartProductSuccess } from '../redux/reduxCart';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import {findCart } from "../redux/apiCalls";
import { userRequest } from "../requestMethods";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import AddressForm from "../componants/AddressForm";
import {mobile,tabs} from '../Responsive'

import {Model} from '../componants/Model'

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile,tabs({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  ${mobile({ fontSize:'25px' })}
  ${tabs({ fontSize:'25px' })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};

  ${mobile({ margin: "0px 5px" })}
`;

const TopTexts = styled.div`
display:flex;
  ${mobile({ display: "none" })}
  ${tabs({flexDirection:'column' })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  ${tabs({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
  ${mobile({ display:'flex', flexDirection: "column" })}

`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding:10px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 160px;
  height:200px; 

`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span`
 word-break: break-all;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ flexDirection: "row" })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const RemoveProduct = styled.div`
padding:10px;
cursor:pointer;
${mobile({ position:'absolute',right:'0'})}
`

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Empty = styled.div`

height:100vh;
display:flex;
justify-content:center;
flex-direction:column;

`
const EmptyContent = styled.div`
align-item:center;
justify-content:center;
margin:10px auto;
`
const FilterText = styled.span`
font-size:20px;
color:rgba(0,0,0,0.6);
font-weight:500;
flex-wrap: wrap;

`
const ButtonEmpty = styled.button`
padding:20px;
font-size:20px;
font-weight:700;
color:black;
border:none;
text-transform:uppercase;
border-radius:5px;
background-color:transparent;
cursor:pointer;
border:1px  solid rgba(0,0,0,0.2);


&:hover{
  border:1px  solid rgba(0,0,0,0.5);
  transform:scale(0.9);

}`




const Cart = () => {

  const [products,setProducts] = useState([])
  // const [visible,setVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const cart = useSelector(state=>state.cart);
  const wishLength = useSelector(state=>state.wishlist.favProducts?.length)
  const navigate = useNavigate()
  // const myModel = new Model();
  
  

  let sc=50,sd=10;
  if(cart.totalPay > 1000 || cart.totalPay === 0){
    sc = 0; sd=0;
  }

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



 
  const handleRemove = async(item) =>{
    dispatch(deleteCartProductStart())
    try{  
      const payload = {
        productId:item._id,
        color:item.color,
        size:item.size,
        quantity:item.quantity,
       
      }
      console.log(payload)
      const res = await userRequest.delete(`/carts/remove/${user.currentUser._id}/${item._id}`,{data:payload}) 
      // console.log(res.data)
      setProducts(res.data)
      console.log(res.status)
     dispatch(deleteCartProductSuccess(payload))
     if(res.status===200){notify();}

  
    }catch(err){
      console.log(err);
      dispatch(deleteCartProductFailure())
    }
  }


useEffect(()=>{
  if(user.currentUser !== null){
  findCart(dispatch,user.currentUser._id)
  }
 },[products])
  

  return (
    <Container>
   <Announce/>
   <Navbar/>
   {cart.cartProducts.length !== 0 ? 
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
         <Link to="/home"> <TopButton>CONTINUE SHOPPING</TopButton> </Link>
          <TopTexts>
          <TopText>Shopping Bag({cart.cartProducts.length})</TopText>
           <Link to="/wishlist" style={{textDecoration: "none", color: 'black'}}> <TopText>Your Wishlist ({wishLength})</TopText> </Link>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>

          {cart.cartProducts?.map((item)=>(

         
            <Product key={item._id}>
              <ProductDetail>
              <Link to={`/product/${item._id}`}> <Image src={item.img} key={item.id} /> </Link> 
                <Details>
                  <ProductName >
                    <b>Product:</b> {item.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {item._id}
                  </ProductId>
                  <ProductColor color={item.color} key={item.id} />
                  <ProductSize>
                    <b>Size:</b> {item.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              
              <PriceDetail>
                <ProductAmountContainer>
                 
                  <ProductAmount><b>Quantity: </b>{item.quantity}</ProductAmount>
               
                </ProductAmountContainer>
                {/* <ProductPrice>Rs. {item.price}</ProductPrice> */}
                <ProductPrice>Rs. {item.price * item.quantity}</ProductPrice>
              </PriceDetail>
              <RemoveProduct>
               <button onClick={()=>handleRemove(item)} style={{border:"none"}}> <ClearOutlined /></button>
              </RemoveProduct>
            </Product>
           
          ))}
          <Hr />
            
          </Info>
          <Summary >
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem >
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.totalPay}</SummaryItemPrice>
            </SummaryItem>
            
           

            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. +{sc}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs. -{sd}</SummaryItemPrice>
            </SummaryItem>

           
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.totalPay + sc - sd}</SummaryItemPrice>
            </SummaryItem>


            <Button onClick={() => setIsOpen(true)}>CHECKOUT NOW</Button>
            
            <Model open={isOpen} onClose={() => setIsOpen(false)}><AddressForm /></Model>
         
      
        
           
          
          </Summary>
        </Bottom>
      </Wrapper>
      :
      <Wrapper>

<Empty>

<EmptyContent>
<FilterText style={{color:"black"}}><b>YOUR CART IS EMPTY</b></FilterText>
</EmptyContent>

<EmptyContent>
<FilterText>Oops! it feels so light. Please add some Weight .</FilterText>
</EmptyContent>

<EmptyContent>
  <img src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png' style={{height:"200px"}}/>
</EmptyContent>

<EmptyContent>
<ButtonEmpty onClick={()=>navigate("/")}>Continue Shopping</ButtonEmpty>
</EmptyContent>

</Empty>

      </Wrapper>
   } 
    
    </Container>
  );
};

export default Cart;