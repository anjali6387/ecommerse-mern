import styled from "styled-components"
import SellingProduct from "./SellingProduct"
import {mobile, tabs} from '../Responsive'
import { useEffect, useState } from "react"
// import axios from "axios"
import { publicRequest } from "../requestMethods"

const Container = styled.div`
padding:20px;
display:flex;
flex-wrap:wrap;
justify-content:center;
`


const Head = styled.div`
${'' /* font-family: Palanquin; */}
font-family:Montserrat;
font-size:40px;
display:flex;
align-item:center;
${'' /* margin-top:60px; */}

justify-content:center;
font-weight:600;
text-transform:uppercase;
${mobile({fontSize:'20px',})}
${tabs({fontSize:'30px'})}
`

const SellingProducts = ({cat,filters,sort}) => {
  // console.log(cat,filters,sort)
const [products,setProducts] = useState([])
const [filteredProducts,setFilteredProducts] = useState([])

useEffect(()=>{
  const getProducts = async()=>{
    try{
      // const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` 
      //                                 : "http://localhost:5000/api/products" )
       const res = await publicRequest.get(cat ? `http://localhost:5000/api/products?category=${cat}`
                                         : "http://localhost:5000/api/products" )
      
      setProducts(res.data);
    }catch(err){
      console.log(err);

    }
  }
  getProducts();
},[cat])

// products && console.log(products)

useEffect(() => {

  cat && 
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
// console.log(filteredProducts)
}, [products, cat, filters]);



useEffect(() => {
  if (sort === "newest") {
    setFilteredProducts((items) =>
      [...items].sort((a, b) => a.createdAt - b.createdAt)
    );
  } else if (sort === "asc") {
    setFilteredProducts((items) =>
      [...items].sort((a, b) => a.price - b.price)
    );
  } else {
    setFilteredProducts((items) =>
      [...items].sort((a, b) => b.price - a.price)
    );
  }
}, [sort]);

  return (
 
    <>
      <Head>
     <span style={{borderBottom:'2px solid gray'}}>Our popular</span> <span style={{color:'white',background:'teal',padding:'0px 2px',marginLeft:'5px'}}>collection </span>
    </Head>

    <Container>
  
    {cat
        ? filteredProducts.map((item) => <SellingProduct item={item} key={item._id} />)
        : products
            .slice(0, 10)
            .map((item) => <SellingProduct item={item} key={item._id} />)}
    </Container>
    </>
  )
}


export default SellingProducts
