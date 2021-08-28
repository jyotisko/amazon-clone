import ProductRow from './ProductRow';

const Rows: React.FC = () => {
  return (
    <main className="main__home">
      <ProductRow url={`${process.env.REACT_APP_API_URL}/products`} title='Products' linkTo='#' />
    </main>
  );
}

export default Rows;