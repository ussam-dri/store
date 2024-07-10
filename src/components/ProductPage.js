import React from 'react'
import ProdPage from './products/ProdPage'
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const { id } = useParams();

  return (
    <div>
<ProdPage ></ProdPage>

    </div>
  )
}

export default ProductPage