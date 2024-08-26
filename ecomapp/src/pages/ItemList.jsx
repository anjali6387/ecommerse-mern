import styled from "styled-components"
import Navbar from '../componants/Navi'
import Announce from '../componants/Announce';
import Footer from '../componants/Footer';
import Newsletter from '../componants/Newsletter';
import SellingProducts from '../componants/SellingProducts';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {mobile} from "../Responsive"

const Container = styled.div`
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.h1`
  margin: 20px;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 16px;
  font-weight: 590;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;


const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border:none;

  &:hover{
    background-color:rgba(0,0,0,0.07);
    cursor:pointer;
    border-radius:20px;
  }

  
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option`
`;

const ItemList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filters,setFilters] = useState({})
  const [sort,setSort] = useState("What's New")



  const handleFilter = (e) =>{
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name] : value,
    })
  }
  // console.log(filters);

  return (
    <Container>
      <Announce/>
      <Navbar/>
      <Title>{category}</Title>
   
   <Wrapper>
   

   <Filter>
          <FilterText>FILTERS:</FilterText>
        
          <Select name="color" onChange={handleFilter}>
            <Option defaultValue >
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
            <Option>gray</Option>
            <Option>pink</Option>
          </Select>
          <Select name="size" onChange={handleFilter}>
            <Option defaultValue >
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>

          {/* <Select name="origin" onChange={handleFilter}>
            <Option defaultValue>
              country of Origin
            </Option>
            <Option>India</Option>
            <Option>All Countries</Option>
           
          </Select> */}

          {/* <Select  name="brand" onChange={handleFilter} >
            <Option defaultValue >
              Brand
            </Option>
            <Option>levis</Option>
            <Option>zara</Option>
           
          </Select> */}

        </Filter>

        <Filter >
          <FilterText>SORT BY:</FilterText>
          <Select onChange={(e)=>{setSort(e.target.value)}}>
            <Option value="newest" selected>What's New</Option>
            <Option value="asc" > Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
    
   </Wrapper>

      <SellingProducts cat={category} filters={filters} sort={sort}/>
      <Newsletter/>
      <Footer/>
    
    </Container>
  )
}

export default ItemList
