import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ pictures, onImageClick }) {
  return (
    <ul className={css.gallery}>
      {pictures.map((pic) => {
        return (
          <li key={pic.id}>
            <ImageCard
              src={pic.urls.small}
              regular={pic.urls.regular}
              alt={pic.alt_description}
              likes={pic.likes}
              autor={pic.user.first_name}
              onImageClick={onImageClick}
            />
          </li>
        );
      })}
    </ul>
  );
}
