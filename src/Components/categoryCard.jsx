const CategoryCard = ({ icon, title }) => {
    return (
      <div className="p-8 bg-white shadow-lg rounded-lg text-center transform transition-transform duration-300 hover:scale-105">
        <div className="text-6xl mb-4">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    );
  };

  export default CategoryCard;