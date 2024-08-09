import css from "./ImageCard.module.css";

export default function ImageCard({
  src,
  regular,
  alt,
  likes,
  autor,
  onImageClick,
}) {
  return (
    <>
      <div
        className={css.imgBox}
        onClick={() => {
          onImageClick({ srcFull: regular, altText: alt });
        }}
      >
        <img className={css.image} src={src} alt={alt} />
      </div>
      <div className={css.infoBox}>
        <div className={css.infoData}>
          <p className={css.type}>Likes:</p>
          <p className={css.value}>{likes}</p>
        </div>
        <div className={css.infoData}>
          <p className={css.type}>Autor:</p>
          <p className={css.value}>{autor}</p>
        </div>
      </div>
    </>
  );
}
