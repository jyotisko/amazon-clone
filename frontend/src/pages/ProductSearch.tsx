import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useSelector, RootStateOrAny } from 'react-redux';
import { searchStateType } from '../types/stateTypes';
import { searchActions } from '../store/searchSlice';
import { ProductResponseType } from '../types/APIResponseTypes';
import ProductSearchRows from '../components/Search/ProductSearchRows';
import Nav from '../components/Nav/Nav';
import Spinner from '../components/Utils/Spinner';

const ProductSearch: React.FC = () => {
  const dispatch = useDispatch();
  const search: searchStateType = useSelector((state: RootStateOrAny) => state.search);
  const [isQueryValid, setIsQueryValid] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductResponseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getResults = async (query: string, category: string, page: number): Promise<ProductResponseType[]> => {
    try {
      const { data } = await axios.get(`/api/v1/products?search=${query}&page=${page}&category=${category === 'all' ? '' : category}`);
      return data.data.products;
    } catch (err) {
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query') || search.query || '';
    const category = urlParams.get('category') || 'all';
    const page = +urlParams.get('page')! || search.page || 1;

    if (!query || query === '') return setIsQueryValid(false);

    dispatch(searchActions.updateSearch({
      query: query,
      page: page,
      category: category
    }));

    getResults(query, category, page).then((products: ProductResponseType[]) => {
      return setProducts(products);
    });
  }, []);

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
    </React.Fragment>
  );
};

export default ProductSearch;