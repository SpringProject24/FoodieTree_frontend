import React from 'react';

const UploadInput = () => {
  return (
    <div className="image-upload">
      <input
        type="file"
        id="proImage"
        name="proImage"
        accept="image/*"
        multiple
        required
      />
      <label htmlFor="proImage">상품 사진 업로드 (Drag & Drop)</label>
      <div id="image-preview"></div>
    </div>
  );
};

export default UploadInput;