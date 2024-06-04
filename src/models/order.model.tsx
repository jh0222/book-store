export interface Order {
  id: number;
  createdAt: Date;
  address: string;
  receiver: string;
  bookTitle: string;
  totalQuantity: number;
  totalPrice: number;
}

export interface OrderSheet {
  items: number[];
  totalQuantity: number;
  totalPrice: number;
  firstBookTitle: string;
  delibery: {
    address: string;
    receiver: string;
    contact: string;
  }
}