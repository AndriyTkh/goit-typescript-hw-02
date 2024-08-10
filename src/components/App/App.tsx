import { useState, useEffect, FormEvent } from "react";

import { Hourglass } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

import { getImgData, mapToImageData } from "../../unsplash-api";
import css from "./App.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

import { IImageData, IModalData } from "../../types";

export default function App() {
  const [pictures, setPictures] = useState<Array<IImageData>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [moreBtn, setMoreBtn] = useState(false);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<IModalData>({srcFull: "", altText: ""});

  const openModal = (modalData: IModalData): void => {
    setModalIsOpen(true);
    setCurrentModal(modalData);
  };
  const closeModal = (): void => {
    setModalIsOpen(false);
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setPictures([]);
    setPage(1);
    const form = evt.target as HTMLFormElement;
    const userSearch = (form.elements.namedItem("userSearch") as HTMLInputElement).value.trim();

    if (userSearch === "") {
      toast.error("Search is empty");
      return;
    }
    setInput(userSearch);

    form.reset();
  };

  useEffect(() => {
    if (input.trim() === "") {
      return;
    }

    async function loadPage() {
      try {
        setError(false);
        setLoading(true);
        setMoreBtn(false);

        const response = await getImgData(input, page);

        const ImageData = mapToImageData(response.data.results);

        setPictures(pictures.concat(ImageData));
        if (response.data.total > page * 15) {
          setMoreBtn(true);
        } else {
          toast.error("No more images available");
        }
      } catch (error: any) {
        setError(true);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [page, input]);

  return (
    <>
      <SearchBar onSearch={handleSubmit} />

      {pictures.length > 0 && !error && (
        <ImageGallery pictures={pictures} onImageClick={openModal} />
      )}

      {error && <ErrorMessage />}

      {loading && (
        <div className={css.centered}>
          <Hourglass height={"40"} />
        </div>
      )}

      {moreBtn && (
        <LoadMoreBtn
          onClick={() => {
            setPage(page + 1);
          }}
        />
      )}

      <ImageModal
        modalIsOpen={modalIsOpen}
        onClose={closeModal}
        data={currentModal}
      />

      <Toaster position="top-left" reverseOrder={false} />
    </>
  );
}
