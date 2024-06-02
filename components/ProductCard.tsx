import { crypt, isValidImageSrc } from '@/lib/helpers';
import Image from 'next/image';
import React from 'react';
import { MotionDiv } from './MotionDiv';
import Link from 'next/link';
import AddCartButton from './AddCartButton';

const stagger = 0.25;

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const ProductCard: React.FC<ProductCardProps> = ({
  categoryId,
  description,
  id,
  imageURL,
  index,
  name,
  price,
}) => {
  // as we dont have an endpoint to get a single product
  let data = JSON.stringify({ description, id, imageURL, name, price });
  data = crypt('salt', data);
  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * stagger,
        ease: 'easeInOut',
        duration: 0.5,
      }}
      whileHover={{
        scale: 1.02,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 17,
          duration: 0.3,
        },
      }}
      viewport={{ amount: 0 }}
      className="rounded-lg border-2 border-gray-50 flex flex-col items-start justify-start md:p-3 p-2 relative"
    >
      <Link
        href={`/products/${id}?item=${data}`}
        className="block w-full aspect-4/3 relative mb-4"
      >
        {/* <img src="images/products/02.png" className="w-full  object-cover rounded-lg" alt="product" /> */}
        <Image
          src={
            imageURL && isValidImageSrc(imageURL)
              ? imageURL
              : '/assets/slider/01.png'
          }
          objectFit="cover"
          fill
          alt="product"
        />
      </Link>
      <div className="w-full flex flex-col flex-1 items-start justify-start gap-4">
        <div className="flex items-center justify-center flex-col gap-1">
          <Link
            href={`/products/${id}?item=${data}`}
            className="block w-full text-primary text-center"
          >
            <h2 className="text-sm">{name}</h2>
          </Link>
          <small className="block text-xs w-full text-center">
            {description}
          </small>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-2 text-gray-300 w-full">
          <p className="text-xs text-gray-500 underline">تصنيف اول</p>
          <p className="text-xs text-gray-500 underline">تصنيف ثاني</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center w-full my-4 gap-0 sm:gap-2">
        <span className="font-medium text-md">{price} SAR</span>
        <span className="font-medium text-sm line-through text-gray-300">
          {price} SAR
        </span>
      </div>
      <AddCartButton productId={id} />
    </MotionDiv>
  );
};

export default ProductCard;
