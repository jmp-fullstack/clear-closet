import React, { useState } from "react";
import { postArticle } from "../../api/articles"; // 경로는 실제 파일 위치에 맞게 수정하세요

const PostArticle = () => {
  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    product: {
      option: {
        size: "",
        color: "",
      },
      category: {
        top_category: "",
        bottom_category: "",
      },
      price: "",
      product_type: 1,
      product_image: [],
      product_status: "",
    },
  });

  const handleArticleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split(".");
    setArticleData((prevData) => ({
      ...prevData,
      product: {
        ...prevData.product,
        [mainKey]: {
          ...prevData.product[mainKey],
          [subKey]: value,
        },
      },
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setArticleData((prevData) => ({
      ...prevData,
      product: {
        ...prevData.product,
        product_image: files,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postArticle(articleData);
      console.log("Article posted successfully:", response);
      // 게시글 등록 성공 후 필요한 동작을 추가하세요 (예: 페이지 이동)
    } catch (error) {
      console.error("Failed to post article:", error);
    }
  };

  return (
    <div className="article-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={articleData.title}
          onChange={handleArticleChange}
        />
        <textarea
          name="content"
          placeholder="본문"
          value={articleData.content}
          onChange={handleArticleChange}
        />
        <input
          type="text"
          name="product.option.size"
          placeholder="사이즈"
          value={articleData.product.option.size}
          onChange={handleProductChange}
        />
        <input
          type="text"
          name="product.option.color"
          placeholder="색상"
          value={articleData.product.option.color}
          onChange={handleProductChange}
        />
        <input
          type="text"
          name="product.category.top_category"
          placeholder="상위 카테고리"
          value={articleData.product.category.top_category}
          onChange={handleProductChange}
        />
        <input
          type="text"
          name="product.category.bottom_category"
          placeholder="하위 카테고리"
          value={articleData.product.category.bottom_category}
          onChange={handleProductChange}
        />
        <input
          type="number"
          name="product.price"
          placeholder="가격"
          value={articleData.product.price}
          onChange={handleProductChange}
        />
        <select
          name="product.product_status"
          value={articleData.product.product_status}
          onChange={handleProductChange}
        >
          <option value="">상품 상태</option>
          <option value="사용감 있는 새상품">사용감 있는 새상품</option>
          <option value="중고상품">중고상품</option>
        </select>
        <input type="file" multiple onChange={handleImageChange} />
        <button type="submit">게시글 등록</button>
      </form>
    </div>
  );
};

export default PostArticle;
