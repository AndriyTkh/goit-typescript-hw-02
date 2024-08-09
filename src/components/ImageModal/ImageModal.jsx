import Modal from "react-modal";
import css from "./ImageModal.module.css";

export default function ImageModal({
  modalIsOpen,
  onClose,
  data: { srcFull, altText },
}) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <img className={css.pic} src={srcFull} alt={altText} />
    </Modal>
  );
}
