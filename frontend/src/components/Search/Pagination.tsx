import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { searchActions } from '../../store/searchSlice';
import { searchStateType } from '../../types/stateTypes';
import { useEffect } from 'react';

const Pagination: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const search: searchStateType = useSelector((state: RootStateOrAny) => state.search);

  const goToNextPage = () => {
    history.push(`/search?query=${search.query}&page=${search.page + 1}&category=${search.category}`);
    dispatch(searchActions.incrementPage());
  };

  const goToPrevPage = () => {
    history.push(`/search?query=${search.query}&page=${search.page - 1}&category=${search.category}`);
    dispatch(searchActions.decrementPage());
  };

  return (
    <section className="section section--pagination">
      <div className="pagination">
        {
          search.totalPages !== null && (
            <>
              <button className="btn btn--pagination btn--previous" disabled={search.page === 1} onClick={goToPrevPage}><i className="icon icon--left"><BiChevronLeft /></i> Previous</button>
              <span className="pagination__page">{search.page}</span>
              <button className="btn btn--pagination btn--next" disabled={search.page >= search.totalPages} onClick={goToNextPage}>Next <i className="icon icon--right"><BiChevronRight /></i></button>
            </>
          )
        }
      </div>
    </section>
  );
};

export default Pagination;