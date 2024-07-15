import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { article_detail } from "../../api/articles";
import {
  list_comments,
  create_comment,
  fetch_comment,
  delete_comment,
} from "../../api/comment";

import ProductModal from "../../components/modal/home/ProductModal";
import BottomQuest from "../../components/BottomNav/BottomQuest";
import card from "../../assets/card/card_sample.png";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";

import "./Product.css";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const article_pk = searchParams.get("detail");

  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력 상태
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editingCommentText, setEditingCommentText] = useState(""); // 수정 중인 댓글 텍스트

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const access = localStorage.getItem("access");
        if (!access) {
          throw new Error("액세스 토큰을 찾을 수 없습니다");
        }
        const data = await article_detail(article_pk, access);
        setArticle(data);
      } catch (err) {
        setError(err);
        console.error("게시물 정보를 가져오는 중 오류 발생:", err);
      }
    };

    if (article_pk) {
      fetchArticle();
    } else {
      console.error("게시물 ID가 정의되지 않았습니다");
    }
  }, [article_pk]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await list_comments(article_pk);
        setComments(data);
      } catch (err) {
        console.error("댓글 정보를 가져오는 중 오류 발생:", err);
      }
    };

    if (article_pk) {
      fetchComments();
    }
  }, [article_pk]);

  // const handleShowProductModal = () => {
  //   setShowProductModal(true);
  // };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    if (article?.product) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0
          ? article.product.product_images.length - 1
          : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (article?.product) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === article.product.product_images.length - 1
          ? 0
          : prevIndex + 1
      );
    }
  };

  const handleBackClick = () => {
    const fromBuyPage = location.state?.fromBuyPage || false;
    if (fromBuyPage) {
      navigate("/buy", { state: { ...location.state } });
    } else {
      navigate(-1);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const commentData = { comment: newComment }; // 서버가 기대하는 데이터 구조
      const data = await create_comment(article_pk, commentData);
      setComments([...comments, data]); // 새로운 댓글을 기존 댓글 리스트에 추가
      setNewComment(""); // 입력 필드 초기화
    } catch (err) {
      console.error(
        "댓글 등록 중 오류 발생:",
        err.response?.data || err.message
      );
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.comment);
  };

  const handleEditCommentChange = (e) => {
    setEditingCommentText(e.target.value);
  };

  const handleEditCommentSubmit = async () => {
    try {
      const access = localStorage.getItem("access");
      const modifiedData = { comment: editingCommentText };
      const data = await fetch_comment(
        article_pk,
        editingCommentId,
        modifiedData,
        access
      );
      setComments(
        comments.map((comment) =>
          comment.id === editingCommentId ? data : comment
        )
      ); // 수정된 댓글을 상태에 반영
      setEditingCommentId(null);
      setEditingCommentText("");
    } catch (err) {
      console.error(
        "댓글 수정 중 오류 발생:",
        err.response?.data || err.message
      );
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const access = localStorage.getItem("access");

      await delete_comment(article_pk, commentId, access);
      // 댓글 삭제 후 상태 업데이트
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error(
        "댓글 삭제 중 오류 발생:",
        err.response?.data || err.message
      );
    }
  };

  if (error) {
    return <div>오류: {error.message}</div>;
  }

  if (!article) {
    return <div>로딩 중...</div>;
  }

  const images = article.product?.product_images || [];
  const imageUrl = images[currentImageIndex]?.image_url || "기본이미지경로";

  return (
    <div className="Product">
      <div className="header-sec">
        <div className="back" onClick={handleBackClick}>
          <IoIosArrowBack size={26} />
        </div>
        <div className="title">제품 상세</div>
        {/* <div className="alarm">
          <HiOutlineDotsVertical size={26} onClick={handleShowProductModal} />
        </div> */}
        {showProductModal && (
          <ProductModal
            closeModal={handleCloseProductModal}
            article_pk={article_pk}
            user_id={article.user.id}
          />
        )}
      </div>
      <div className="total-info">
        <div className="photo-sec">
          <button className="arrow left" onClick={handlePrevImage}>
            <IoIosArrowBack size={26} />
          </button>
          <img
            src={imageUrl}
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
          {images.map((image, index) => (
            <img
              key={index}
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
            <div className="cate">
              <div className="top">{article.product.category.top_category}</div>
              <div>
                &nbsp;
                <IoIosArrowForward size={16} />
                &nbsp;
              </div>
              <div className="bottom">
                {article.product.category.bottom_category}
              </div>
            </div>
            <div className="name">{article.title}</div>
          </div>
          <div className="price">{article.product.price} 원</div>
          <div className="nickname" onClick={() => navigate(`/user`)}>
            @{article.nickname}
          </div>

          <div className="content">{article.content}</div>
        </div>
        {/* <div className="line"></div> */}
        {comments.map((comment) => (
          <div className="review-sec" key={comment.id}>
            <div className="photo">
              <img
                src={comment.user.profile_images.image_url || card}
                alt="card"
                className="card"
              />
            </div>
            <div className="info">
              <div className="nickname">@{comment.user.nickname}</div>
              {editingCommentId === comment.id ? (
                <div className="modify-sec">
                  <input
                    className="text"
                    type="text"
                    value={editingCommentText}
                    onChange={handleEditCommentChange}
                  />
                  <div className="modify-button">
                    <div className="save" onClick={handleEditCommentSubmit}>
                      저장
                    </div>

                    <div
                      className="cancel"
                      onClick={() => setEditingCommentId(null)}
                    >
                      취소
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text">{comment.comment}</div>
              )}
              <div className="bottom">
                <div className="time">
                  {new Date(comment.created_at).toLocaleString()}
                </div>
                <div className="like">♡ 좋아요</div>
                <div
                  className="modify"
                  onClick={() => handleEditComment(comment)}
                >
                  수정
                </div>
                <div
                  className="delete"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  삭제
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="comment-sec">
          <div className="info">
            <input
              type="text"
              placeholder="댓글을 입력해 주세요"
              value={newComment}
              onChange={handleCommentChange}
            />
            <div className="icon" onClick={handleCommentSubmit}>
              <GoArrowLeft size={24} />
            </div>
          </div>
        </div>
      </div>

      <BottomQuest
        article_id={article_pk}
        initialFavoriteCount={article.num_favorites}
        initialIsFavorited={article.is_favorited}
        access={localStorage.getItem("access")}
      />
    </div>
  );
};

export default Product;
