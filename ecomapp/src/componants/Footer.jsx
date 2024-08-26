import { Apple, Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter, YouTube } from "@mui/icons-material";
import styled from "styled-components"

import {mobile, tabs} from "../Responsive"

const Container = styled.div`

margin: 100px 40px;
margin-bottom:0;
color : rgba(0,0,0,0.65);
${'' /* font-family:Montserrat; */}



`
const Wrapper = styled.div`
display: flex;
align-item:center;
justify-content:center;
margin-bottom:20px;
${mobile({ flexDirection: "column" })}
${tabs({ flexDirection: "column" })}

`
const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${mobile({ marginBottom:"15px"})}
  ${tabs({marginBottom:"15px" })}
  `

  const Desc = styled.p`
   margin:30px 0px;
    
  `;

  const IconContainer = styled.div`
  display:flex;
  margin:10px 0px;
  `
  const Icon = styled.div`
   width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  transition:1s;

&:hover {
  transform:scale(0.9);
cursor:pointer;

  }

  `

const Left = styled.div`
flex: 1;
  display: flex;
  flex-direction: column;
  ${mobile({ marginBottom:"15px"})}
  `

const Title = styled.h5`
  margin-bottom: 30px;
  color:rgba(0,0,0,0.8);
  text-transform:uppercase;
  ${mobile({ marginBottom:"15px"})}
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  `

const ContactItem = styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;
word-break: keep-all;
`;

const Payment = styled.img`
    width: 50%;
`;

const Box = styled.div `
flex:1;
display:flex;
width:100%;
height:20%;
margin-bottom:30px;
${mobile({ marginBottom:"15px"})}
`
const DownloadOn  = styled.button`
background-color:black;
border-radius:5px;
margin:5px 10px 0px 0px;
padding :0px 5px;
display:flex;
align-item:center;
justify-content:center;
position:relative;
cursor:pointer;
border:none;
box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

transition:1s;

&:hover {
  transform:scale(0.9);
cursor:pointer;

  }
  ${'' /* ${tabs({ width:"60%"})} */}

`


const Text = styled.p`
margin:5px;
color:white;
font-size:10px;
`

const Span = styled.p`
font-size:16px;
${mobile({ fontSize:"12px"})}
`

const Content = styled.div`
${mobile({ display:"none" })}
`


const CopyRight = styled.div`
width:100%;
text-align:center;
jutify-content:center;

`

const Footer = () => {
  return (
    <Container>
    <Wrapper>

      <Left>
      <Title>Useful Links</Title>
      <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Left>

      <Center>
      <Title>Experience ShopEZ. app on mobile</Title>

        <Box>
      
          <DownloadOn> 

          <img src="https://www.freepnglogos.com/uploads/play-store-logo-png/play-store-five-educational-android-apps-for-chromebooks-5.png" style={{width:"35px",height:"35px",margin:"auto"}}></img>
          
            <Text>get it from
             <Span>Google Play</Span>
            </Text>

          </DownloadOn>

           <DownloadOn>

          <Apple style={{color:"white",margin:"auto"}}/>
         
            <Text> 
            download on the
            <Span>App Store</Span>
            </Text>

            </DownloadOn>
          
        </Box>

         <Title style={{marginBottom:"10px"}}>keep in touch</Title>

        <IconContainer>
            <Icon color="E4405F">
          <Instagram/>
            </Icon>
            <Icon color="3B5999" >
              <Facebook/>  
            </Icon>
           
            <Icon color="E60023">
                <YouTube/>
            </Icon>
            <Icon color="55ACEE">
           <Twitter/>
            </Icon>
            <Icon color="E60023">
                <Pinterest/>
            </Icon>
        </IconContainer>
      </Center>

      <Right>
      <Title>Contact</Title>
      <ContactItem>
          <Room style={{marginRight:"10px"}}/> 
          Madan Mohan Malaviya University of Technology, Gorakhpur, 273010
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/>
           +91 63871 81045
        </ContactItem>
        <ContactItem>
          <MailOutline  style={{marginRight:"10px"}} /> 
          anjligupta4004@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>



      </Wrapper>
      
      <Content>
      <Title>
      ONLINE SHOPPING MADE EASY AT Shopez.
      </Title>
      <Desc>
        If you would like to experience the best of online shopping for women in India, you are at the right place. ShopEZ. is the ultimate destination for fashion and lifestyle, being host to a wide array of merchandise including clothing, accessories, jewellery, personal care products and more. It is time to redefine your style statement with our treasure-trove of trendy items. Our online store brings you the latest in designer products straight out of fashion houses. You can shop online at Myntra from the comfort of your home and get your favourites delivered right to your doorstep.
        </Desc>
      
      </Content>


      <CopyRight>
      <hr/>
        <p style={{padding:"15px 0px",fontSize:"14px", letterSpacing:"2px"}}>
        © 2024 Developed By <span ><a className='hover:underline' href="https://github.com/anjali6387" target="_blank" style={{textDecoration:"none",color:"rgba(0,0,0,0.65)"}}>Anjali</a></span> 
        </p>
      </CopyRight>

    </Container>

 

    
  )
}

export default Footer
