import image1 from '../images/categories/1.webp';
import image2 from '../images/categories/2.webp';
import image3 from '../images/categories/3.webp';
import image4 from '../images/categories/4.jpg';
import image5 from '../images/categories/5.webp';
import image6 from '../images/categories/6.jpg';
import image7 from '../images/categories/7.webp';
import image8 from '../images/categories/8.webp';
import image9 from '../images/categories/9.jpg';
import image10 from '../images/categories/10.webp';
import image11 from '../images/categories/11.webp';
import image12 from '../images/categories/12.webp';
import image13 from '../images/categories/13.webp';
import image14 from '../images/categories/14.webp';
import image15 from '../images/categories/15.webp';
import image16 from '../images/categories/16.jpg';
import image17 from '../images/categories/17.webp';
import image18 from '../images/categories/18.webp';
import image19 from '../images/categories/19.webp';
import image20 from '../images/categories/20.webp';
import image21 from '../images/categories/21.webp';
import image22 from '../images/categories/22.webp';
import image23 from '../images/categories/23.jpg';
import image24 from '../images/categories/24.webp';

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
  image20,
  image21,
  image22,
  image23,
  image24,
];

export default function categoryImage(index) {
  return images[index - 1];
}
