import Image from "next/image";

export default async function Home() {
  const response = await fetch("https://dummyjson.com/products?limit=9");
  const data = await response.json();
  return (
    		<>
			<h1>Proizvodi</h1>
			<div className="products">
      {data.products.map((product) => {
        return (
          <div className="product" key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p className="price">{product.price} $</p>
            <Image
              src={product.thumbnail}
              alt={product.title}
              width="500"
              height="300"
            />
            <a href={`/product/${product.id}`} className="btn">
              Pogledaj proizvod
            </a>
          </div>
        );
      })
       }
			</div>
		</>
  );
}
