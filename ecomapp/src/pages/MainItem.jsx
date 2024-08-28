import Navbar from '../componants/Navi'
import Announce from '../componants/Announce';
import Footer from '../componants/Footer';
import Newsletter from '../componants/Newsletter';
import styled from 'styled-components';
import { FavoriteBorderOutlined, LocalShippingOutlined, ShoppingBagOutlined} from '@mui/icons-material';
import { Add, Remove } from "@mui/icons-material";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist } from '../redux/apiCalls';
import {toast} from 'react-toastify'
import {mobile,tabs} from '../Responsive'
import { publicRequest } from '../requestMethods';

const Container = styled.div`

`
const Wrapper = styled.div`
display:flex;
padding:50px;
${mobile({padding:'20px',flexDirection:'column'})}

${tabs({flexDirection:'column',padding:'30px'})}

`
const ImageConatiner = styled.div`
flex:1;

`
const Image = styled.img`
width:100%;
height:90%;
object-fit: cover;
transition:1s;


&:hover {
  transform:scale(1.1);
  cursor:zoom-in;
  ${'' /* overflow:hidden; */}
  }

`
const InfoContainer = styled.div`
flex:1;
padding: 0px 50px;
${mobile({padding:'10px'})}
${tabs({padding:'20px'})}

`

const Rating = styled.div`
width:100px;
background-color:rgba(220,220,220,1);
z-index:4;
border-radius:2px;
display:flex;
align-item:center;
justify-content:center;
font-size:18px;
margin:20px 0px;
padding:5px;
font-weight:720;
color:black; 
`
// const Review = styled.div`
// padding-left:5px;
// `

const Info = styled.div`
margin-bottom:20px;

`

const Brand = styled.p`
font-size:30px;
font-weight:800;
margin-bottom:20px;
`
const Desc = styled.p`
font-size:17px;
font-weight:520;

margin-bottom:10px;
color:rgba(80,80,80,1);
opacity:1;
`

const PriceConatiner = styled.div`
display:flex;
margin-bottom:10px;
`
const Price = styled.div`
font-size:25px;
font-weight:600;
${mobile({fontSize:'20px'})}
`
const OldPrice = styled.div`
font-size:20px;
font-weight:500;
color:rgba(80,80,80,1);
margin-left:10px;
padding:1px;
${mobile({fontSize:'15px'})}

`
const Concession = styled.p`
font-size:20px;
font-weight:550;
margin-left:10px;
padding:1px;
color:red;
${mobile({fontSize:'15px'})}
`

const FilterContainer = styled.div`
  ${'' /* width: 50%; */}
  display: flex;
  flex-direction:column;
  justify-content: space-between;
`
const Filter = styled.div`
margin: 10px 0px;
display: flex;
align-items: center;

`

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`

const FilterText = styled.span`
font-size:16px;
margin-right:10px;
Text-transform:uppercase;
font-weight:560;
${mobile({fontSize:'15px'})}

`
const Select = styled.select`
padding:10px;
margin:0px 10px;
border-radius:20px;
color:#f50057;

${mobile({padding:'5px',margin:'0px 5px'})}
`




const Option = styled.option``



const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  border:1px solid gray;
  border-radius:2px;
  padding:2px 5px;
  ${mobile({ margin: "5px 10px" })}
`;



const ButtonContainer = styled.div`
display:flex;
margin:20px 0px;

${'' /* ${mobile({flexDirection:'column',alignItems:'center'})} */}


`


const Button = styled.button`
margin-right:10px;
padding:15px;
display:flex;
align-items:center;
justify-content:center;
font-size:16px;
font-weight:600;
color:white;
border:none;
text-transform:uppercase;
border-radius:5px;
background-color:transparent;
cursor:pointer;
border:1px  solid rgba(0,0,0,0.2);
width:40%;
${'' /* transition:0.2s; */}
${mobile({width:"50%",})}


&:hover{
  border:1px  solid rgba(0,0,0,0.5);
  transform:scale(0.95);

}


`
const DeleveryContainer = styled.div`
margin:20px 0px;
`
const SearchContainer = styled.div`


width: 50%;
  height: 30px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-item:center;
  border: 1px solid lightgray;
  padding:5px;
  border-radius:5px;
margin-top:20px;
${mobile({width:'100%'})}
`

const Input = styled.input`
 border: none;
 outline:none;
 margin:auto;
 ${mobile({margin:"0px"})}
`
const Span = styled.span`
text-transform:uppercase;
font-size:12px;
font-weight:900;
color:#f50057;
margin:auto;
${mobile({margin:"auto 0"})}
`


const MainItem = () => {


  const [mainItem,setMainItem] = useState({})
  const [quantity, setQuantity] = useState(1);
  const [color,setColor] = useState("")
  const [size,setSize] = useState("")
  const [click,setClick] = useState(false) 
  

  const location = useLocation()
  const id = location.pathname.split("/")[2];

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const nevigate = useNavigate()

  useEffect(()=>{

    const getMainItem = async()=>{
      try{
        // const res = await axios.get( "http://localhost:5000/api/products/find/"+id )

         const res = await publicRequest( "/products/find/"+id )

  
        setMainItem(res.data);
      }catch(err){
        console.log(err);
  
      }
    }
    getMainItem();
  },[id])


  

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const warn =(msg)=> toast.warn(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  useEffect(()=>{
    if(!size){(document.getElementById("itemSize").innerHTML = "please select a size");}
     else{
      document.getElementById("itemSize").innerHTML = "";
      setClick(false)
    }
    if(!color){document.getElementById("itemColor").innerHTML = "please choose a color";}
     else{
     document.getElementById("itemColor").innerHTML = "";
     setClick(false);
    }

    click 
    ? document.getElementById("cartBtn").innerHTML = "Added to Cart"
    : document.getElementById("cartBtn").innerHTML = "Add to cart"
   },[size,color,click])

  const handleClick = () =>{
    if(user.currentUser){


    if(size && color && !click){
      
        addToCart(dispatch,{...mainItem,quantity:quantity,color,size,userId:user.currentUser?._id})
    
        setClick(true)
         setSize("")
         setColor("")
        document.getElementById("cartBtn").style.cursor="not-allowed";

     }else{
     warn("please select size and color");
     }

    }else{
      nevigate("/login")
    }   
  }
  const handleWishlist=()=>{
    // console.log("adding to wish")
    console.log ({mainItem})
    if(user.currentUser){
      addToWishlist(dispatch,{...mainItem})
    }else{
      nevigate("/login")
    }
  }
  

  
  return (
    <Container>
      <Announce/>
    <Navbar/>
  

<Wrapper>
    <ImageConatiner>
    <Image src={mainItem.img} />
    </ImageConatiner>
    <InfoContainer>

      <Info>

      <Brand>{mainItem.title}</Brand>
      <Desc style={{fontSize:"20px"}}>{mainItem.desc}</Desc>


      {mainItem.rating ? 
    <Rating>
    
    {mainItem.rating ?  mainItem.rating +`★ | ` : null}
    {mainItem.review ? mainItem.review : null} 
    </Rating>
    : null}

      <hr/>
      </Info>




      <PriceConatiner>

      <Price>Rs. {mainItem.price}</Price>

       {
        mainItem.oldprice ?
        <OldPrice> MRP  <span style={{textDecoration: 'line-through'}}>{mainItem.oldprice}</span>  </OldPrice>
       : null
      }

      <Concession>{mainItem.oldprice ? `(` + parseFloat(mainItem.price*100/mainItem.oldprice).toFixed(2)+ `% OFF )` : ""}</Concession>
  
      </PriceConatiner>

      <Desc style={{color:"teal", fontWeight:"600"}}>inclusive of all taxes</Desc>

    

    <FilterContainer>
      <Filter>
        
         <FilterText>
         Select Size: 
         </FilterText>
         <Select onChange={(e)=>setSize(e.target.value)}>
         <Option defaultValue >Size</Option>
          {mainItem.size?.map((s)=>(
          <Option key={s} >{s}</Option>
           ))}
         </Select>

         <div id='itemSize' style={{color:"teal", fontWeight:"600", marginLeft:"10px"}}> </div>
         
        </Filter>
       
       
       <Filter>
        <FilterText>Select Color:</FilterText>

          {mainItem.color?.map((c)=>(
         <FilterColor color={c} key={c} onClick={()=>setColor(c)}/>
          ))}

          <div id='itemColor' style={{color:"teal", fontWeight:"600", marginLeft:"10px"}}> </div>
          
        </Filter>
        <Filter>

          <ProductAmountContainer>
            <FilterText>choose amount: </FilterText>
                  <Remove onClick={()=>handleQuantity("dec")}/>
                  <ProductAmount>{quantity}</ProductAmount>
                  <Add onClick={()=>handleQuantity("inc")} />
          </ProductAmountContainer>
       </Filter>

    </FilterContainer>



    <ButtonContainer >
    <Button style={{backgroundColor:"#f50057",border:"none"}} onClick={handleClick} id='cartBtn'> <ShoppingBagOutlined style={{fontSize:"24",marginRight:"10px"}}/>
    </Button>
    <Button style={{color:"black", }} onClick={handleWishlist}><FavoriteBorderOutlined style={{fontSize:"24",marginRight:"10px"}} /> Wishlist</Button>
    </ButtonContainer>

    <hr/>

    <DeleveryContainer>

    <FilterText style={{display:"flex",width:"200px"}} >
     Delivery options      
     <LocalShippingOutlined  style={{margin:"auto",fontSize:"20px"}}/>
     </FilterText>

    <SearchContainer>
      <Input placeholder="enter your PIN code" />
      <Span>check</Span>
    </SearchContainer>

    <Desc style={{fontSize:"14px", margin:"10px 0px 30px 0px",fontWeight:"500"}}>Please enter PIN code to check delivery time & Pay on Delivery Availability</Desc>
   
    <Desc>100% Original Products</Desc>
    <Desc>Pay on delivery might be available</Desc>
    <Desc>Easy 14 days returns and exchanges</Desc>
    </DeleveryContainer>

   

    
    </InfoContainer>



   
    
</Wrapper>

    <Newsletter/>
    <Footer/>
      
    </Container>
  )
}

export default MainItem
