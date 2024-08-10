import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return <p className={css.errorMsg}>Oof, looks like something went wrong.</p>;
}
