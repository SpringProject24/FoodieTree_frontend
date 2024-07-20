import React, {useEffect, useRef, useState} from 'react';
import styles from './ProductRegisterForm.module.scss';
import {FaCamera} from "react-icons/fa";

const UploadInput = ({ onAdd }) => {
  // 파일 input DOM
  const fileInputRef = useRef(null);

  // 파일 상태관리
  const [selectedFile, setSelectedFile] = useState(null);
  // 미리보기 url 상태관리
  const [previewUrl, setPreviewUrl] = useState(null);

  // 파일 업로드 시 selectedFile 상태 업데이트
  const fileHandler = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      setSelectedFile(file);
      onAdd(file);
    } else {
      setSelectedFile(null);
      onAdd('');
    }
  };

  useEffect(() => {
    if (selectedFile) { // 파일 업로드 되면 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(previewUrl);

      // 미리보기 URL cleanup 함수
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setPreviewUrl(null)
    }
  }, [selectedFile]);

  return (
    <div className={styles['image-upload']}>
      <input
        ref={fileInputRef}
        type="file"
        id="productImage"
        name="productImage"
        accept="image/*"
        onChange={fileHandler}
        required
      />
      {!selectedFile &&
        <label htmlFor="productImage">
          {"스페셜팩을 맛있게 보여줄 사진을\n\n한 장만 업로드 해주세요!"}
        </label>
      }
      {
        selectedFile &&
        <div className={styles['image-preview']}>
          <img src={''+previewUrl} alt='product image'/>
          <label htmlFor="productImage">
          </label>
        </div>
      }
    </div>
  );
};

export default UploadInput;

/*
      const $productApproval = document.querySelector(".btn-approval");
      $productApproval.addEventListener("click", () => {
        location.href = "/store/mypage/main";
      });

    document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById("proImage");
    const imagePreview = document.getElementById("image-preview");
    const imageUploadLabel = document.querySelector('.image-upload label');
    const imageUpload = document.querySelector('.image-upload');


    imageInput.addEventListener("change", handleFiles);


    imageUpload.addEventListener("dragover", function(event) {
        event.preventDefault();
        imageUpload.classList.add("dragover");
    });

    imageUpload.addEventListener("dragleave", function() {
        imageUpload.classList.remove("dragover");
    });

    imageUpload.addEventListener("drop", function(event) {
        event.preventDefault();
        imageUpload.classList.remove("dragover");
        const files = event.dataTransfer.files;
        handleFiles({ target: { files: files } });
    });

    function handleFiles(event) {
        const files = event.target.files;
        imagePreview.innerHTML = "";

        for (const file of files) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const imgElement = document.createElement("img");
                imgElement.src = e.target.result;
                imagePreview.appendChild(imgElement);
            };

            reader.readAsDataURL(file);
        }

        if (files.length > 0) {
            imageUploadLabel.style.display = 'none';
        } else {
            imageUploadLabel.style.display = 'flex';
        }
    }
  });
 */