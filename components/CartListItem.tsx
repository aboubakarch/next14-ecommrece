import { crypt, isValidImageSrc } from '@/lib/helpers'
import Image from 'next/image'
import React from 'react'
import RemoveCartButton from './RemoveCartButton'
import Link from 'next/link'

const CartListItem: React.FC<CartItem> = ({ id, product, quantity }) => {
    let data = JSON.stringify(product)
    data = crypt("salt", data)
    return (
        <li className="flex items-start ms:items-center flex-col sm:flex-row justify-between gap-4 w-full p-4 rounded-md transition-all hover:bg-grayer-100">
            <Link href={`/products/${product.id}?item=${data}`} className="flex items-start justify-center gap-2 flex-1">
                {/* <img className="rounded-md w-[35px] object-cover shrink-0 overflow-hidden" src="images/products/01.png" alt="Product Thumb" /> */}
                <Image
                    className="rounded-md object-cover shrink-0 overflow-hidden"
                    src={product.imageURL && isValidImageSrc(product.imageURL) ? product.imageURL : "/assets/slider/01.png"}
                    alt="Product Thumb"
                    width={150}
                    height={200}
                    layout="fixed"
                />
                <div className="flex flex-col flex-1 gap-1">
                    <h4>{product.name}</h4>
                    <div className="flex items-center justify-start gap-2">
                        <b className="ltr">x {quantity}</b><span className="text-xs text-gray-500">{product.price} SAR</span>
                    </div>
                </div>
            </Link>
            <RemoveCartButton id={id} productId={product.id} itemQuantity={quantity} />
        </li>)
}

export default CartListItem