import {sanityClient} from '../../sanity';

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
  return (
    <>
      <h1>{title}</h1>
      <p>{propertyType}</p>
      <p>{pricePerNight}</p>
      <p>{bedrooms}</p>
      <p>{description}</p>
    </>
  )
}

export const getServerSideProps = async (pageContext) => {
const pageSlug=pageContext.query.slug

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
}`
const property = await sanityClient.fetch(query, {pageSlug});

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
    } 
  }


export default Property;