import { sanityClient } from '../sanity';

const Home = ({properties}) => {
  return (
   <>
   {console.log(properties)}
   </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "property"]';
  const properties = await sanityClient.fetch(query);

  if (!properties.length) {
    return { 
      props: {
        properties: [],
      },
    }
  } else {
    return { 
      props: {
        properties,
      },
    }
  }
}

export default Home;
