import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import card from "../../assets/card/card_sample.png";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import "./User.css";
import NameModal from "../../components/modal/my/NameModal";

const User = () => {
  const navigate = useNavigate();
  const [showNameModal, setShowNameModal] = useState(false);

  const handleShowNameModal = () => {
    setShowNameModal(true);
  };
  const handleCloseNameModal = () => {
    setShowNameModal(false);
  };

  const handleProductClick = (article_pk) => {
    navigate(`/product?detail=${article_pk}`);
  };

  const articles = []; // 필요시 여기에 articles 데이터를 채워넣으세요.

  return (
    <div className="User">
      <div className="header-sec">
        <div className="left">
          <IoIosArrowBack size={26} onClick={() => navigate(-1)} />
        </div>
        {articles.map((article) => (
          <div key={article.id} onClick={() => handleProductClick(article.id)}>
            <p>{article.title}</p>
          </div>
        ))}
        <div className="right">프로필</div>
      </div>
      <div className="profile-sec">
        <div className="photo">
          <img src={card} alt="Card" className="card" />
        </div>
        <div className="userId">@username</div>
      </div>
      <div className="interest-sec">
        <div className="text">관심 지수</div>
        <div className="line"></div>
      </div>
      <div className="content-sec">
        <div className="sell-product">
          <div>판매 상품</div>
          <div className="arrow" onClick={handleShowNameModal}>
            <IoIosArrowForward size={20} />
          </div>
          {showNameModal && <NameModal closeModal={handleCloseNameModal} />}
        </div>
        <div className="sell-product">
          <div>받은 매너 평가</div>
          <div className="arrow" onClick={handleShowNameModal}>
            <IoIosArrowForward size={20} />
          </div>
          {showNameModal && <NameModal closeModal={handleCloseNameModal} />}
        </div>
        <div className="sell-product">
          <div>리뷰 후기</div>
          <div className="arrow" onClick={handleShowNameModal}>
            <IoIosArrowForward size={20} />
          </div>
          {showNameModal && <NameModal closeModal={handleCloseNameModal} />}
        </div>
      </div>
    </div>
  );
};

export default User;
