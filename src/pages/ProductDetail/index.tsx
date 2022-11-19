import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import _ from 'lodash';

import { useCart } from '../../hooks/cart';
import { CartItem, Product, Variant } from '../../types';

interface ProductDetailProps {
  slug: string;
}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { addItemToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product>();
  const [variant, setVariant] = useState<Variant>();
  const [selectedOptions, setSelectedOptions] = useState({});
  //   const [selectedImage, setSelectedImage] = useState('');
  let history = useHistory();

  const params = useParams<ProductDetailProps>();
  const { slug } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/v1/products/${slug}`);
        const data: Product = await response.json();

        setProduct(data);
        setVariant(data.variants[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    const variantFound = product?.variants?.find((val) => _.isEqual(val.option, selectedOptions));
    variantFound && setVariant(variantFound);
  }, [selectedOptions]);

  const addToCartHandler = () => {
    if (product && variant) {
      const cartItem: CartItem = {
        productId: product._id,
        variantId: variant._id,
        title: variant.title,
        image: product.image,
        price: variant.price,
        quantity: 1
      };
      addItemToCart(cartItem);
      history.push('/cart');
    }
  };

  const getOptionsByName = (name: string) => {
    const colourOptions = product?.options?.find((val) => val.name === name);

    return (
      colourOptions?.name &&
      colourOptions?.values &&
      colourOptions?.values.length > 0 && (
        <Form.Control
          as="select"
          // value={}
          name={colourOptions.name}
          onChange={(e) => {
            setSelectedOptions((state) => {
              return { ...state, [e.target.name]: e.target.value };
            });
          }}
        >
          <option>Select</option>
          {colourOptions.values.map((val) => (
            <option value={val}>{val}</option>
          ))}
        </Form.Control>
      )
    );
  };

  return (
    <div>
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
                  <ListGroup.Item>Price : ${variant?.price}</ListGroup.Item>
                  {product.options.find((val) => val.name === 'colour') && (
                    <ListGroup.Item>Colour : {getOptionsByName('colour')}</ListGroup.Item>
                  )}
                  {product.options.find((val) => val.name === 'material') && (
                    <ListGroup.Item>Material : {getOptionsByName('material')}</ListGroup.Item>
                  )}
                  {product.options.find((val) => val.name === 'custom') && (
                    <ListGroup.Item>
                      Customize :{' '}
                      <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Custom text" />
                      </Form.Group>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    Description:
                    <div dangerouslySetInnerHTML={{ __html: product.bodyHtml }}></div>
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
                          <Col>${variant?.price}</Col>
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
