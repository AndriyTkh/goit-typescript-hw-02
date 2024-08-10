import css from "./ImageCard.module.css";
import { IImageData, IModalData } from "../../types";

type Props = {
  imageData: IImageData,
  onImageClick: (modalData: IModalData) => void,
}

export default function ImageCard({imageData, onImageClick}: Props) {
  return (
    <>
      <div
        className={css.imgBox}
        onClick={() => {
          onImageClick({srcFull: imageData.regular, altText: imageData.alt});
        }}
      >
        <img className={css.image} src={imageData.src} alt={imageData.alt} />
      </div>
      <div className={css.infoBox}>
        <div className={css.infoData}>
          <p className={css.type}>Likes:</p>
          <p className={css.value}>{imageData.likes}</p>
        </div>
        <div className={css.infoData}>
          <p className={css.type}>Autor:</p>
          <p className={css.value}>{imageData.author}</p>
        </div>
      </div>
    </>
  );
}
