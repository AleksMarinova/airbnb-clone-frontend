import Image from 'next/image';
import { urlFor } from '../sanity';

const Img = ({identifyer, image}) => {
  console.log(urlFor(image).url());
  return (
    <div className={identifyer==="main-image"? "main-image" : "image"} >
      <Image src={urlFor(image).url()} alt=''
      width={400}
      height={300}
      />
    </div>
  )
}

export default Img;