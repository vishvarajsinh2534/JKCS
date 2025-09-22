import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <Card className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <Badge 
              variant={product.inStock ? "default" : "destructive"} 
              className="text-xs"
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-electric-blue transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Brand:</span> {product.brand}
          </div>
          
          <div className="text-2xl font-bold text-electric-blue">
            ₹{product.price.toLocaleString()}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(product)}
          className="flex-1"
        >
          <Eye className="h-4 w-4 mr-2" />
          Details
        </Button>
        <Button
          variant="electric"
          size="sm"
          onClick={() => addItem(product)}
          disabled={!product.inStock}
          className="flex-1"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};