import React, { useState } from "react";
import "./RatingModal.css";

const RatingModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Vui lòng chọn số sao!");
      return;
    }
    if (comment.trim() === "") {
      alert("Vui lòng nhập bình luận!");
      return;
    }
    onSubmit(rating, comment);
    setRating(0);
    setComment("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-title">Đánh giá sản phẩm</div>
        {/* Star Rating */}
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "selected" : ""}`}
              onClick={() => handleStarClick(star)}
            >
              &#9733;
            </span>
          ))}
        </div>
        {/* Comment */}
        <textarea
          className="comment-box"
          rows="4"
          placeholder="Nhập bình luận của bạn..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {/* Buttons */}
        <div className="modal-buttons">
          <button className="btn confirm" onClick={handleSubmit}>
            Xác nhận
          </button>
          <button className="btn cancel" onClick={onClose}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
