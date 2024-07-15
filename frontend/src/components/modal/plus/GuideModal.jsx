import React from "react";
import Modal from "../Modal";

import { IoCloseOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";

import {
  PiNumberCircleOneFill,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeFill,
  PiNumberCircleFourFill,
  PiNumberCircleFiveFill,
} from "react-icons/pi";

import "./GuideModal.css";

const GuideModal = ({ closeModal }) => {
  return (
    <Modal isOpen={true}>
      <div className="guide-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="title">사진 촬영 가이드</div>

        <p>
          {" "}
          <BsStars />
          AI가 예측하는 정확도가 올라가요
        </p>
        <div className="forms">
          <div className="form">
            <div className="icon">
              <PiNumberCircleOneFill size={22} color="#b9b9b9" />
            </div>
            <div className="text">
              하나의 의류만 전체 사진을 찍어주세요. <br />
            </div>
          </div>
          <div className="form">
            <div className="icon">
              <PiNumberCircleTwoFill size={22} color="#b9b9b9" />
            </div>
            <div className="text">
              바닥에 옷을 두고, 구김없이 활짝 펴서 찍어주세요.
            </div>
          </div>
          <div className="form">
            <div className="icon">
              <PiNumberCircleThreeFill size={22} color="#b9b9b9" />
            </div>
            <div className="text">
              선명하게 제품을 촬영하세요. <br />
              고화질 사진을 더 잘 인식합니다.
            </div>
          </div>
          <div className="form">
            <div className="icon">
              <PiNumberCircleFourFill size={22} color="#b9b9b9" />
            </div>
            <div className="text">
              밝은 공간에서 촬영하세요. <br />
              어두운 공간은 인식이 어렵습니다.
            </div>
          </div>
          <div className="form">
            <div className="icon">
              <PiNumberCircleFiveFill size={22} color="#b9b9b9" />
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
