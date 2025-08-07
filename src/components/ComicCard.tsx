
import { Comic } from "@/types/comic";
import { ShoppingCart, Eye, Star, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

interface ComicCardProps {
  comic: Comic;
}

const ComicCard = ({ comic }: ComicCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Adicionando ao carrinho:', comic.title);
    addToCart(comic, 1);
  };

  return (
    <div className="card-product group animate-slide-up-fade">
      {/* Imagem */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        {/* <img
          src={comic.image}
          alt={comic.title}
          className="w-full h-auto rounded"
        /> */}
        <img
          src={comic.image}
          alt={comic.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Overlay de Ações */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex space-x-3">
            <Link
              to={`/comic/${comic.id}`}
              className="bg-card/90 backdrop-blur-sm p-3 rounded-full hover:bg-primary hover:text-white transition-all duration-200 transform hover:scale-110"
            >
              <Eye className="w-5 h-5" />
            </Link>
            <button
              onClick={handleAddToCart}
              className="bg-card/90 backdrop-blur-sm p-3 rounded-full hover:bg-primary hover:text-white transition-all duration-200 transform hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Badge de Rara */}
        {comic.isRare && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center space-x-1 shadow-lg">
            <Crown className="w-3 h-3" />
            <span>RARA</span>
          </div>
        )}

        {/* Badge de Stock */}
        {comic.stock < 5 && (
          <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-md">
            Últimas {comic.stock}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg text-secondary group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {comic.title}
          </h3>
          <div className="flex items-center space-x-1 text-accent">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm">4.8</span>
          </div>
        </div>

        <p className="text-accent text-sm line-clamp-2 leading-relaxed">
          {comic.description}
        </p>

        <div className="flex items-center justify-between text-sm text-accent">
          <span>{comic.pages} páginas</span>
          <div className="flex items-center space-x-2">
            {comic.isRare && (
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-md font-medium text-xs">
                RARA
              </span>
            )}
            <span className="bg-accent-light px-2 py-1 rounded-md font-medium">
              {comic.category}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-2xl font-bold text-primary">
            R$ {comic.price.toFixed(2).replace('.', ',')}
            {comic.isRare && (
              <span className="text-sm font-normal text-orange-500 block">
                +50% (Rara)
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={comic.stock === 0}
            className="btn-hero text-sm px-4 py-2 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
