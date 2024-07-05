import React from "react";
import Modal from "./Modal";

import "./GuideModal.css";

import { IoCloseOutline } from "react-icons/io5";

import {
  PiNumberCircleOneFill,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeFill,
  PiNumberCircleFourFill,
} from "react-icons/pi";

const GuideModal = ({ closeModal }) => {
  return (
    <Modal isOpen={true}>
      <div className="guide-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="title">사진 촬영 가이드</div>
        <p>상품을 올리기 전에 다음의 가이드를 꼭 읽어주세요.</p>
        <div className="forms">
          <div className="form">
            <div className="icon">
              <PiNumberCircleOneFill size={22} color="#b9b9b9" />
            </div>
            <div className="text">
              선명하게 제품을 촬영하세요. 고화질 사진을 더 잘 인식합니다.
            </div>
          </div>
          <div className="form">
            <div className="icon">
              <PiNumberCircleTwoFill size={22} color="#b9b9b9" />
            </div>
            <div className="text">
              밝은 공간에서 촬영하세요. 어두운 공간은 인식이 어렵습니다.
            </div>
          </div>
          <div className="form">
            <div className="icon">
              <PiNumberCircleThreeFill size={22} color="#b9b9b9" />
            </div>
            <div className="text">
              가이드 영역안에 하나의 상품을 촬영하는 것이 가장 정확도가
              높습니다.
            </div>
          </div>
          <div className="form">
            <div className="icon">
              <PiNumberCircleFourFill size={22} color="#b9b9b9" />
            </div>
            <div className="text">
              가능하면 제품의 사용 흔적을 명확히 보여주세요.
            </div>
          </div>
        </div>
        {/* <button onClick={closeModal}>닫기</button> */}
      </div>
    </Modal>
  );
};

export default GuideModal;
