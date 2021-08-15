export interface DescriptionProps {
  description: string;
};

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <section className="section section--description">
      <h2 className="section--description__title">Product Description</h2>
      <p className="section--description__description">{description}</p>
    </section>
  );
};

export default Description;