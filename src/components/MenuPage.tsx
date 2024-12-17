import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ChevronUp, ChevronDown, Trash2, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from './Navbar';
import StarryBackground from './StarryBackground';
import * as Tooltip from '@radix-ui/react-tooltip';
import CheckInModal from './ui/CheckInModal';
import { Toaster } from 'react-hot-toast';

interface FlavorQuantity {
  [key: string]: number;
}

interface MenuPageProps {
  userName: string;
  onCheckOut: () => void;
}

interface Flavor {
  name: string;
  description: string;
}

interface FlavorCategories {
  [category: string]: Flavor[];
}

interface ShishaType {
  name: string;
  price: number;
  description?: string;
  features?: string[];
}

interface OrderItem {
  shishaType: string;
  flavors: {
    name: string;
    quantity: number;
  }[];
}

// Add this interface to track which flavors belong to which shisha
interface ShishaFlavors {
  [shishaId: string]: {
    [flavorName: string]: number;
  };
}

const CartSummary = ({ 
  quantities, 
  shishaQuantities,
  shishaFlavors,
  flavorCategories,
  updateQuantity,
  shishaTypes
}: {
  quantities: FlavorQuantity;
  shishaQuantities: FlavorQuantity;
  shishaFlavors: ShishaFlavors;
  flavorCategories: FlavorCategories;
  updateQuantity: (name: string, increment: boolean, shishaName: string) => void;
  shishaTypes: ShishaType[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  
  const totalCost = Object.entries(shishaQuantities).reduce((total, [shishaName, quantity]) => {
    const shisha = shishaTypes.find(s => s.name === shishaName);
    return total + (shisha?.price || 0) * quantity;
  }, 0);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.div
        className="bg-black/95 backdrop-blur-md border border-lounge-purple/30 rounded-lg shadow-lg overflow-hidden min-w-[300px]"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 text-white border-b border-lounge-purple/20"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-lounge-purple" />
            <span className="font-serif">Your Order</span>
            {totalItems > 0 && (
              <span className="bg-lounge-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white font-serif">${totalCost}</span>
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </button>

        <AnimatePresence>
          {isOpen && Object.keys(shishaQuantities).length > 0 && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3 space-y-4 max-h-[400px] overflow-y-auto">
                {Object.entries(shishaQuantities).map(([shishaName, quantity]) => {
                  const shisha = shishaTypes.find(s => s.name === shishaName);
                  const flavorsForThisShisha = shishaFlavors[shishaName] || {};

                  return (
                    <div key={shishaName} className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <img 
                            src="/images/shishaicon.jpg" 
                            alt="Shisha" 
                            className="w-6 h-6 opacity-80"
                          />
                          <div>
                            <span className="text-white font-medium">{shishaName}</span>
                            <span className="text-lounge-purple text-sm ml-2">${shisha?.price || 0}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="w-6 h-6 rounded-full bg-lounge-purple text-white flex items-center justify-center text-sm"
                            >
                              -
                            </motion.button>
                            <span className="text-white w-6 text-center">{quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="w-6 h-6 rounded-full bg-lounge-purple text-white flex items-center justify-center text-sm"
                            >
                              +
                            </motion.button>
                          </div>
                        </div>
                      </div>
                      {/* Updated flavors section */}
                      <div className="pl-8 space-y-2">
                        {Object.entries(flavorsForThisShisha)
                          .filter(([_, qty]) => qty > 0)
                          .map(([flavorName, flavorQty]) => (
                            <div key={flavorName} className="flex items-center justify-between gap-2">
                              <span className="text-white/70 text-sm">{flavorName}</span>
                              <span className="text-white/70 text-sm">x{flavorQty}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  );
                })}
                
                <div className="border-t border-lounge-purple/20 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-serif">Total</span>
                    <span className="text-white font-serif text-xl">${totalCost}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ y: -2 }}
    className="bg-black/40 backdrop-blur-sm border border-lounge-purple/20 rounded-lg p-6 text-center"
  >
    <div className="text-lounge-purple mb-4 text-2xl">{icon}</div>
    <h3 className="text-xl font-serif text-white mb-2">{title}</h3>
    <p className="text-white/70 text-sm">{description}</p>
  </motion.div>
);

const getTotalShishas = (shishaQuantities: FlavorQuantity): number => {
  return Object.values(shishaQuantities).reduce((sum, quantity) => sum + quantity, 0);
};

const getTotalFlavors = (quantities: FlavorQuantity): number => {
  return Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
};

const MenuPage = ({ userName, onCheckOut }: MenuPageProps) => {
  const [quantities, setQuantities] = useState<FlavorQuantity>({});
  const [selectedShisha, setSelectedShisha] = useState<string>('');
  const [shishaQuantities, setShishaQuantities] = useState<FlavorQuantity>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shishaFlavors, setShishaFlavors] = useState<ShishaFlavors>({});

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const updateQuantity = (flavorName: string, increment: boolean, shishaName: string) => {
    // Check if any shisha is selected first
    const totalShishas = getTotalShishas(shishaQuantities);
    if (increment && totalShishas === 0) {
      toast.error('Please select your type of Shisha first', {
        icon: '💫',
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        },
      });
      return;
    }

    // Get total flavors for this specific shisha
    const currentShishaFlavors = shishaFlavors[shishaName] || {};
    const totalFlavorsForShisha = Object.values(currentShishaFlavors).reduce((sum, qty) => sum + qty, 0);
    const shishaQuantity = shishaQuantities[shishaName] || 0;

    // Check if we can add more flavors to this shisha (1:1 ratio)
    if (increment && totalFlavorsForShisha >= shishaQuantity) {
      toast.error('Please add another shisha before adding more flavors', {
        icon: '💫',
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        },
      });
      return;
    }

    setShishaFlavors(prev => {
      const shishaFlavorsCopy = { ...prev };
      if (!shishaFlavorsCopy[shishaName]) {
        shishaFlavorsCopy[shishaName] = {};
      }

      if (increment) {
        shishaFlavorsCopy[shishaName][flavorName] = 1;
        toast.success(`Added ${flavorName} flavor`, {
          icon: '🌿',
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(139, 92, 246, 0.3)',
          },
        });
      } else {
        delete shishaFlavorsCopy[shishaName][flavorName];
        if (Object.keys(shishaFlavorsCopy[shishaName]).length === 0) {
          delete shishaFlavorsCopy[shishaName];
        }
        toast.error(`Removed ${flavorName} flavor`, {
          icon: '💨',
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(139, 92, 246, 0.3)',
          },
        });
      }

      return shishaFlavorsCopy;
    });
  };

  const updateShishaQuantity = (shishaName: string, increment: boolean) => {
    if (increment) {
      setSelectedShisha(shishaName);
    }
    
    if (!increment) {
      const currentShishaQuantity = shishaQuantities[shishaName] || 0;
      if (currentShishaQuantity === 1) {
        if (selectedShisha === shishaName) {
          setSelectedShisha('');
        }
        setShishaFlavors(prev => {
          const { [shishaName]: _, ...rest } = prev;
          return rest;
        });
      }
    }

    setShishaQuantities(prev => {
      const newQuantity = Math.max(0, (prev[shishaName] || 0) + (increment ? 1 : -1));
      
      const { [shishaName]: _, ...rest } = prev;
      if (newQuantity === 0) {
        return rest;
      }
      return { ...prev, [shishaName]: newQuantity };
    });

    if (increment) {
      toast.success(`Added ${shishaName} to your order`, {
        icon: '🌟',
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        },
      });
    } else if (shishaQuantities[shishaName] > 0) {
      toast.error(`Removed ${shishaName} from your order`, {
        icon: '💫',
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        },
      });
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const flavorCategories = {
    signature: [
      { name: "Midnight Dream", description: "Blueberry, mint, and vanilla fusion" },
      { name: "Lunar Eclipse", description: "Double apple with cardamom twist" },
      { name: "Cosmic Cloud", description: "Sweet watermelon and mint blend" },
      { name: "Starlight Kiss", description: "Rose, vanilla, and cream" },
      { name: "Purple Nebula", description: "Grape, berries, and mint" }
    ],
    fruity: [
      { name: "Paradise Punch", description: "Tropical mix with hints of coconut" },
      { name: "Berry Bliss", description: "Mixed berry medley" },
      { name: "Citrus Symphony", description: "Orange, lemon, and lime" },
      { name: "Mango Tango", description: "Sweet mango with subtle mint" },
      { name: "Peach Perfect", description: "Fresh peach with cream" }
    ],
    mint: [
      { name: "Arctic Breeze", description: "Pure mint experience" },
      { name: "Frost Bite", description: "Strong mint with cooling effect" },
      { name: "Winter Fresh", description: "Spearmint and peppermint blend" },
      { name: "Cool Rush", description: "Eucalyptus mint fusion" },
      { name: "Glacier Mint", description: "Crisp mint with ice effect" }
    ],
    dessert: [
      { name: "Vanilla Dreams", description: "Rich vanilla with caramel notes" },
      { name: "Pistachio Paradise", description: "Nutty blend with cream" },
      { name: "Chocolate Cloud", description: "Dark chocolate with mint" },
      { name: "Caramel Kiss", description: "Sweet caramel with vanilla" },
      { name: "Cookie Crumble", description: "Cookie dough with cream" }
    ],
    exotic: [
      { name: "Arabian Nights", description: "Traditional double apple" },
      { name: "Persian Nights", description: "Saffron and cardamom blend" },
      { name: "Turkish Delight", description: "Rose and pistachio fusion" },
      { name: "Moroccan Magic", description: "Mint tea inspiration" },
      { name: "Lebanese Gold", description: "Honey and mint blend" }
    ],
    premium: [
      { name: "Royal Rose", description: "Premium rose with cream" },
      { name: "Golden Hour", description: "Honey and berries blend" },
      { name: "Diamond Dust", description: "Premium mint with cooling crystals" },
      { name: "Platinum Mix", description: "Mixed fruit premium blend" },
      { name: "Crown Jewel", description: "Special house blend" }
    ],
    seasonal: [
      { name: "Summer Sunset", description: "Watermelon and orange blend" },
      { name: "Autumn Gold", description: "Apple and cinnamon fusion" },
      { name: "Winter Warmth", description: "Spiced chai blend" },
      { name: "Spring Bloom", description: "Floral and fruit mix" },
      { name: "Holiday Magic", description: "Special seasonal blend" }
    ],
    house: [
      { name: "Moon Special", description: "Signature house blend" },
      { name: "Celestial Mix", description: "Premium fruit mix" },
      { name: "Star Dust", description: "Mint and berry fusion" },
      { name: "Galaxy Blend", description: "Exotic fruit combination" },
      { name: "Astral Dream", description: "Special mint blend" }
    ]
  };

  const shishaTypes: ShishaType[] = [
    {
      name: "Khalil Mamoon",
      price: 25,
    },
    {
      name: "Vyro Versa",
      price: 30,
    },
    {
      name: "Alpha Hookah",
      price: 30,
    },
    {
      name: "Aladdin MVP",
      price: 30,
    },
    {
      name: "Aeon",
      price: 35,
    },
    {
      name: "Moon Special",
      price: 50,
      features: [
        "Pineapple Head",
        "Ice Hose",
        "LED Lights",
        "Ice in the Vase",
        "Ice in the Chamber"
      ]
    }
  ];

  const handleCheckIn = (name: string, phone: string) => {
    // Handle check-in logic here
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-0">
        <StarryBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      </div>
      <div className="relative z-10">
        <Navbar isCheckedIn onCheckOut={onCheckOut} />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen text-white py-20 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-serif mb-4 text-white">
                {getGreeting()}, {userName}
              </h1>
              <p className="text-xl md:text-2xl text-lounge-purple">
                How would you like to relax today?
              </p>
            </motion.div>

            {/* Shisha Types Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-white text-center mb-12">
                What type of Shisha are you feeling?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shishaTypes.map((shisha) => (
                  <motion.div
                    key={shisha.name}
                    whileHover={{ y: -5 }}
                    whileTap={{ y: -2 }}
                    className="bg-black/80 backdrop-blur-md border border-lounge-purple/20 rounded-lg p-6 shadow-lg relative group"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-serif text-white">
                        {shisha.name}
                      </h3>
                      {shisha.features && (
                        <Tooltip.Provider>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <button className="cursor-help">
                                <Info className="w-4 h-4 text-lounge-purple hover:text-lounge-purple/80 transition-colors" />
                              </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content
                              className="bg-black/90 backdrop-blur-md border border-lounge-purple/30 rounded-md p-3 text-sm text-white max-w-xs shadow-lg"
                              side="bottom"
                              align="start"
                              sideOffset={5}
                            >
                              <ul className="space-y-1">
                                {shisha.features.map((feature, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <span className="text-lounge-purple">•</span>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <Tooltip.Arrow className="fill-black/90" width={11} height={5} />
                            </Tooltip.Content>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      )}
                    </div>
                    <p className="text-lounge-purple text-right font-serif text-xl">
                      ${shisha.price}
                    </p>
                    
                    {/* Quantity Controls */}
                    {shishaQuantities[shisha.name] ? (
                      <div className="flex items-center justify-end gap-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            updateShishaQuantity(shisha.name, false);
                          }}
                          className="w-8 h-8 rounded-full bg-lounge-purple text-white flex items-center justify-center"
                        >
                          -
                        </motion.button>
                        <span className="text-white font-medium w-8 text-center">
                          {shishaQuantities[shisha.name]}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            updateShishaQuantity(shisha.name, true);
                          }}
                          className="w-8 h-8 rounded-full bg-lounge-purple text-white flex items-center justify-center"
                        >
                          +
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateShishaQuantity(shisha.name, true);
                        }}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-lounge-purple text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        +1
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Flavors Section */}
            <div className="space-y-20">
              {Object.entries(flavorCategories).map(([category, flavors], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + categoryIndex * 0.1 }}
                >
                  <h2 className="text-2xl md:text-3xl font-serif text-white text-center mb-8 capitalize">
                    {category} Collection
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {flavors.map((flavor) => (
                      <motion.div
                        key={flavor.name}
                        whileHover={{ y: -5 }}
                        whileTap={{ y: -2 }}
                        className="bg-black/80 backdrop-blur-md border border-lounge-purple/20 rounded-lg p-6 shadow-lg relative group"
                      >
                        <h4 className="text-2xl font-serif text-white mb-3">{flavor.name}</h4>
                        <p className="text-white/70">{flavor.description}</p>
                        {quantities[flavor.name] ? (
                          <div className="flex items-center justify-end gap-2 mt-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateQuantity(flavor.name, false, selectedShisha)}
                              className="w-8 h-8 rounded-full bg-lounge-purple text-white flex items-center justify-center"
                            >
                              -
                            </motion.button>
                            <span className="text-white font-medium w-8 text-center">
                              {quantities[flavor.name]}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateQuantity(flavor.name, true, selectedShisha)}
                              className="w-8 h-8 rounded-full bg-lounge-purple text-white flex items-center justify-center"
                            >
                              +
                            </motion.button>
                          </div>
                        ) : (
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              if (!selectedShisha) {
                                toast.error('Please select a shisha first', {
                                  icon: '💫',
                                  style: {
                                    background: '#1a1a1a',
                                    color: '#fff',
                                    border: '1px solid rgba(139, 92, 246, 0.3)',
                                  },
                                });
                                return;
                              }
                              updateQuantity(flavor.name, true, selectedShisha);
                            }}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-lounge-purple text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            +1
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        <CartSummary 
          quantities={quantities} 
          shishaQuantities={shishaQuantities}
          shishaFlavors={shishaFlavors}
          flavorCategories={flavorCategories}
          updateQuantity={updateQuantity}
          shishaTypes={shishaTypes}
        />
      </div>
    </>
  );
};

export default MenuPage; 