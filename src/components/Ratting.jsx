import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
const Ratting = ({ratting}) => {
    return (
        <Rating
      style={{ maxWidth:90 }}
      value={ratting}
      readOnly
    />
    );
};

export default Ratting;