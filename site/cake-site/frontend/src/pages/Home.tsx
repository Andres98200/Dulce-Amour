import { useNavigate } from "react-router-dom";
import ProductCard from "../components/layouts/ProductCard";
import PresentationCard from "../components/layouts/PresentationCard";

const products = [
  {
    title: "CAKE 1",
    price: 25,
    description:
      "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.",
    image: "url1",
  },
  {
    title: "CAKE 2",
    price: 30,
    description:
      "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.",
    image: "url2",
  },
  {
    title: "CAKE 3",
    price: 20,
    description:
      "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.",
    image: "url3",
  },
];

const presentation = [
  {
    image: "url1",
    title: "Notre boutique",
    subtitle: "Qualité & Passion",
    description:
      "Nous combinons savoir-faire artisanal et ingrédients premium pour des créations uniques.",
  },
];

const features = [
  {
    id: 1,
    text: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.",
  },
  {
    id: 2,
    text: "Des ingrédients sélectionnés avec soin pour garantir fraîcheur et goût.",
  },
  {
    id: 3,
    text: "Un service personnalisé pour chaque client.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-gray-50">
      <div className="w-full px-4 max-w-[1200px] mx-auto">
        {/* Section best sellers */}
        <h1 className="pt-5 text-3xl font-bold mb-4 text-left">
          Our best sellers
        </h1>
        <p className="mb-6">
          Le Lorem Ipsum est simplement du faux texte employé dans la composition
          et la mise en page avant impression.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {products.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/Products")}
            className="w-[280px] bg-pink-400 hover:bg-pink-500 text-white font-semibold transition duration-300 py-3 rounded-full"
          >
            See all products
          </button>
        </div>

        {/* Section présentation / features */}
        <div className="mt-16">
          <h1 className="pt-5 text-3xl font-bold mb-4">Why Choose our boutique</h1>
          <p className="mb-6">
            Le Lorem Ipsum est simplement du faux texte employé dans la composition
            et la mise en page avant impression. Le Lorem Ipsum est simplement du faux
            texte employé dans la composition et la mise en page avant impression.
          </p>

          {/* Layout : petites cards à gauche, grande card à droite */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Colonne de petites cards */}
            <div className="flex flex-col gap-6 md:w-1/3">
              {features.map((f) => (
                <div key={f.id} className="flex flex-col items-start gap-2">
                  <div className="bg-[#FFF8F0] rounded-xl shadow-md p-3 flex items-center justify-center flex-shrink-0 overflow-hidden transition-transform duration-200 hover:scale-[1.02] w-20 h-20">
                    {f.id}
                  </div>
                  <p className="text-sm">{f.text}</p>
                </div>
              ))}
            </div>

            {/* Grande carte de présentation */}
            <div className="md:flex-1">
              {presentation.map((p, i) => (
                <div key={i} className="w-full">
                  <PresentationCard {...p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
