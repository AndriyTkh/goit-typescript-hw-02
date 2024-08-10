import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { IModalData } from "../../types";

type Props = {
  modalIsOpen: boolean,
  onClose: () => void,
  data: IModalData,
}

export default function ImageModal({
  modalIsOpen,
  onClose,
  data,
}: Props) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <img className={css.pic} src={data.srcFull} alt={data.altText} />
    </Modal>
  );
}
