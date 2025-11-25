// Datos estáticos de respaldo para que la web no se rompa
export const products = [
  {
    id: 1,
    name: "Legging Essential Black",
    slug: "legging-essential-black",
    category: "Leggings",
    price: 12500,
    oldPrice: 15000,
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    ],
    description: "Legging de cintura alta con tecnología de compresión suave.",
    sizes: ["S", "M", "L"],
    colors: ["Negro"],
    featured: true,
    bestseller: true,
    stock: 10
  },
  {
    id: 2,
    name: "Top Deportivo Luxe",
    slug: "top-deportivo-luxe",
    category: "Tops",
    price: 8500,
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"
    ],
    description: "Top deportivo de alto impacto.",
    sizes: ["S", "M", "L"],
    colors: ["Blanco"],
    featured: true,
    stock: 5
  }
];

export const categories = [
  { id: 'all', name: 'Todo' },
  { id: 'leggings', name: 'Leggings' },
  { id: 'tops', name: 'Tops' },
  { id: 'conjuntos', name: 'Conjuntos' }
];

export const testimonials = [
  {
    id: 1,
    name: "Ana Gomez",
    rating: 5,
    comment: "La calidad es increíble, super recomendados.",
    image: "https://i.pravatar.cc/150?img=1"
  }
];