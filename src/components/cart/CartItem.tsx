
import { Trash2, Plus, Minus, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { CartItem as CartItemType } from "@/types/comic";

interface CartItemProps {
  item: CartItemType;
  onRemove: (comicId: number) => void;
  onUpdateQuantity: (comicId: number, quantity: number) => void;
}

const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  return (
    <div className="card-product animate-scale-in">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Imagem */}
        <Link 
          to={`/comic/${item.comic.id}`}
          className="flex-shrink-0 relative"
        >
          <img
            src={item.comic.image}
            alt={item.comic.title}
            className="w-full sm:w-32 h-48 sm:h-40 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
          />
          {item.comic.isRare && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center space-x-1">
              <Crown className="w-3 h-3" />
              <span>RARA</span>
            </div>
          )}
        </Link>

        {/* Informações */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <Link 
                to={`/comic/${item.comic.id}`}
                className="text-lg font-semibold text-secondary hover:text-primary transition-colors duration-200 line-clamp-2"
              >
                {item.comic.title}
              </Link>
              <p className="text-accent text-sm mt-1">
                {item.comic.category} • {item.comic.pages} páginas
                {item.comic.isRare && (
                  <span className="ml-2 text-orange-500 font-semibold">• RARA</span>
                )}
              </p>
            </div>
            
            <button
              onClick={() => onRemove(item.comic.id)}
              className="text-accent hover:text-destructive transition-colors duration-200 p-2 hover:bg-accent-light rounded-lg"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            {/* Controles de Quantidade */}
            <div className="flex items-center space-x-3 bg-accent-light rounded-lg border border-card-border">
              <button
                onClick={() => onUpdateQuantity(item.comic.id, item.quantity - 1)}
                className="p-2 text-accent hover:text-primary transition-colors duration-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 py-2 font-semibold text-secondary min-w-[3rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.comic.id, item.quantity + 1)}
                className="p-2 text-accent hover:text-primary transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Preços */}
            <div className="text-right">
              <div className="text-sm text-accent">
                R$ {item.comic.price.toFixed(2).replace('.', ',')} cada
              </div>
              <div className="text-xl font-bold text-primary">
                R$ {(item.comic.price * item.quantity).toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
