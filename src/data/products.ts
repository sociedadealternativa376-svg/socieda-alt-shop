import { Product } from '@/types/product';

// Imagens dos piercings de nariz
import nariz38010 from '@/assets/products/nariz/na-38010.png';
import nariz40010 from '@/assets/products/nariz/na-40010.png';
import nariz36021 from '@/assets/products/nariz/na-36021.png';
import nariz36021_2 from '@/assets/products/nariz/na-36021-2.png';
import nariz37026 from '@/assets/products/nariz/na-37026.png';
import nariz34010 from '@/assets/products/nariz/na-34010.png';
import nariz35012 from '@/assets/products/nariz/na-35012.png';
import nariz33016 from '@/assets/products/nariz/na-33016.png';
import nariz32016 from '@/assets/products/nariz/na-32016.png';
import nariz30028 from '@/assets/products/nariz/na-30028.png';

export interface ProductWithGallery extends Product {
  gallery: string[];
}

export const products: ProductWithGallery[] = [
  // Piercings de Nariz (Joias)
  {
    id: 'nariz-38010',
    name: 'Piercing Nariz Folha',
    price: 29.90,
    image: nariz38010,
    gallery: [nariz38010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril em formato de folha delicada em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-40010',
    name: 'Piercing Nariz Coelho',
    price: 29.90,
    image: nariz40010,
    gallery: [nariz40010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril em formato de coelhinho fofo em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-36021',
    name: 'Piercing Nariz Cobra',
    price: 34.90,
    image: nariz36021,
    gallery: [nariz36021, nariz36021_2],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril em formato de cobra estilizada em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-37026',
    name: 'Piercing Nariz Flor Cristais',
    price: 39.90,
    image: nariz37026,
    gallery: [nariz37026],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril flor com cristais brilhantes em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-34010',
    name: 'Piercing Nariz Ponto Cristal',
    price: 24.90,
    image: nariz34010,
    gallery: [nariz34010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril discreto com ponto de cristal em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-35012',
    name: 'Piercing Nariz Flor Vazada',
    price: 27.90,
    image: nariz35012,
    gallery: [nariz35012],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril flor delicada vazada em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-33016',
    name: 'Piercing Nariz Caveira',
    price: 32.90,
    image: nariz33016,
    gallery: [nariz33016],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril caveira rock em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-32016',
    name: 'Piercing Nariz Borboleta',
    price: 29.90,
    image: nariz32016,
    gallery: [nariz32016],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril borboleta delicada em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-30028',
    name: 'Piercing Nariz Coração Cristais',
    price: 39.90,
    image: nariz30028,
    gallery: [nariz30028],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril coração com cristais brilhantes em aço cirúrgico',
    inStock: true,
  },
];

export const categories = [
  {
    id: 'joia',
    name: 'Joias',
    subcategories: ['nariz'],
  },
];
