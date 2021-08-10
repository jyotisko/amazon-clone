import ProductRow from './ProductRow';

const Rows: React.FC = () => {
  return (
    <main className="main__home">
      <ProductRow url='/api/v1/products' title='Products' linkTo='#' />
    </main>
  );
}

export default Rows;