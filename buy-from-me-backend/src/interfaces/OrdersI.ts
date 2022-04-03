export type OrderBuyerOrSeller = {
  buyerId?: string;
  sellerId?: string;
};

export type OrderData = {
  productsId: number;
  buyerId: string;
  sellerId: string;
};
