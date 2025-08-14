import React from "react";
import testCake from "../../assets/testCake.jpg";

interface PresentationCardProps {
  image?: string;
}

const PresentationCard: React.FC<PresentationCardProps> = ({
  image,
}) => (
  <div
    className="bg-cardColor rounded-xl shadow-md flex flex-col flex-shrink-0 overflow-hidden w-full aspect-[4/3]"
  >
    {image && (
    <div className="rounded-lg overflow-hidden flex-shrink-0 h-full object-cover">
        <img
          src={testCake}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    )}
  </div>
);

export default PresentationCard;
