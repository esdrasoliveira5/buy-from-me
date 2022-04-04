import React, { useContext } from 'react';
import buyFromMeContext from '../context/AppContext';
import { ProductContainerStyled } from '../styles/HomePageStyles';
import Product from './Product';
import SearchBar from './SearchBar';

function ProductsContainer() {
  const { products } = useContext(buyFromMeContext);
  return (
    <div>
      <SearchBar />
      <ProductContainerStyled>
        {products
          ? products.map(({ name, id, price }) => <Product name={name} id={id} price={price} />)
          : []}
      </ProductContainerStyled>
    </div>
  );
}

export default ProductsContainer;
