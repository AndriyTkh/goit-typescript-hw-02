import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { IImageData, IModalData } from "../../types";

type Props = {
  pictures: IImageData[],
  onImageClick: (modalData: IModalData) => void,
}

export default function ImageGallery({pictures, onImageClick}: Props) {
  return (
    <ul className={css.gallery}>
      {pictures.map((pic: IImageData) => {
        return (
          <li key={pic.id}>
            <ImageCard
              imageData = {pic}
              onImageClick={onImageClick}
            />
          </li>
        );
      })}
    </ul>
  );
}
