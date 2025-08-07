
import { MarvelApiResponse, Comic } from '@/types/comic';

const MARVEL_PUBLIC_KEY = '79f8be1bd813e82ddc276c7638bbe80e';
// Privada: 98dc10f04fc113de039750a4cf2c2bb638b6570e
const MARVEL_BASE_URL = 'https://gateway.marvel.com/v1/public';

// Função para gerar hash MD5 usando uma biblioteca simples
const generateHash = async (ts: string, privateKey: string, publicKey: string): Promise<string> => {
  const message = ts + privateKey + publicKey;
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('MD5', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

// Função para obter a chave privada do localStorage
const getPrivateKey = (): string | null => {
  try {
    return localStorage.getItem('marvel_private_key');
  } catch (error) {
    console.error('Erro ao obter chave privada:', error);
    return null;
  }
};

export const fetchMarvelComics = async (limit: number = 20, offset: number = 0): Promise<Comic[]> => {
  try {
    const privateKey = getPrivateKey();
    const ts = Date.now().toString();
    
    let url: string;
    
    if (privateKey) {
      // Com chave privada, usar hash MD5
      const hash = await generateHash(ts, privateKey, MARVEL_PUBLIC_KEY);
      url = `${MARVEL_BASE_URL}/comics?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}&limit=${limit}&offset=${offset}&formatType=comic&noVariants=true&orderBy=-focDate`;
    } else {
      // Sem chave privada, tentar sem hash (limitado)
      url = `${MARVEL_BASE_URL}/comics?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&limit=${limit}&offset=${offset}&formatType=comic&noVariants=true&orderBy=-focDate`;
    }
    
    console.log('Fetching Marvel comics from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('Marvel API error:', response.status, response.statusText);
      throw new Error(`Marvel API error: ${response.status}`);
    }
    
    const data: MarvelApiResponse = await response.json();
    
    if (data.code !== 200) {
      throw new Error(`Marvel API returned error code: ${data.code}`);
    }
    
    // Converter dados da Marvel para o formato interno
    const comics: Comic[] = data.data.results.map((marvelComic, index) => {
      const price = marvelComic.prices.find(p => p.type === 'printPrice')?.price || 
                   marvelComic.prices[0]?.price || 
                   Math.random() * 40 + 10;
      
      return {
        id: marvelComic.id,
        title: marvelComic.title || 'Título não disponível',
        description: marvelComic.description || 'Descrição não disponível para esta HQ.',
        price: Math.round(price * 5.5 * 100) / 100,
        image: marvelComic.thumbnail 
          ? `${marvelComic.thumbnail.path}/portrait_incredible.${marvelComic.thumbnail.extension}`
          : 'https://images.unsplash.com/photo-1608889175250-c3b0c1667d2c?w=400&h=600&fit=crop',
        pages: marvelComic.pageCount || Math.floor(Math.random() * 30) + 20,
        category: marvelComic.series?.name || 'Marvel Comics',
        stock: Math.floor(Math.random() * 20) + 5,
        isRare: false
      };
    });
    
    // Marcar 10% das HQs como raras aleatoriamente
    const rareCount = Math.ceil(comics.length * 0.1);
    const shuffled = [...comics];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    for (let i = 0; i < rareCount && i < shuffled.length; i++) {
      shuffled[i].isRare = true;
      shuffled[i].price = Math.round(shuffled[i].price * 1.5 * 100) / 100;
    }
    
    console.log(`Loaded ${comics.length} comics, ${rareCount} marked as rare`);
    return comics;
    
  } catch (error) {
    console.error('Error fetching Marvel comics:', error);
    return [];
  }
};

// Função para salvar a chave privada
export const savePrivateKey = (privateKey: string): void => {
  localStorage.setItem('marvel_private_key', privateKey);
};

// Função para verificar se a chave privada está configurada
export const hasPrivateKey = (): boolean => {
  return !!localStorage.getItem('marvel_private_key');
};
