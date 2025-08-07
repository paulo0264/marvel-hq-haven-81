
export interface Comic {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  pages: number;
  category: string;
  stock: number;
  isRare?: boolean;
}

export interface CartItem {
  comic: Comic;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
  discount: number;
  appliedCoupon?: Coupon;
}

export interface Coupon {
  code: string;
  type: 'common' | 'rare';
  discount: number; // porcentagem
  description: string;
}

export interface MarvelComic {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  prices: Array<{
    type: string;
    price: number;
  }>;
  series: {
    name: string;
  };
}

export interface MarvelApiResponse {
  code: number;
  status: string;
  data: {
    results: MarvelComic[];
    total: number;
    count: number;
    limit: number;
    offset: number;
  };
}
