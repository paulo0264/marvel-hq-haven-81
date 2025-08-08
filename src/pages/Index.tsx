import { useState, useEffect, useCallback } from "react";
import { fetchMarvelComics, hasPrivateKey } from "@/services/marvelApi";
import { Comic } from "@/types/comic";
import ComicCard from "@/components/ComicCard";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import Header from "@/components/Header";
import MarvelApiKeyForm from "@/components/MarvelApiKeyForm";
import { Zap, Shield, Star } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const Index = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [showKeyForm, setShowKeyForm] = useState(false);

  // 👇 Correção: memoizando loadComics com useCallback
  const loadComics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;
      const marvelComics = await fetchMarvelComics(ITEMS_PER_PAGE, offset);

      if (marvelComics.length === 0) {
        throw new Error("Sem resultados da API");
      }

      setComics(marvelComics);
    } catch (err) {
      console.error("Erro ao carregar HQs:", err);
      setError("Erro ao carregar HQs da Marvel. Usando dados de demonstração.");

      const { mockComics } = await import("@/data/comics");
      const comicsWithRarity = mockComics.map((comic) => ({
        ...comic,
        isRare: Math.random() < 0.1,
      }));
      comicsWithRarity.forEach((comic) => {
        if (comic.isRare) {
          comic.price = Math.round(comic.price * 1.5 * 100) / 100;
        }
      });
      setComics(comicsWithRarity.slice(0, ITEMS_PER_PAGE));
    } finally {
      setLoading(false);
    }
  }, [currentPage]); // 👈 Correção: currentPage como dependência

  // 👇 Correção: useEffect com loadComics na dependência
  useEffect(() => {
    if (!hasPrivateKey()) {
      setShowKeyForm(true);
      setLoading(false);
      return;
    }
    loadComics();
  }, [loadComics]);

  const handleKeyFormSubmit = () => {
    setShowKeyForm(false);
    loadComics();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showKeyForm) {
    return <MarvelApiKeyForm onKeySaved={handleKeyFormSubmit} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent-light/30 to-background py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.1),transparent_70%)]"></div>
        <div className="container-hero relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-scale-in-bounce">
              <Zap className="w-4 h-4" />
              <span>Loja Oficial Marvel</span>
            </div>

            <h1 className="text-hero mb-6 animate-slide-up-fade">COMICS MARVEL</h1>

            <p className="text-subtitle mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Descubra as melhores histórias em quadrinhos dos seus heróis favoritos. Aventuras épicas, arte incrível e os personagens que conquistaram o mundo.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-accent">
              <div className="flex items-center space-x-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-medium">Entrega Segura</span>
              </div>
              <div className="flex items-center space-x-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <Star className="w-5 h-5 text-primary" />
                <span className="font-medium">Qualidade Premium</span>
              </div>
              <div className="flex items-center space-x-2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-medium">HQs Raras Disponíveis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <main className="container-hero py-16">
        <div className="text-center mb-12">
          <h2 className="text-title mb-4">Explore Nosso Catálogo</h2>
          <p className="text-accent max-w-2xl mx-auto">
            HQs direto da Marvel! Incluindo edições raras e exclusivas.
            {/* {error && (
              <span className="block text-yellow-600 mt-2 text-sm">⚠️ {error}</span>
            )} */}
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid-products">
              {comics.map((comic, index) => (
                <div key={comic.id} style={{ animationDelay: `${index * 100}ms` }}>
                  <ComicCard comic={comic} />
                </div>
              ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={9999} onPageChange={handlePageChange} />
          </>
        )}

        {/* Stats */}
        <section className="mt-20 py-16 bg-gradient-to-r from-accent-light/50 to-transparent rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">{comics.length}+</div>
              <div className="text-accent font-medium">HQs Disponíveis</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">{comics.filter((c) => c.isRare).length}</div>
              <div className="text-accent font-medium">Edições Raras</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">4.9</div>
              <div className="text-accent font-medium">Avaliação Média</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
