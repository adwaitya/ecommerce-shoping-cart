import styled from "styled-components"

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`

const Image = styled.img`
  width:100%;
  height:100%;
  object-fit: cover;
  ${mobile({height:'30vh'})}
`
const Info = styled.div`
   position: absolute;
   height: 100%;
   width:100%;
   top: 0;
   left: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`

const Button = styled.button`
  border: none;
  background-color: white;
  padding:10px;
  color: gray;
  font-weight: 600;
  cursor:pointer;
`

const CategoryItem = ({item}: any) => {
  return (
    <Container>
      <Image src={item.img}>

      </Image>
      <Info>
          <Title>{item.title}</Title>
          <Button>Shop Now</Button>
      </Info>
    </Container>
  )
}

export default CategoryItem