import { sanityClient } from "../sanity";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../sanity";

const Home = ({ properties }) => {
  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>Places to stay near you</h1>
            <div className="feed">
              {properties.map((property, index) => (
                <div key={index} className="card">
                  <Image
                    identifyer="image"
                    src={urlFor(property.mainImage).url()}
                    key={index}
                    alt=""
                    height={150}
                    width={200}
                  />
                </div>
              ))}
            </div>
            <div className="map" ></div>
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
