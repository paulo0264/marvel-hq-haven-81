
import { ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

const Header = () => {
  const { cart } = useCart();

  console.log('Header - Estado do carrinho:', cart);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-card-border">
      <div className="container-hero">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-dark transition-colors duration-200">
              <span className="text-white font-orbitron font-black text-lg">M</span>
            </div>
            <div>
              <h1 className="font-orbitron font-black text-xl text-secondary">MARVEL</h1>
              <p className="text-xs text-accent font-medium -mt-1">COMICS STORE</p>
            </div>
          </Link>

          {/* Barra de Busca */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar HQs..."
                className="w-full pl-10 pr-4 py-2.5 bg-hover border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
            </div>
          </div>

          {/* Carrinho */}
          <Link 
            to="/carrinho" 
            className="flex items-center space-x-2 btn-outline relative group"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:block">Carrinho</span>
            {cart.itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-scale-in-bounce">
                {cart.itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
