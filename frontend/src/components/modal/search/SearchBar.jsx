import "./SearchBar.css";

export default function SearchBar({ onChange }) {
  return (
    <form className="searchBar">
      <input
        type="text"
        placeholder="제품을 검색해보세요. ex)RTX..., RX.."
        className="search_bar"
        name="searchText"
        onChange={onChange}
      />
    </form>
  );
}
