import React, { useState, useEffect } from "react";
import Image from "next/image";
import download from "@/src/icons/form/download.svg";
import delete_icon from "@/src/icons/form/delete.svg";

const Download_image = ({ messages, onImageUpload }) => {
  const [uploadImages, setUploadImages] = useState([]);

  const handleClick = () => {
    setUploadImages([]);
  };

  useEffect(() => {
    uploadImages.forEach((image, index) => {
      if (image.imageData && !image.imageBase64) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const updatedImages = [...uploadImages];
          updatedImages[index].imageBase64 = e.target.result;
          setUploadImages(updatedImages);
          onImageUpload(updatedImages);
        };
        reader.readAsDataURL(image.imageData);
      }
    });
  }, [uploadImages, onImageUpload]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => ({
        imageData: file,
        imageBase64: null,
      }));
      setUploadImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const inputPlaceHolder =
    uploadImages.length === 0 || null
      ? "Şəkil yüklə (Ətraflı məlumat üçün)"
      : uploadImages.length === 1
      ? uploadImages[0].imageData.name
      : `${uploadImages.length} fayl əlavə olundu`;
  return (
    <div className="flex flex-col gap-y-[5px]  ">
      <p className="hidden lg:block font-semibold text-[12px] leading-[18px] text-black500">
        {messages["upload-image"]}
      </p>

      <div className="flex flex-row justify-between w-full border-2 border-cagiraz border-dashed rounded-[10px] lg:rounded-full h-[40px] px-[16px]">
        <label
          htmlFor="dropzone-file"
          className="flex flex-row justify-between items-center  space-x-[16px]  cursor-pointer  w-full"
        >
          <div className="flex flex-row gap-x-[15px] sm:gap-x-[30px] lg:gap-x-[15px]  items-center">
            <Image
              src={download}
              alt="download_icon"
              loading="lazy"
              unoptimized
            />

            <p className="font-semibold text-[12px] leading-[15px] text-gray900">
              {inputPlaceHolder}
            </p>
          </div>

          <input
            placeholder="Şəkil yüklə (Ətraflı məlumat üçün)"
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
        </label>
        <button onClick={handleClick}>
          <Image
            src={delete_icon}
            alt="delete_icon"
            className=""
            loading="lazy"
            unoptimized
          />
        </button>
      </div>
    </div>
  );
};

export default Download_image;