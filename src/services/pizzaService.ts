import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

interface Pizza {
  id: number;
  title: string;
  price: number;
  category: number;
  rating: number;
  new?: boolean;
  activeType: number;
  activeSize: number;
  count: number;
}

const transformPizzas = (data): Pizza[] => {
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

export async function fetchPizzasWithFilters(obj, page: number, perPage: number) {
  const start = (page - 1) * perPage
  const end = start + perPage - 1

  let query = supabase
    .from('pizza')
    .select('*', { count: 'exact' })

  query = pizzasCategory(query, obj.activeCategory)
  query = pizzasByFromToPrice(query, obj.formDataPrice)
  query = pizzasNew(query, obj.pizzaNewBoolean)
  query = pizzasBySort(query, obj.activeSort)

  query = query.range(start, end);

  const { data, count } = await query

  return {
    data: transformPizzas(data),
    total: count,
  };
}

function pizzasCategory(query, category: number) {
  return category !== 0 ? query.in('category', [category]) : query;
}

function pizzasByFromToPrice(query, { priceFrom, priceTo }: { priceFrom: number, priceTo: number }) {
  return priceFrom > 0 || priceTo > 0 ? query.gte('price', priceFrom).lte('price', priceTo) : query
}

function pizzasNew(query, pizzaNewBoolean: boolean) {
  return pizzaNewBoolean === true ? query.eq('new', true) : query
}

function pizzasBySort(query, activeSort: string) {
  if (activeSort === 'price') {
    return query.order('price', { ascending: true });
  } else if (activeSort === '-price') {
    return query.order('price', { ascending: false });
  } else if (activeSort === 'title') {
    return query.order('title', { ascending: true });
  }
}

export async function fetchGetPizzaById(id: number) {
  const { data} = await supabase
    .from('pizza')
    .select('*')
    .eq('id', id)
    .single();

  if (data) {
    return {
      ...data,
      activeType: 0,
      activeSize: 0,
      count: 1,
    };
  }
}

export async function fetchPizzasPopular() {
  const { data } = await supabase
    .from('pizza')
    .select()
    .gte('rating', 9);

  return transformPizzas(data);
}
