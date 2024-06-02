import { getProducts } from "@/app/action";
import ProductSearch from "@/components/ProductSearch";
import ProductSelect from "@/components/ProductSelect";
import ProductsList from "@/components/ProductsList";
import Slider from "@/components/Slider";

export default async function Home() {
  const data = await getProducts()
  return (
    <main className="w-full main flex-auto flex justify-center">
      <div className="container">
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
          <Slider />
          <div className="flex items-center justify-between gap-4 mb-4">
            <ProductSearch />
            <ProductSelect />
          </div>
          <ProductsList products={data} />
        </div>
      </div>
    </main>
  );
}
