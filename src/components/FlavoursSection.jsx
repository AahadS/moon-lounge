const FlavoursSection = () => (
    <section id="products" className="bg-gray-900 text-white py-16">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">Flavours</h2>
        <p className="text-lg mt-2">Explore our premium shisha flavours</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-20">
        {["Watermelon", "Lime", "Grape", "Apple", "Mint", "Peach"].map(
          (flavour, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-semibold">{flavour}</h3>
            </div>
          )
        )}
      </div>
    </section>
  );
  
  export default FlavoursSection;
  