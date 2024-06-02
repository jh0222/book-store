export interface Order {
  id: number;
  createdAt: Date;
  address: string;
  receiver: string;
  bookTitle: string;
  totalQuantity: number;
  totalPrice: number;
}