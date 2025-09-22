import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { UserDetails } from '@/types/user';

interface CartProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// --- ADD THIS FUNCTION TO SEND DATA TO PHP/MYSQL ---
const saveOrderToServer = async (user: UserDetails, order: any[]) => {
  try {
    const res = await fetch("http://localhost/shop/save_order.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, order }),
    });

    const data = await res.json();
    if (data.success) {
      console.log("✅ Order saved with ID:", data.order_id);
    } else {
      console.error("❌ Failed:", data.error);
    }
  } catch (e) {
    console.error("Network error:", e);
  }
};


export const Cart = ({ isOpen, onOpenChange }: CartProps) => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const [user, setUser] = useState<UserDetails | null>(null);

  // --- MODIFY THIS FUNCTION ---
  const handleWhatsAppCheckout = async () => {
    if (!user || state.items.length === 0) return;

    // Save to server
    await saveOrderToServer(
      user,
      state.items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        category: item.product.category,
      }))
    );

    // WhatsApp message
    const orderDetails = state.items.map(item =>
      `${item.product.name} - Qty: ${item.quantity} - ₹${(item.product.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const total = `\nTotal: ₹${state.total.toLocaleString()}`;
    const userDetails = `Name: ${user.name}\nMobile: ${user.mobile}\nCompany: ${user.company}\nAddress: ${user.address}`;
    const message = `*Order Request*\n\n${userDetails}\n\n${orderDetails}${total}\n\nPlease confirm availability and delivery details.`;

    const whatsappNumber = '+918320079222'; // <-- Your WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    clearCart();
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({state.items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 border border-border rounded-lg">
                    <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium text-sm leading-tight">{item.product.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">{item.product.category}</Badge>
                      </div>
                      <div className="text-sm font-semibold text-blue-600">
                        ₹{item.product.price.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state.items.length > 0 && (
            <>
              <Separator />
              <div className="py-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-blue-600">₹{state.total.toLocaleString()}</span>
                </div>
                {!user ? (
                  <LoginForm onSubmit={setUser} />
                ) : (
                  <div className="space-y-2">
                    <div className="p-2 bg-muted rounded text-sm">
                      <div><b>Name:</b> {user.name}</div>
                      <div><b>Mobile:</b> {user.mobile}</div>
                      <div><b>Company:</b> {user.company}</div>
                      <div><b>Address:</b> {user.address}</div>
                      <button className="text-xs text-blue-600 underline mt-1" onClick={() => setUser(null)}>Edit</button>
                    </div>
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={handleWhatsAppCheckout}
                    >
                      Checkout via WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};