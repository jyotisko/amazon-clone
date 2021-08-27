import { FormEvent, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { IoSearchSharp } from 'react-icons/io5';
import { searchActions } from '../../store/searchSlice';
import { searchStateType } from '../../types/stateTypes';
import { useEffect } from 'react';

interface NavProps {
  showSearchHistory?: boolean;
};

const NavSearch: React.FC<NavProps> = ({ showSearchHistory = false }) => {
  const search: searchStateType = useSelector((state: RootStateOrAny) => state.search);
  const [inputQuery, setInputQuery] = useState<string>('');
  const selectRef = useRef<HTMLSelectElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearch = (e: FormEvent): void => {
    e.preventDefault();
    const query: string = inputQuery;
    const catergory: string = selectRef.current!.value;

    if (!query || query.trim() === '') return;

    dispatch(searchActions.updateSearch({
      query: query.toLowerCase(),
      catergory: catergory,
      page: 1
    }));

    history.push(`/search?query=${query}&page=1&category=${catergory}`);
  };

  useEffect(() => {
    if (showSearchHistory) setInputQuery(search.query);
  }, [search]);

  return (
    <form className="nav__search" onSubmit={handleSearch}>
      <select ref={selectRef} defaultValue={showSearchHistory ? search.category || 'all' : 'all'} className="nav__caterogy-dropdown">
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="books">Books</option>
        <option value="toy">toy</option>
        <option value="computer-accessories">Computer And Accessories</option>
        <option value="mobiles">Mobiles</option>
      </select>
      <input type="text" value={inputQuery} onChange={(e) => setInputQuery(e.target.value)} />
      <button type='submit'><i className="icon icon--search"><IoSearchSharp /></i></button>
    </form>
  );
}

export default NavSearch;