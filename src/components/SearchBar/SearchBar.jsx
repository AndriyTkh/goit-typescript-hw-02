import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <header className={css.headerBox}>
      <form className={css.headForm} onSubmit={onSearch}>
        <input
          className={css.input}
          type="text"
          name="userSearch"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.submitBtn} type="submit">
          <svg className={css.icon} width="12" height="12">
            <use href="/src/symbol-defs.svg#icon-search"></use>
          </svg>
        </button>
      </form>
    </header>
  );
}
