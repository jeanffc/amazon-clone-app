import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types';

const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/v1/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <>Product List</>
      <Row>
        {loading && <Spinner animation="border" />}
        {!loading &&
          products?.map((product) => (
            <Col sm={6} md={4} lg={3} className="mb-3">
              <ProductCard product={product} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default ProductList;
