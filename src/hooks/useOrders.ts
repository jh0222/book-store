import { useEffect, useState } from "react"
import { fetchOrder, fetchOrders } from "../api/order.api";
import { OrderListItem } from "../models/order.model"

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedItemId, setSelectdItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  const selectOrderItem = (orderId: number) => {
    // 요청 방어
    if (orders.filter((item) => item.id === orderId)[0].detail) {
      setSelectdItemId(orderId);
      return;
    }

    fetchOrder(orderId).then((orderDetail) => { 
      setSelectdItemId(orderId);
      setOrders(
        orders.map((item) => {
          if(item.id === orderId) {
            return {...item, detail: orderDetail };
          } else {
            return item;
          }
        })
      );
    });
  };

  return { orders, selectedItemId, selectOrderItem }
};