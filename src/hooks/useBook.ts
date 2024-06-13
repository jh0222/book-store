import { addBookReview, fetchBookReview } from "@/api/review.api";
import { useEffect, useState } from "react"
import { fetchBook, likeBook, unLikeBook } from "../api/books.api";
import { addCart } from "../api/carts.api";
import { BookDetail, BookReviewItem, BookReviewItemWrite } from "../models/book.model";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { useToast } from "./useToast";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const { isloggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const { showToast } = useToast();

  const likeToggle = () => {
    // 권한 확인
    if(!isloggedIn) {
      showAlert("로그인이 필요합니다.");
      return;
    }

    if(!book) return;

    if(book.liked) {
      // 라이크 상태 -> 언라이크를 실행
      unLikeBook(book.id).then(() => {
        setBook({
          ...book,
          liked: false,
          likes: book.likes - 1,
        });
        showToast("좋아요가 취소되었습니다.")
      })
    } else {
      // 언라이크 상태 -> 라이크를 실행
      likeBook(book.id).then(() => {
        // 성공 처리
        setBook({
          ...book,
          liked: true,
          likes: book.likes + 1,
        });
        showToast("좋아요가 성공했습니다.")
      });
    }
  };

  const addToCart = (quantity: number) => {
    if(!book) return;

    addCart({
      book_id: book.id,
      quantity: quantity,
    }).then(() => {
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    })
  }

  useEffect(() => {
    if(!bookId) return;

    fetchBook(bookId).then((book) => {
      setBook(book);
    })

    fetchBookReview(bookId).then((reviews) => {
      setReviews(reviews)
    })
  }, [bookId])

  const addReview = (data: BookReviewItemWrite) => {
    if(!book) return;

    addBookReview(book.id.toString(), data).then((res) => {
      // fetchBookReview(book.id.toString()).then((reviews) => {
      //   setReviews(reviews)
      // })
      showAlert(res.message);
    })
  }

  return { book, likeToggle, addToCart, cartAdded, reviews, addReview };
}