import React, { memo } from "react";

type ProductCardProps = {
  title: string;
  price: string;
  image: string;
  link: string;
};

function ProductCard({ title, price, image, link }: ProductCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col gap-2 p-4 border rounded-lg shadow hover:shadow-lg transition"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-emerald-600 font-bold">{price}</p>
    </a>
  );
}

export default memo(ProductCard);
