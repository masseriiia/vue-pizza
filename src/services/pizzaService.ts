import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const transformPizzas = (data) => {
  return data?.map(item => ({
    ...item,
    activeType: 0,
    activeSize: 0,
    count: 1,
  })) || [];
}

export async function fetchPizzas() {
  const { data } = await supabase.from('pizza').select()
  return transformPizzas(data);
}

export async function fetchPizzasWithFilters(obj) {
  let query = supabase.from('pizza').select()

  query = pizzasCategory(query, obj.activeCategory)
  query = pizzasByFromToPrice(query, obj.formDataPrice)
  query = pizzasNew(query, obj.pizzaNewBoolean)
  query = pizzasBySort(query, obj.activeSort)

  const { data } = await query

  return transformPizzas(data)
}

function pizzasCategory(query, category) {
  return category !== 0 ? query.in('category', [category]) : query;
}

function pizzasByFromToPrice(query, { priceFrom, priceTo }) {
  return priceFrom > 0 || priceTo > 0 ? query.gte('price', priceFrom).lte('price', priceTo) : query
}

function pizzasNew(query, pizzaNewBoolean) {
  return pizzaNewBoolean === true ? query.eq('new', true) : query
}

function pizzasBySort(query, activeSort) {
  if (activeSort === 'price') {
    return query.order('price', { ascending: true });
  } else if (activeSort === '-price') {
    return query.order('price', { ascending: false });
  } else if (activeSort === 'title') {
    return query.order('title', { ascending: true });
  }
}
