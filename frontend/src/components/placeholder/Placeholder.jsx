import React from "react";
import "./Placeholder.css";

const Placeholder = ({ value, onChange, maxLength }) => {
  return (
    <div className="multi-line-placeholder">
      <textarea
        value={value}
        onChange={onChange}
        placeholder=" " // 공백으로 설정하여 기본 placeholder를 숨깁니다.
        maxLength={maxLength}
      />
      {!value && (
        <div className="placeholder-text">
          상품 설명을 자세하게 적어주세요.
          <br />
          문의가 줄어들고, 판매율이 올라갈 수 있어요.
          <br />
          ex.) 실측 사이트, 소재, 제품 상태
          <br />
          <br />
          아이템 관련 해쉬태그를 작성할 수 있어요.
          <br /># 추천태그 # 특수문자 제외
        </div>
      )}
    </div>
  );
};

export default Placeholder;
