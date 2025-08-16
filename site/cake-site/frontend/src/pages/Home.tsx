import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/layouts/ProductCard";
import PresentationCard from "../components/layouts/PresentationCard";
import type { Product } from "../types/Product";
import { getProductbyId } from "../services/api";
import testCake from "../assets/testCake.jpg";


const features = [
  {
    id: 1,
    text: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500."
  },
  {
    id: 2,
    text: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500."
  },
  {
    id: 3,
    text: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500."
  },
  {
    id: 4,
    text: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500."
  }
]

export default function Home() {
  const navigate = useNavigate();
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const bestSellersIds = ["2", "3", "4", "5"];

    Promise.all(bestSellersIds.map(id => getProductbyId(id)))
    .then(Products => {
      setBestSellers(Products);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="pt-5 text-3xl font-bold mb-4">Chargement des proudits</div>;
  if (error) return <div className="pt-5 text-3xl font-bold mb-4"> Erreur : {error}</div>;

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-gray-50">
      <div className="w-full px-8">
        {/* Section best sellers */}
        <h1 className="pt-5 text-3xl font-bold mb-4 text-left">
          Our best sellers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {bestSellers.map(p => (
            <ProductCard 
            key={p.id}
            id={String(p.id)}
            title={p.title}
            description={p.description}
            price={p.price}
            image={p.images[0]?.url ?? undefined}
              />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/Products")}
            className="w-full max-w-[280px] bg-pink-400 hover:bg-pink-500 text-white font-semibold transition duration-300 py-3 rounded-xl"
          >
            See all products
          </button>
        </div>

        {/* Section présentation / features */}
        <div className="mt-16">
          {/* Layout : grande card à gauche, contenu à droite */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Grande carte de présentation à gauche */}
            <div className="hidden md:block md:w-1/3">
              <PresentationCard
                image={testCake}
              />
            </div>

            {/* Contenu à droite : titre, description, features */}
            <div className="w-full md:w-2/3">
              <h1 className="pt-5 text-3xl font-bold mb-4">Why Choose our boutique</h1>
              <p className="mb-6">
                Le Lorem Ipsum est simplement du faux texte employé dans la composition
                et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500.
              </p>
              
              {/* Feature cards */}
              <div className="flex flex-col gap-6">
                {features.map((f) => (
                  <div key={f.id} className="flex items-center gap-5">
                    <div className="bg-[#FFF8F0] rounded-xl shadow-md p-3 flex items-center justify-center flex-shrink-0 w-12 h-12 font-bold text-2xl">
                      {f.id}
                    </div>
                    <p className="text-sm flex-1 semi-bold">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add extra spacing before footer */}
      <div className="h-16"></div>
    </div>
  );
}
