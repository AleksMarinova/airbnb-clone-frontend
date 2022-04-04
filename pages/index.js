import { sanityClient } from "../sanity";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../sanity";
import { pluralize } from "../utils";

const Home = ({ properties }) => {
  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>Places to stay near you</h1>
            <div className="feed">
              {properties.map((property, index) => (
                <Link
                  passHref
                  href={`/property/${property.slug.current}`}
                  key={index}
                >
                  <div className="card">
                    <Image
                      identifyer="image"
                      src={urlFor(property.mainImage).url()}
                      key={index}
                      alt=""
                      height={150}
                      width={200}
                    />
                    <p>
                      {property.reviews.length} review
                      {pluralize(property.reviews.length)}
                    </p>
                    <h3>{property.title}</h3>
                    <h3>{property.pricePernight} NOK / per Night</h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="map"></div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "property"]';
  const properties = await sanityClient.fetch(query);

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    };
  } else {
    return {
      props: {
        properties,
      },
    };
  }
};

export default Home;
