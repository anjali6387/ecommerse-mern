import React, { useEffect} from 'react'
import styled from 'styled-components';
import Navi from '../componants/Navi';
import Announce from '../componants/Announce';
import Footer from '../componants/Footer'
import WishlistProduct from '../componants/WishlistProduct';
import { useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { findWishlist } from '../redux/apiCalls';



const Container = styled.div`

`;


const TopTexts = styled.div`
margin:20px 20px;
  ${'' /* ${mobile({ display: "none" })} */}
`;
const TopText = styled.span`
  margin: 0px 10px;
  font-size:20px;
  font-weight:600;

`;

const Wrapper = styled.div`
  padding: 20px;
  display:flex;
  flex-direction:column;
`;

const FavItems = styled.div`
display:flex;
flex-wrap:wrap;

`

// const ProductContainer
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
const Button = styled.button`
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

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  const wishlist = useSelector((state)=>state.wishlist)

 
  useEffect(()=>{
    getProducts();
    if(user.currentUser !== null){
    findWishlist(dispatch,user.currentUser._id)
    console.log(wishlist.favProducts)
    }
   },[])

  
  return (

   <Container>
   <Navi/>
   <Announce/>



{wishlist.favProducts.length ?
  <Wrapper>
  <TopTexts>
    <TopText>
    My Wishlist ({wishlist.favProducts.length}) item
    </TopText>
  </TopTexts>
  
<FavItems>
  {wishlist.favProducts.map((item) => <WishlistProduct item={item} key={item._id} />)}
</FavItems>
  
  </Wrapper>

:
 
<>
<Wrapper>
<Empty>

<EmptyContent>
<FilterText style={{color:"black"}}><b>YOUR WISHLIST IS EMPTY</b></FilterText>
</EmptyContent>

<EmptyContent>
<FilterText>Add items that you like to your wishlist. Review them anytime and easily move them to the bag.</FilterText>
</EmptyContent>

<EmptyContent>
  <img src='https://www.pavejewelers.com/assets/images/empty-wishlist.png' alt='sad list' style={{height:"200px"}}/>
</EmptyContent>

<EmptyContent>
<Button onClick={()=>navigate("/")}>Continue Shopping</Button>
</EmptyContent>

</Empty>
</Wrapper>

</>
}


  
   <Footer/>
   </Container>
   
  )
}

export default Wishlist
