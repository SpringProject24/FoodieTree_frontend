import React, {useRef, useState} from 'react';
import styles from './ProductRegisterForm.module.scss';

const UploadInput = () => {
    // 파일 input DOM
    const fileInputRef = useRef(null);

    // 파일 상태관리
    const [selectedFile, setSelectedFile] = useState(null);

    //
    const fileHandler = () => {
        const files = fileInputRef.current.files;
    };
    return (
    <div className={styles['image-upload']}>
      <input
        type="file"
        id="productImage"
        name="proImage"
        accept="image/*"
        onChange={fileHandler}
        // multiple
        required
      />
      {!selectedFile && <label htmlFor="productImage">상품 사진 업로드 (Drag & Drop)</label>}
      {
          selectedFile &&
          <div className={styles['image-preview']}>
            <img src={'#'} alt='product image' />
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