import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';
import { searchStateType } from '../types/stateTypes';
import { searchActions } from '../store/searchSlice';
import { ProductResponseType } from '../types/APIResponseTypes';
import ProductSearchRows from '../components/Search/ProductSearchRows';
import Nav from '../components/Nav/Nav';
import Spinner from '../components/Utils/Spinner';
import Footer from '../components/Footer/Footer';

interface PromiseReturnType {
  totalPages: number;
  products: ProductResponseType[];
};

const ProductSearch: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const search: searchStateType = useSelector((state: RootStateOrAny) => state.search);
  const [isQueryValid, setIsQueryValid] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductResponseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getResults = async (query: string, category: string, page: number): Promise<PromiseReturnType> => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/products?search=${query}&page=${page}&category=${category === 'all' ? '' : category}`);
      const { totalPages, products } = data.data;
      return { totalPages, products };
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Location changed')
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query') || search.query || '';
    const category = urlParams.get('category') || search.category || 'all';
    const page = +urlParams.get('page')! || search.page || 1;

    if (!query || query === '') return setIsQueryValid(false);

    dispatch(searchActions.updateSearch({ category: category }));

    getResults(query, category, page).then((data: PromiseReturnType) => {
      if (page > data.totalPages) history.push(`/search?query=${query}&page=${data.totalPages}&category=${category}`);

      dispatch(searchActions.updateSearch({
        query: query,
        page: page,
        category: category,
        totalPages: data.totalPages
      }));

      return setProducts(data.products);
    });

  }, [window.location.search]);

  return (
    <React.Fragment>
      <Nav showSearchHistory={true} />
      <main className="main main--search">
        {
          isQueryValid ? (
            !isLoading ? (
              <ProductSearchRows products={products} />
            ) : (
              <Spinner size={70} />
            )
          ) : (
            <h2>Invalid Query!</h2>
          )
        }
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default ProductSearch;