import { sanityClient } from "../../sanity";
import {pluralize} from '../../utils';

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
      <h1><b>{title}</b></h1>
      <p>{reviewAmount} review{pluralize(reviewAmount)} </p>
      <h2><b>{propertyType} hosted by {host?.name}</b></h2>
      <h4>{bedrooms} bedroom{pluralize(bedrooms)}</h4>
      <hr/>
      <h4><b>Enhanced Clean</b></h4>
      <p>This host is commited to Airbnbs five step enhanced cleaning process</p>
      <h4><b>Amenities for everyday living</b></h4>
      <p>The host has equipped this place for long stays.</p>
      <h4><b>House rules</b></h4>
      <p>This place is not suitable for pets.</p>
      <div className="price-box">
        <h2>{pricePerNight} NOK per night</h2>
        <h4>{reviewAmount} review{pluralize(reviewAmount)}</h4>
        <div className="button" onClick={() => {}}>Change dates</div>
      </div>


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
    traveler->{
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
