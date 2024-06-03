import { render, screen } from "@testing-library/react"
import { BookStoreThemeProvider } from '../../context/themeContext';
import { Book } from "../../models/book.model";
import { formatNumber } from "../../utils/format";
import BookItem from './BookItem';

const dumyBook: Book = {
  id: 5,
  title: "콩쥐 팥쥐",
  img: 4,
  category_id: 0,
  form: "ebook",
  isbn: "4",
  summary: "콩팥..",
  detail: "콩심은데 콩나고..",
  author: "김콩팥",
  pages: 100,
  contents: "목차입니다.",
  price: 20000,
  likes: 1,
  pub_date: "2023-12-07"
}

describe("BookItem 컴포넌트 테스트", () => {
  it("렌더를 확인", () => {
    // 1. 렌더
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dumyBook} />
      </BookStoreThemeProvider>
    );

    // 2. 확인
    expect(getByText(dumyBook.title)).toBeInTheDocument();
    expect(getByText(dumyBook.summary)).toBeInTheDocument();
    expect(getByText(dumyBook.author)).toBeInTheDocument();
    expect(getByText("20,000원")).toBeInTheDocument();
    expect(getByText(dumyBook.likes)).toBeInTheDocument();
    expect(getByAltText(dumyBook.img)).toHaveAttribute("src", `https://picsum.photos/id/${dumyBook.img}/600/600`);
  });

})