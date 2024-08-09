import { useState, useEffect } from "react";

import { Hourglass } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

import getImgData from "../../unsplash-api";
import css from "./App.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [moreBtn, setMoreBtn] = useState(false);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState({});

  const openModal = (modalData) => {
    setModalIsOpen(true);
    setCurrentModal(modalData);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setPictures([]);
    setPage(1);
    const form = evt.target;
    const userSearch = form.elements.userSearch.value.trim();

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

        console.log(response.data);
        console.log(response.data.results);

        setPictures(pictures.concat(response.data.results));
        if (response.data.total > page * 15) {
          setMoreBtn(true);
        } else {
          toast.error("No more images available");
        }
      } catch (error) {
        setError(true);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPage(input);
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
