import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Faltan las variables de entorno de Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// PRODUCTS SERVICE (Solo lectura para tienda)
// ==========================================
export const productService = {
  // Obtener todos los productos activos
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error al cargar productos:', error);
      return [];
    }
    return data || [];
  },

  // Obtener producto por slug
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single();
    
    if (error) {
      console.error('Error al cargar producto:', error);
      return null;
    }
    return data;
  },

  // Obtener productos destacados
  async getFeatured() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .eq('featured', true)
      .limit(6);
    
    if (error) {
      console.error('Error al cargar productos destacados:', error);
      return [];
    }
    return data || [];
  },

  // Obtener productos por categoría
  async getByCategory(categoryName) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .eq('category_name', categoryName);
    
    if (error) {
      console.error('Error al cargar productos por categoría:', error);
      return [];
    }
    return data || [];
  }
};

// ==========================================
// CATEGORIES SERVICE
// ==========================================
export const categoryService = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error al cargar categorías:', error);
      return [];
    }
    return data || [];
  }
};

// ==========================================
// TESTIMONIALS SERVICE
// ==========================================
export const testimonialService = {
  async getAll() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error al cargar testimonios:', error);
      return [];
    }
    return data || [];
  }
};

// ==========================================
// ORDERS SERVICE
// ==========================================
export const orderService = {
  async create(order) {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();
    
    if (error) {
      console.error('Error al crear pedido:', error);
      throw error;
    }
    return data;
  }
};

// ==========================================
// NEWSLETTER SERVICE
// ==========================================
export const newsletterService = {
  async subscribe(email) {
    const { data, error } = await supabase
      .from('newsletter')
      .insert([{ email }])
      .select()
      .single();
    
    if (error) {
      if (error.code === '23505') {
        throw new Error('Este email ya está suscrito');
      }
      console.error('Error al suscribir:', error);
      throw error;
    }
    return data;
  }
};

// ==========================================
// SETTINGS SERVICE
// ==========================================
export const settingsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('settings')
      .select('*');
    
    if (error) {
      console.error('Error al cargar configuración:', error);
      return {};
    }
    
    const settings = {};
    data?.forEach(item => {
      settings[item.key] = item.value;
    });
    
    return settings;
  }
};