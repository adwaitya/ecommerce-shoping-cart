import { Add, Remove } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";

const Product = () => {
  const Container = styled.div``;
  const Wrapper = styled.div`
    padding: 50px;
    display: flex;
  `;

  const ImageContainer = styled.div`
    flex: 1;
  `;

  const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
  `;

  const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
  `;

  const Title = styled.h1`
    font-weight: 200;
  `;

  const Desc = styled.p`
    margin: 20px 0;
  `;

  const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
  `;

  const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
  `;

  const Filter = styled.div`
display: flex;
align-items: center;

`;

  const FilterTitle = styled.span`
   font-size: 20px;
   font-weight: 200;
  `;
  const FilterColor = styled.span`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=> props.color};
    margin: 0px 5px;
    cursor: pointer;
  `;
  const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
  `;
  const FilterSizeOption = styled.option`
   
  `;
  const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
  `;
  const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
  `;
  const Button = styled.button`
   padding: 15px;
   border: 2px solid teal;
   background-color: white;
   cursor: pointer;
   font-weight: 500;

   &:hover { 
    background-color: #f8f4f4;
   }
  `;
  

 
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImageContainer>
          <Image src="https:/i.ibb.co/S6qMxwr/jean.jpg" />
        </ImageContainer>
        <InfoContainer>
          <Title>Denim Jumsuit</Title>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
          </Desc>
          <Price>$20</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black"></FilterColor>
              <FilterColor color="darkblue"></FilterColor>
              <FilterColor color="gray"></FilterColor>
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
                <FilterSizeOption>XXL</FilterSizeOption>
              </FilterSize>
            </Filter>
           
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
                <Remove></Remove>
                <Amount>1</Amount>
                <Add/>
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>

      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
