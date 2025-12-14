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
import nariz31016 from '@/assets/products/nariz/na-31016.png';
import nariz29026 from '@/assets/products/nariz/na-29026.png';
import nariz28020 from '@/assets/products/nariz/na-28020.png';
import nariz27015 from '@/assets/products/nariz/na-27015.png';
import nariz26013 from '@/assets/products/nariz/na-26013.png';
import nariz26013_2 from '@/assets/products/nariz/na-26013-2.png';
import nariz25013 from '@/assets/products/nariz/na-25013.png';
import nariz24013 from '@/assets/products/nariz/na-24013.png';
import nariz23020 from '@/assets/products/nariz/na-23020.png';
import nariz22013 from '@/assets/products/nariz/na-22013.png';

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
  {
    id: 'nariz-31016',
    name: 'Piercing Nariz Borboleta Mini',
    price: 26.90,
    image: nariz31016,
    gallery: [nariz31016],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril borboleta mini delicada em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-29026',
    name: 'Piercing Nariz Coração Vazado Cristais',
    price: 34.90,
    image: nariz29026,
    gallery: [nariz29026],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril coração vazado com cristais em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-28020',
    name: 'Piercing Nariz Flor Bolinhas',
    price: 32.90,
    image: nariz28020,
    gallery: [nariz28020],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril flor com bolinhas e cristal central em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-27015',
    name: 'Piercing Nariz Lua',
    price: 24.90,
    image: nariz27015,
    gallery: [nariz27015],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril lua crescente em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-26013',
    name: 'Piercing Nariz Estrela',
    price: 24.90,
    image: nariz26013,
    gallery: [nariz26013, nariz26013_2],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril estrela clássica em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-25013',
    name: 'Piercing Nariz Coração Mini',
    price: 22.90,
    image: nariz25013,
    gallery: [nariz25013],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril coração mini discreto em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-24013',
    name: 'Piercing Nariz Coração Cristal',
    price: 29.90,
    image: nariz24013,
    gallery: [nariz24013],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril coração com cristal central em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-23020',
    name: 'Piercing Nariz Flor Dourada',
    price: 34.90,
    image: nariz23020,
    gallery: [nariz23020],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril flor dourada com cristal em aço cirúrgico banhado a ouro',
    inStock: true,
  },
  {
    id: 'nariz-22013',
    name: 'Piercing Nariz Estrela Cristal',
    price: 29.90,
    image: nariz22013,
    gallery: [nariz22013],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril estrela com cristal central em aço cirúrgico',
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
