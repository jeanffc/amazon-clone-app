import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card>
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>
          <Link to={`/products/${product.slug}`}>{product.title}</Link>
        </Card.Title>
        <Card.Subtitle>{product.variants[0].price}</Card.Subtitle>
        <Button variant="primary">Add</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
