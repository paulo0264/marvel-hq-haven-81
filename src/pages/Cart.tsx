
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import Header from "@/components/Header";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-hero py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-accent" />
            </div>
            <h1 className="text-title mb-4">Seu carrinho está vazio</h1>
            <p className="text-accent mb-8">
              Adicione algumas HQs incríveis ao seu carrinho e comece sua jornada heroica!
            </p>
            <Link to="/" className="btn-hero">
              Explorar HQs
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const hasRareItems = cart.items.some(item => item.comic.isRare);
  const hasCommonItems = cart.items.some(item => !item.comic.isRare);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container-hero py-8">
        {/* Header do Carrinho */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="btn-ghost flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Continuar Comprando</span>
            </Link>
            <div className="h-6 w-px bg-card-border"></div>
            <h1 className="text-title">Meu Carrinho ({cart.itemCount} itens)</h1>
          </div>
          
          {cart.items.length > 0 && (
            <button
              onClick={clearCart}
              className="btn-ghost text-destructive hover:bg-destructive hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar Carrinho
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Itens */}
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => (
              <CartItem
                key={item.comic.id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <CartSummary 
              cart={cart} 
              hasRareItems={hasRareItems} 
              hasCommonItems={hasCommonItems} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
