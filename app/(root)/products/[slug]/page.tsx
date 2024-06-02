import AddCartButton from '@/components/AddCartButton';
import { decrypt, isValidImageSrc } from '@/lib/helpers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const ProductDetails = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { item } = searchParams;

  if (!item) {
    return (
      <div className="w-full main flex-auto flex justify-center items-center h-full">
        <p className="text-lg font-semibold">المنتج غير موجود</p>
      </div>
    );
  }
  let data: Product;
  try {
    data = JSON.parse(decrypt('salt', item));
  } catch (error) {
    console.error('Error decrypting or parsing product data:', error);
    return (
      <div className="w-full main flex-auto flex justify-center items-center h-full">
        <p className="text-lg font-semibold">بيانات المنتج غير صالحة</p>
      </div>
    );
  }

  return (
    <main className="w-full main flex-auto flex justify-center">
      <div className="container ">
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 rounded-lg">
            <div className="col-span-1 aspect-4/3 relative">
              <Image
                src={
                  data.imageURL && isValidImageSrc(data.imageURL)
                    ? data.imageURL
                    : '/assets/slider/01.png'
                }
                fill
                alt="product"
                className=" rounded-lg mb-8 sm:mb-0"
              />
            </div>
            <div className="flex flex-col gap-4 col-span-2">
              <article className="text-sm text-darker-300 leading-[1.8] ">
                <div className="flx flex-col mb-6 gap-2">
                  <h1 className="text-xl md:text-3xl">{data.name}</h1>
                  {/* <small className="text-xs text-gray-500">الاصدار الاحدث و الافضل حتى اليوم</small> */}
                </div>
                <div className="flex flex-col sm:flex-row w-full my-4 gap-0 sm:gap-2">
                  <span className="font-medium text-md">2,250.00 SAR</span>
                  <span className="font-medium text-sm line-through text-gray-300">
                    {data.price} SAR
                  </span>
                </div>
                <p>{data.description}</p>
              </article>
              <AddCartButton productId={data.id} hasControls />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
