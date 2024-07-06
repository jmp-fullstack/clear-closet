import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { article_detail } from "../../api/articles";

import ProductModal from "../../components/modal/home/ProductModal";
import BottomQuest from "../../components/BottomNav/BottomQuest";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";

import "./Product.css";

const Product = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const article_pk = searchParams.get("detail");

  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    console.log("Current URL:", window.location.href);
    console.log("searchParams:", searchParams.toString());
    console.log("article_pk:", article_pk);
  }, [searchParams, article_pk]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const access = localStorage.getItem("access");
        if (!access) {
          throw new Error("Access token not found");
        }
        const data = await article_detail(article_pk, access);
        setArticle(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching article detail:", err);
      }
    };

    if (article_pk) {
      fetchArticle();
    } else {
      console.error("Article ID is undefined");
    }
  }, [article_pk]);

  const handleProductClick = (article_pk) => {
    navigate(`/product?detail=${article_pk}`);
  };

  const handleUserClick = () => {
    navigate(`/user`);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!article) {
    return <div>Loading...</div>;
  }

  const handleShowProductModal = () => {
    setShowProductModal(true);
  };
  const handleCloseProductModal = () => {
    setShowProductModal(false);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0
        ? article.product.product_images.length - 1
        : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === article.product.product_images.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  const articles = [];

  return (
    <div className="Product">
      <div className="header-sec">
        <div className="back" onClick={() => navigate(-1)}>
          <IoIosArrowBack size={26} />
        </div>
        {articles.map((article) => (
          <div key={article.id} onClick={() => handleProductClick(article.id)}>
            <p>{article.title}</p>
          </div>
        ))}
        <div className="title">{article.title}</div>
        <div className="alarm">
          <HiOutlineDotsVertical size={26} onClick={handleShowProductModal} />
        </div>
        {showProductModal && (
          <ProductModal closeModal={handleCloseProductModal} />
        )}
      </div>

      <div className="photo-sec">
        <button className="arrow left" onClick={handlePrevImage}>
          <IoIosArrowBack size={26} />
        </button>
        <img
          src={article.product.product_images[currentImageIndex].image_url}
          alt="Product"
          className="card"
          width={355}
          height={355}
        />
        <button className="arrow right" onClick={handleNextImage}>
          <IoIosArrowForward size={26} />
        </button>
      </div>

      <div className="thumbnail-sec">
        {article.product.product_images.map((image, index) => (
          <img
            key={image.id}
            src={image.image_url}
            alt="Thumbnail"
            className={`thumbnail ${
              index === currentImageIndex ? "active" : ""
            }`}
            onClick={() => handleImageClick(index)}
            width={45}
            height={45}
          />
        ))}
      </div>

      <div className="product-sec">
        <div className="info">
          <div className="name">{article.title}</div>
        </div>
        <div className="nickname" onClick={handleUserClick}>
          @{article.user}
        </div>
        <div className="price">{article.product.price} 원</div>
      </div>
      <div className="content">{article.content}</div>
      <BottomQuest />
      {/* <BottomNav /> */}
    </div>
  );
};

export default Product;
