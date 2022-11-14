import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CartItem, Product } from '../../types';
import { useCart } from '../../hooks/cart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItemToCart } = useCart();
  let history = useHistory();

  const addToCartHandler = () => {
    if (product) {
      const cartItem: CartItem = {
        productId: product._id,
        variantId: product.variants[0]._id,
        title: product.variants[0].title,
        image: product.image,
        price: product.variants[0].price,
        quantity: 1
      };
      addItemToCart(cartItem);
      history.push('/cart');
    }
  };

  return (
    <Card>
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>
          <Link to={`/products/${product._id}`}>{product.title}</Link>
        </Card.Title>
        <Card.Subtitle>{product.variants[0].price}</Card.Subtitle>
        <Button variant="primary" onClick={addToCartHandler}>
          Add
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
