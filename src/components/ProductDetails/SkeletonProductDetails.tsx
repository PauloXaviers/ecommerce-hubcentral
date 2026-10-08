import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './ProductDetails.scss';

const SkeletonProductDetails = () => {
  return (
    <section className="product-main">
      <div
        className="product-images"
        style={{
          margin: '0 30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Skeleton width="20rem" height={400} borderRadius={8} />
        <div className="carousel-images">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} width="9rem" height="9rem" borderRadius={10} />
          ))}
        </div>
      </div>

      <div className="product-content" style={{ width: '90%' }}>
        <Skeleton width={150}  height={30} />
        <Skeleton width={600} height={40} />
        <div className="container">
          <Skeleton width={80} height={25} />
          <Skeleton width={100} height={25} />
        </div>
        <div className="container">
          <Skeleton width={170} height={40} borderRadius={6} />
          <Skeleton width={120} height={40} borderRadius={6} />
        </div>
      </div>
    </section>
  );
};

export default SkeletonProductDetails;
