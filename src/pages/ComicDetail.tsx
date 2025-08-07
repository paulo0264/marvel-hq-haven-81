
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, BookOpen, Shield, Heart } from "lucide-react";
import { mockComics } from "@/data/comics";
import { Comic } from "@/types/comic";
import { useCart } from "@/hooks/useCart";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";

const ComicDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [comic, setComic] = useState<Comic | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadComic = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundComic = mockComics.find(c => c.id === parseInt(id || '0'));
      setComic(foundComic || null);
      setLoading(false);
    };

    if (id) {
      loadComic();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (comic) {
      addToCart(comic, quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  if (!comic) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-hero py-16 text-center">
          <h1 className="text-title mb-4">HQ não encontrada</h1>
          <p className="text-accent mb-8">A HQ que você procura não existe ou foi removida.</p>
          <Link to="/" className="btn-hero">
            Voltar à Loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container-hero py-8">
        {/* Breadcrumb */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-accent hover:text-primary transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Voltar à Loja</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Imagem */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent-light/20 to-transparent">
              <img
                src={comic.image}
                alt={comic.title}
                className="w-full h-[600px] object-cover animate-scale-in-bounce"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-lg text-sm font-semibold">
                {comic.category}
              </div>
              {comic.stock < 5 && (
                <div className="absolute top-4 right-4 bg-destructive text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  Últimas {comic.stock}
                </div>
              )}
            </div>

            {/* Galeria de Miniaturas (Simulada) */}
            <div className="flex space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-28 bg-accent-light rounded-lg border border-card-border opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <img
                    src={comic.image}
                    alt={`Preview ${i}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Informações */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-1 text-accent">
                  <Star className="w-5 h-5 fill-current text-yellow-400" />
                  <Star className="w-5 h-5 fill-current text-yellow-400" />
                  <Star className="w-5 h-5 fill-current text-yellow-400" />
                  <Star className="w-5 h-5 fill-current text-yellow-400" />
                  <Star className="w-5 h-5 fill-current text-yellow-400" />
                  <span className="ml-2 font-semibold">4.9 (127 avaliações)</span>
                </div>
              </div>
              
              <h1 className="text-title mb-4 animate-fade-in">{comic.title}</h1>
              
              <div className="text-4xl font-bold text-primary mb-6 animate-scale-in-bounce">
                R$ {comic.price.toFixed(2).replace('.', ',')}
              </div>
            </div>

            {/* Especificações */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-accent-light/50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-secondary">Páginas</span>
                </div>
                <span className="text-2xl font-bold text-accent">{comic.pages}</span>
              </div>
              
              <div className="bg-accent-light/50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-secondary">Estoque</span>
                </div>
                <span className="text-2xl font-bold text-accent">{comic.stock} un.</span>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <h3 className="font-semibold text-lg text-secondary mb-3">Sobre esta HQ</h3>
              <p className="text-accent leading-relaxed">{comic.description}</p>
            </div>

            {/* Controles de Compra */}
            <div className="space-y-6 p-6 bg-gradient-to-br from-accent-light/30 to-transparent rounded-2xl border border-card-border">
              <div className="flex items-center space-x-4">
                <label className="font-semibold text-secondary">Quantidade:</label>
                <div className="flex items-center space-x-3 bg-card border border-card-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-accent hover:text-primary transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-semibold text-secondary min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(comic.stock, quantity + 1))}
                    className="px-4 py-2 text-accent hover:text-primary transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={comic.stock === 0}
                  className="btn-hero flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Adicionar ao Carrinho</span>
                </button>
                
                <button className="btn-outline p-3 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center text-sm text-accent">
                <p>✓ Entrega rápida e segura</p>
                <p>✓ Garantia de qualidade Marvel</p>
                <p>✓ Suporte ao cliente 24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de HQs Relacionadas */}
        <section className="mt-20">
          <h2 className="text-title text-center mb-8">Você também pode gostar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockComics
              .filter(c => c.id !== comic.id && c.category === comic.category)
              .slice(0, 4)
              .map((relatedComic) => (
                <Link
                  key={relatedComic.id}
                  to={`/comic/${relatedComic.id}`}
                  className="card-product hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={relatedComic.image}
                    alt={relatedComic.title}
                    className="w-full h-48 object-cover rounded-xl mb-3"
                  />
                  <h3 className="font-semibold text-secondary mb-2 line-clamp-2">
                    {relatedComic.title}
                  </h3>
                  <div className="text-lg font-bold text-primary">
                    R$ {relatedComic.price.toFixed(2).replace('.', ',')}
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ComicDetail;
