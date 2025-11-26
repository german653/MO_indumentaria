// Este archivo ahora solo exporta las categorías estáticas
// Los productos se cargan dinámicamente desde Supabase

export const categories = [
  { id: 'all', name: 'Todo', slug: 'todo' },
  { id: 'leggings', name: 'Leggings', slug: 'leggings' },
  { id: 'tops', name: 'Tops', slug: 'tops' },
  { id: 'conjuntos', name: 'Conjuntos', slug: 'conjuntos' }
];

// Ya NO exportamos products estáticos, ahora vienen de Supabase
// Los componentes los cargarán usando: productService.getAll()