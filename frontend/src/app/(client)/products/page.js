async function getProducts() {
  const res = await fetch("https://forwardkite-deployment-server-dp.onrender.com/admin/view");
  return res.json();
}

export default async function Products() {
  const products = await getProducts();
  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.productName}</h3>
          <h3>{product._id}</h3>
        </div>
      ))}
    </>
  );
}
