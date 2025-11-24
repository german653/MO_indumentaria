export const products = [
  {
    id: 1,
    name: "Legging Essential Black",
    slug: "legging-essential-black",
    category: "Leggings",
    price: 12500,
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
      "https://images.unsplash.com/photo-1556906918-ba0ea1488d02?w=800&q=80"
    ],
    description: "Legging de cintura alta con tecnología de compresión suave. Perfecto para yoga y entrenamiento intenso.",
    features: [
      "Cintura alta moldeadora",
      "Tejido de secado rápido",
      "Compresión suave",
      "Bolsillo interno"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Negro", "Gris", "Navy"],
    featured: true,
    bestseller: true
  },
  {
    id: 2,
    name: "Top Deportivo Luxe",
    slug: "top-deportivo-luxe",
    category: "Tops",
    price: 8900,
    images: [
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
      "https://images.unsplash.com/photo-1600222837815-76c93fd24019?w=800&q=80"
    ],
    description: "Top con soporte medio, ideal para running y fitness. Diseño elegante con espalda cruzada.",
    features: [
      "Soporte medio",
      "Espalda cruzada",
      "Transpirable",
      "Copas removibles"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Negro", "Blanco", "Rosa"],
    featured: true,
    bestseller: false
  },
  {
    id: 3,
    name: "Conjunto Flow Premium",
    slug: "conjunto-flow-premium",
    category: "Conjuntos",
    price: 18900,
    images: [
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
    ],
    description: "Set completo: legging + top. Tejido seamless ultra suave. Disponible en colores exclusivos.",
    features: [
      "Tejido seamless",
      "Ultra suave",
      "Set completo",
      "Colores exclusivos"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Lavanda", "Mint", "Rosa"],
    featured: true,
    bestseller: true
  },
  {
    id: 4,
    name: "Legging Sculpt Pro",
    slug: "legging-sculpt-pro",
    category: "Leggings",
    price: 14200,
    images: [
      "https://images.unsplash.com/photo-1556906918-ba0ea1488d02?w=800&q=80"
    ],
    description: "Alta compresión con efecto moldeador. Diseño anatómico para máximo confort.",
    features: [
      "Alta compresión",
      "Efecto moldeador",
      "Diseño anatómico",
      "Anti-celulitis"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Negro", "Chocolate"],
    featured: false,
    bestseller: true
  },
  {
    id: 5,
    name: "Bralette Soft Cloud",
    slug: "bralette-soft-cloud",
    category: "Tops",
    price: 7500,
    images: [
      "https://images.unsplash.com/photo-1600222837815-76c93fd24019?w=800&q=80"
    ],
    description: "Bralette sin costuras con soporte ligero. Perfecto para yoga y pilates.",
    features: [
      "Sin costuras",
      "Soporte ligero",
      "Ultra cómodo",
      "Material suave"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Nude", "Negro", "Blanco"],
    featured: false,
    bestseller: false
  },
  {
    id: 6,
    name: "Conjunto Harmony Edition",
    slug: "conjunto-harmony-edition",
    category: "Conjuntos",
    price: 21500,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
    ],
    description: "Edición limitada con detalles bordados. Incluye legging y crop top.",
    features: [
      "Edición limitada",
      "Detalles bordados",
      "Set completo",
      "Premium quality"
    ],
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Rosa"],
    featured: false,
    bestseller: false
  },
  {
    id: 7,
    name: "Legging Sunset Gradient",
    slug: "legging-sunset-gradient",
    category: "Leggings",
    price: 13800,
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"
    ],
    description: "Diseño exclusivo con degradado. Tejido de secado rápido y alta transpirabilidad.",
    features: [
      "Diseño degradado",
      "Secado rápido",
      "Alta transpirabilidad",
      "Diseño único"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sunset", "Ocean"],
    featured: false,
    bestseller: false
  },
  {
    id: 8,
    name: "Top Cross Back Elite",
    slug: "top-cross-back-elite",
    category: "Tops",
    price: 9200,
    images: [
      "https://images.unsplash.com/photo-1598217260629-b937c702ee0b?w=800&q=80"
    ],
    description: "Top con tirantes cruzados en la espalda. Soporte alto para entrenamientos intensos.",
    features: [
      "Tirantes cruzados",
      "Soporte alto",
      "Alta sujeción",
      "Diseño ergonómico"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Negro", "Blanco", "Navy"],
    featured: false,
    bestseller: true
  }
];

export const categories = [
  { id: 'all', name: 'Todo', slug: 'todo' },
  { id: 'leggings', name: 'Leggings', slug: 'leggings' },
  { id: 'tops', name: 'Tops', slug: 'tops' },
  { id: 'conjuntos', name: 'Conjuntos', slug: 'conjuntos' }
];

export const testimonials = [
  {
    id: 1,
    name: "María González",
    rating: 5,
    comment: "La calidad es excepcional. El legging Essential es lo mejor que he comprado.",
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Laura Martínez",
    rating: 5,
    comment: "Amo la comodidad y el diseño. Definitivamente volveré a comprar.",
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "Sofía Rodríguez",
    rating: 5,
    comment: "El conjunto Flow es perfecto. La tela es suave y el fit impecable.",
    image: "https://i.pravatar.cc/150?img=9"
  }
];