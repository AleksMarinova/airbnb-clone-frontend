import Image from "next/image";
import { urlFor } from "../sanity";


const Review = ({review}) => {
  return (
    <div className="review-box" >
      <h1>{review.rating}</h1>
      <h5>{review.reviewDescription}</h5>
      <h2>{review.traveller.name}</h2>
      <Image 
        src={urlFor(review.traveller.image).url()} 
        alt='' 
        width={100}
        height={100}
        />
       
    </div>
    )
}

export default Review;