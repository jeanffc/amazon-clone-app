import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useCart } from '../../hooks/cart';

const Cart = () => {
  const { cartItems, removeItemFromCart, increase, decrease, handleCheckout } = useCart();

  const calcSumItems = () => {
    const sumItems = cartItems.reduce((a, c) => a + c.quantity, 0);
    return sumItems;
  };

  const calcSubtotal = () => {
    const subtotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
    return subtotal.toFixed(2);
  };

  return (
    <div>
      <Container>
        <h1>Cart</h1>
        <Row>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </>
            ) : (
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.variantId}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img src={item.image} alt={item.title} className="img-fluid rounded img-thumbnail" />
                        <Link to={`/products/${item.productId}`}>{item.title}</Link>
                      </Col>
                      <Col md={3}>
                        <Button onClick={() => decrease(item)} variant="light">
                          <i className="fas fa-minus-circle"></i>
                        </Button>{' '}
                        <span>{item.quantity}</span>{' '}
                        <Button onClick={() => increase(item)} variant="light">
                          <i className="fas fa-plus-circle"></i>
                        </Button>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                      <Col md={2}>
                        <Button onClick={() => removeItemFromCart(item.variantId)} variant="light">
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>
                      Subtotal ({calcSumItems()} items) : {calcSubtotal()}
                    </h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        type="button"
                        variant="primary"
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                      >
                        Create Order
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
