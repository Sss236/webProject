export {searchBooks} from "../actions/dataActions";

const SearchBar = (props) => (
    <form>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search books</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search your books"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;