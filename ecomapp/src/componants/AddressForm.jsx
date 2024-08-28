
import styled from "styled-components";
import { useState } from "react";




const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  
  padding: 10px;
  width:100%;
 
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  width:100%;
  flex-wrap: wrap;


`;

const Input = styled.input`

  margin: 10px ;
  padding: 10px;
  border:1px solid black;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

`;





const AddressForm = ()=>{
    const [name,setName] = useState("")
    const [number,setNumber] = useState()
    // const [locality,setLocality] = useState("")
    const [address,setAddress] = useState("")
    const [city,setCity] = useState("")
    const [state,setState] = useState("")
    const [pin,setPin] = useState("")
    const [landmark,setLandmark] = useState("")
    // const [isOpen, setIsOpen] = useState(false)

    const onAddressSubmit = (e) => {
        // e.preventDefault();
        const payload = {
          address: {
            name,
            number,
            pin,
            // locality,
            address,
            city,
            state,
            landmark,
          },

          
        };

        const  result = payload.address;
        const contact = result.name+ " , " + result.number;
        const addressD = result.address+ " "+result.landmark + " " + result.city +" " +result.state +" " +result.pin ;
        alert("Congratulations! your item has been ordered at \n" + contact +"\n"+ addressD);

       
       
      };

return(
   <Container>


    <Wrapper>
  
      <Title>Address Details </Title>
       
      <Form onSubmit={onAddressSubmit}>
        <Input placeholder="name" type="text" onChange={(e)=>setName(e.target.value)} />
        <Input placeholder="mobile number" type="number" onChange={(e)=>setNumber(e.target.value)} />
        <Input placeholder="pincode" type="text" onChange={(e)=>setPin(e.target.value)}/>
        {/* <Input placeholder="Flat, House no., Building, Company, Apartment" type="text" onChange={(e)=>setLocality(e.target.value)}/> */}
        <Input placeholder="Area, Street, Sector, Village" type="text" onChange={(e)=>setAddress(e.target.value)}/>
        <Input placeholder="landmark" type="text" onChange={(e)=>setLandmark(e.target.value)}/>
        <Input placeholder="city" type="text" onChange={(e)=>setCity(e.target.value)}/>
        <Input placeholder="state" type="text" onChange={(e)=>setState(e.target.value)}/>
        <Button type="submit">Confirm Order</Button>
      
       
      </Form>

    
      
    </Wrapper>
    </Container>

)
}
export default AddressForm;

