async function getProduct(productName) {
  const res = await fetch("http://localhost:5000/admin/view/" + productName);
  return res.json();
}
export default async function Product({ params }) {
  const product = await getProduct(params.productName);
  return (
    <div>
      <h3>{product.productName}</h3>
    </div>
  );
}
