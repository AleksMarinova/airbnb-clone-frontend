import { sanityClient } from "../../sanity";
import { pluralize } from "../../utils";
import Img from "../../components/Image";
import Review from "../../components/Review";
import Map from "../../components/Map";

const Property = ({
  title,
  location,
  propertyType,
  mainImage,
  images,
  pricePerNight,
  bedrooms,
  description,
  host,
  reviews,
}) => {
  const reviewAmount = reviews.length;
  return (
    <div className="container">
      <h1>
        <b>{title}</b>
      </h1>
      <p>
        {reviewAmount} review{pluralize(reviewAmount)}{" "}
      </p>
      <div className="images-section">
        <Img indentifyer="main-image" image={mainImage} />
      </div>
      <div className="sub-images-section">
        {images.map((image, index) => {
          return <Img key={index} image={image} identifyer="image" />;
        })}
      </div>

      <div className="section">
        <div className="information">
          <h2>
            <b>
              {propertyType} hosted by {host?.name}
            </b>
          </h2>
          <h4>
            {bedrooms} bedroom{pluralize(bedrooms)}
          </h4>
          <hr />
          <h4>
            <b>Enhanced Clean</b>
          </h4>
          <p>
            This host is commited to Airbnbs five step enhanced cleaning process
          </p>
          <h4>
            <b>Amenities for everyday living</b>
          </h4>
          <p>The host has equipped this place for long stays.</p>
          <h4>
            <b>House rules</b>
          </h4>
          <p>This place is not suitable for pets.</p>
          
        </div>
        <div className="price-box">
            <h2>{pricePerNight} NOK per night</h2>
            <h4>
              {reviewAmount} review{pluralize(reviewAmount)}
            </h4>
            <div className="button" onClick={() => {}}>
              Change dates
            </div>
          </div>
      </div>
      <hr/>
      <h4>{description}</h4>
      <hr/>
      <h2>{reviewAmount} review {pluralize(reviewAmount)}</h2>
      {reviewAmount > 0 && 
      reviews.map((review, index) => <Review key={index} review={review} />)}
      <h2>Location</h2>
      <Map location={location} />
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  const query = `*[_type == "property" && slug.current == '${pageSlug}'][0]{
  title,
  location,
  propertyType,
  mainImage,
  images,
  pricePernight,
  bedrooms,
  description,
  host->{
    _id,
    name,
    image,
    slug,
  },
  reviews[]{
    ...,
    traveller->{
      _id,
      name,
      slug,
      image,
    }
  }
}`;
  const property = await sanityClient.fetch(query, { pageSlug });

  return {
    props: {
      title: property.title,
      location: property.location,
      propertyType: property.propertyType,
      mainImage: property.mainImage,
      images: property.images,
      pricePerNight: property.pricePernight,
      bedrooms: property.bedrooms,
      description: property.description,
      host: property.host,
      reviews: property.reviews,
    },
  };
};

export default Property;
