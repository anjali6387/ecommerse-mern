import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {FavoriteBorderOutlined, Person2, Person2Outlined, Search, ShoppingCartOutlined} from "@mui/icons-material"
import Badge from '@mui/material/Badge';
import {mobile, tabs} from "../Responsive"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../redux/reduxUser';
// import { resetCart } from '../redux/reduxCart';
// import { resetWishlist } from '../redux/reduxWishlist';
import { userLogout } from '../redux/apiCalls';



const Container = styled.div`
height:60px;
font-family:Montserrat;
${'' /* display:none; */}
${mobile({ height: "50px" })}

`;

const Wrapper = styled.div`
${'' /* margin:20px; */}
padding:10px 20px;

display:flex;
align-items:center;
justify-content:space-between;
${mobile({ padding: "10px 0px" })}
${'' /* ${tabs({ padding: "10px 0px" })} */}
`;

const Left = styled.div`
flex:1;
display:flex;
align-item:center;
${'' /* justify-content:center; */}
${mobile({ display:"none" })}
${'' /* ${tabs({ display:"none" })} */}


 `;

const Lang= styled.span `
font-size:16px;
cursor:pointer;
margin:auto 0px;

${mobile({ display:"none" })}
${tabs({ display:"none" })}

`;
const SearchContainer = styled.div`
border:0.5px solid rgba(240, 240, 240,0.5);
width:70%;
border-radius:2px;
display:flex;
justify-content:space-between;
margin-left:25px;
padding:5px;
background-color:rgba(240, 240, 240,0.7);

${tabs({marginLeft:"10px"})}

`;

const Input = styled.input`
border:none;
background-color:transparent;
${tabs({ width: "30px" })}


`;

const Center = styled.div`
flex:1;
text-align:center;
 `;

const Logo = styled.h1`
font-size:26px;
 font-weight:bold;
 color: black;
 ${mobile({ fontSize:"20px" })}
 ${tabs({ fontSize:"22px" })}
 `;

const Right = styled.div` 
flex:1;
display:flex;
align-items:center;
justify-content:flex-end;
${mobile({ flex: 2, justifyContent: "center" })}
`;

const Menu = styled.div`
font-size:14px;
cursor:pointer;
margin:0px 12px;
text-decoration: none;

${mobile({ fontSize: "10px", marginLeft: "5px" })}
`

const Profile = styled.div`
display:flex;
flex-direction:column;
justify-content:start;
align-item:start;

;
`



const Navi = () => {

  const [login,setLogin] = useState(false);
  // console.log(login)
 
  const quantity = useSelector((state=>state.cart.cartQuantity)) //cart is cart from store.js
  // console.log(Cart);
  const user = useSelector((state) => state.user);
  
const dispatch = useDispatch()

const handleLogout = ()=>{
  userLogout(dispatch)
}



const linkStyle = {
 
  textDecoration: "none",
  color: 'black',
}


useEffect(()=>{
  const isLogin = JSON.parse(localStorage.getItem("isLogged"));
  setLogin(isLogin)
})
  return (
    
    <Container>
    <Wrapper>
    <Left>
    <Lang>English</Lang>
    <SearchContainer>
      <Input placeholder="Search for products" style={{outline: "none"}} />
      <Search style={{color:"gray", fontSize:16,}}/>
    </SearchContainer>
    </Left>

    <Center>
    <Logo>ShopEZ.</Logo>
     </Center>

      <Right>

    { !login &&  <Link to = "/register" style={linkStyle} >
          <Menu>REGISTER</Menu></Link> }

    {!login && <Link to = "/login" style={linkStyle}><Menu> SIGN IN </Menu></Link> }
    
        <Link to="/wishlist" style={linkStyle} > <Menu ><FavoriteBorderOutlined style={{fontSize:"18px"}}/> </Menu></Link>
         
          <Menu>
          <Link to = "/cart" style={linkStyle}>
          <Badge badgeContent={quantity} color="primary">
          <ShoppingCartOutlined style={{fontSize:"18px"}}/>
          </Badge>
          </Link> 
          </Menu>

         
     {   login &&  <Menu><button style={{background:"none", border:"none"}} onClick={handleLogout}>LOGOUT</button></Menu>}

       { login &&
       
       <Profile>
       <Menu>
         <Person2 style={{color:"rgba(0,0,0,0.7)", paddingLeft:'5px'}}/>
         </Menu>
         <Menu>
          {user.currentUser?.username}
          </Menu>
  
        </Profile>
       
       }
      </Right>
 

   
    </Wrapper>
    </Container>

  );
};

export default Navi
