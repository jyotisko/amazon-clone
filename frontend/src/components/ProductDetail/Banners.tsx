export interface BannersProps {
  banners?: string[];
};

const Banners: React.SFC<BannersProps> = ({ banners = null }) => {
  return (
    <section className="section section--banners">
      <h2 className="section--banners__manufacturer">From the manufacturer</h2>
      {
        banners && banners.map((banner: string, index) => {
          return (
            <div key={index} className="banner">
              <img loading='lazy' src={banner} alt={`Banner ${index}`} className="banner__image" />
            </div>
          );
        })
      }
    </section>
  );
};

export default Banners;