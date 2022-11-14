import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from '../../components/Header';
import { Product } from '../../types';

interface ProductDetailProps {
  slug: string;
}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product>();
  //   const [selectedImage, setSelectedImage] = useState('');

  const params = useParams<ProductDetailProps>();
  const { slug } = params;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/v1/products/${slug}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  const addToCartHandler = () => {};

  return (
    <div>
      <Header />
      <Container>
        <h1>Product Detail</h1>
        <Row>
          {loading && <Spinner animation="border" />}
          {product && (
            <>
              <Col md={6}>
                <img className="img-large" src={product?.image} alt={product?.title}></img>
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h1>{product.title}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>Price : ${product.variants[0]?.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description:
                    <p>{product.bodyHtml}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>${product.variants[0]?.price}</Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button onClick={addToCartHandler} variant="primary">
                            Add to Cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;
