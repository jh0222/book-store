import React from 'react'
import { render, screen } from "@testing-library/react"
import { BookStoreThemeProvider } from '../../context/themeContext';
import InputText from './InputText';

describe("Button 컴포넌트 테스트", () => {
  it("렌더를 확인", () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <InputText placeholder='여기에 입력하세요' />
      </BookStoreThemeProvider>
    );

    // 2. 확인
    expect(screen.getByPlaceholderText('여기에 입력하세요')).toBeInTheDocument();
  });

  it("forwardRef 테스트", () => {
    // 1. 렌더
    const ref = React.createRef<HTMLInputElement>();
    
    render(
      <BookStoreThemeProvider>
        <InputText placeholder='여기에 입력하세요' ref={ref} />
      </BookStoreThemeProvider>
    );

    // 2. 확인
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

})