import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import StarryBackground from "../components/StarryBackground";
import ShishaDisplay from "../components/ShishaDisplay";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const flavors = [
    { name: "Watermelon Chill", description: "Sweet and refreshing watermelon blend" },
    { name: "Zesty Lime", description: "Tangy citrus with a cool finish" },
    { name: "Purple Grape", description: "Rich grape with subtle sweetness" },
    { name: "Crisp Apple", description: "Fresh apple with hints of mint" },
    { name: "Double Mint", description: "Invigorating pure mint experience" },
    { name: "Berry Blast", description: "Mixed berry medley" }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-lounge-black">
      <StarryBackground />
      <Navbar />

      {/* ... keep existing code (Hero Section) */}

      {/* ... keep existing code (Features Section) */}

      {/* Flavors Section */}
      <section className="relative py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Signature Flavors</h2>
            <p className="text-lounge-gold text-lg">Experience our premium shisha selections</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {flavors.map((flavor, index) => (
              <motion.div
                key={flavor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center"
              >
                <h3 className="text-xl font-semibold mb-2 text-white">{flavor.name}</h3>
                <p className="text-gray-400">{flavor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent to-lounge-purple/20">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Founded in 2022, Moon Lounge emerged from a vision to create an ethereal escape where 
              traditional shisha culture meets modern luxury. Our name draws inspiration from the 
              timeless allure of the night sky, symbolizing the perfect blend of mystery and 
              sophistication.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Just as the moon guides wanderers through the night, Moon Lounge serves as a beacon 
              for those seeking an elevated social experience. Our carefully curated atmosphere 
              and premium shisha selections have quickly established us as a premier destination 
              for connoisseurs and newcomers alike.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ... keep existing code (Contact Section) */}

      <ShishaDisplay />
    </div>
  );
};

export default Index;