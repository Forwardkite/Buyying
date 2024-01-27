import Link from "next/link";

async function getProduct(id) {
  const res = await fetch(`http://localhost:5000/admin/view/${id}`);
  return res.json();
}
export default async function Product({ params }) {
  const product = await getProduct(params.id);
  return (
    <>
      <section>
        <div className="w-full bg-[url('/assets/img/page-title.png')] p-12 bg-no-repeat bg-cover rounded-b-[50px]">
          <h4 className="font-bold text-white text-6xl mx-auto mb-4 text-center">
            {product.productName}
          </h4>
          <p className="text-base text-white text-center ">
            Scratch the card and get your surprise ticket. Best of Luck
          </p>
        </div>
      </section>
      <section className="py-8 mt-16 mb-8">
        <div className="flex flex-wrap  justify-between w-11/12 mx-auto gap-8">
          <div className="w-6/12">
            <h1>{product.productName}</h1>
            <p>{product.productDiscription}</p>
            <div className="flex justify-between font-bold text-base mt-8">
              <p className="w-5/12">Price</p>
              <span>:</span>
              <p className="w-5/12">Rs {product.productPrice}</p>
            </div>
            <div className="flex justify-between font-bold text-base">
              <p className="w-5/12">Item Left</p>
              <span>:</span>
              <p className="w-5/12">{product.stockNumber}</p>
            </div>
          </div>
          <div className="w-5/12">
            <img
              src="../../../../assets/img/pen.png"
              alt=""
              className="rounded-lg"
            />
          </div>
          <Link href="/ticket-selection" className="w-1/4  ml-auto ">
            <button className="btn-theme-dual font-bold text-white w-full rounded-full py-4 mt-12">
              Proceed
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
