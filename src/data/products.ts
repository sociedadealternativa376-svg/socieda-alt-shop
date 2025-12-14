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
import nariz23020_2 from '@/assets/products/nariz/na-23020-2.png';
import nariz22013 from '@/assets/products/nariz/na-22013.png';
import nariz21020 from '@/assets/products/nariz/na-21020.png';
import nariz21020_2 from '@/assets/products/nariz/na-21020-2.png';
import nariz20020 from '@/assets/products/nariz/na-20020.png';
import nariz20020_2 from '@/assets/products/nariz/na-20020-2.png';
import nariz19010 from '@/assets/products/nariz/na-19010.png';
import nariz18010 from '@/assets/products/nariz/na-18010.png';
import nariz17010 from '@/assets/products/nariz/na-17010.png';
import nariz16010 from '@/assets/products/nariz/na-16010.png';
import nariz15010 from '@/assets/products/nariz/na-15010.png';
import nariz14010 from '@/assets/products/nariz/na-14010.png';
import nariz13010 from '@/assets/products/nariz/na-13010.png';
import nariz12010 from '@/assets/products/nariz/na-12010.png';
import nariz11010 from '@/assets/products/nariz/na-11010.png';
import nariz10010 from '@/assets/products/nariz/na-10010.png';
import nariz09010 from '@/assets/products/nariz/na-09010.png';
import nariz08016 from '@/assets/products/nariz/na-08016.png';
import nariz08010 from '@/assets/products/nariz/na-08010.png';
import nariz07016 from '@/assets/products/nariz/na-07016.png';
import nariz07016_2 from '@/assets/products/nariz/na-07016-2.png';

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
    gallery: [nariz23020, nariz23020_2],
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
  {
    id: 'nariz-21020',
    name: 'Piercing Nariz Trio Cristais',
    price: 32.90,
    image: nariz21020,
    gallery: [nariz21020, nariz21020_2],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril trio de cristais com bolinhas em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-20020',
    name: 'Piercing Nariz Duplo Cristal',
    price: 29.90,
    image: nariz20020,
    gallery: [nariz20020, nariz20020_2],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril duplo cristal elegante em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-19010',
    name: 'Piercing Nariz Ponto Cristal 1,3mm',
    price: 19.90,
    image: nariz19010,
    gallery: [nariz19010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril ponto de cristal 1,3mm em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-18010',
    name: 'Piercing Nariz Cristal Rosa 1,2mm',
    price: 19.90,
    image: nariz18010,
    gallery: [nariz18010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril cristal rosa 1,2mm em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-17010',
    name: 'Piercing Nariz Cristal Verde 1,2mm',
    price: 19.90,
    image: nariz17010,
    gallery: [nariz17010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril cristal verde 1,2mm em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-16010',
    name: 'Piercing Nariz Bolinha Prata 1,2mm',
    price: 17.90,
    image: nariz16010,
    gallery: [nariz16010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril bolinha prata clássica 1,2mm em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-15010',
    name: 'Piercing Nariz Bolinha Mini',
    price: 17.90,
    image: nariz15010,
    gallery: [nariz15010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril bolinha mini discreta em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-14010',
    name: 'Piercing Nariz Cristal Lilás 1,6mm',
    price: 19.90,
    image: nariz14010,
    gallery: [nariz14010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril cristal lilás 1,6mm em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-13010',
    name: 'Piercing Nariz Cristal Rosa Claro 1,2mm',
    price: 19.90,
    image: nariz13010,
    gallery: [nariz13010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril cristal rosa claro 1,2mm em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-12010',
    name: 'Piercing Nariz Cristal Aurora 1,6mm',
    price: 19.90,
    image: nariz12010,
    gallery: [nariz12010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril cristal aurora boreal 1,6mm em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-11010',
    name: 'Piercing Nariz Cristal Transparente 1,2mm',
    price: 17.90,
    image: nariz11010,
    gallery: [nariz11010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril cristal transparente 1,2mm em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-10010',
    name: 'Piercing Nariz Cristal Azul 1,6mm',
    price: 19.90,
    image: nariz10010,
    gallery: [nariz10010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril cristal azul 1,6mm em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-09010',
    name: 'Piercing Nariz Cristal Azul Claro 1,2mm',
    price: 17.90,
    image: nariz09010,
    gallery: [nariz09010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril cristal azul claro 1,2mm em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-08016',
    name: 'Piercing Nariz Flor Cristal',
    price: 29.90,
    image: nariz08016,
    gallery: [nariz08016],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril flor de cristal delicada em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-08010',
    name: 'Piercing Nariz Cristal Acqua',
    price: 17.90,
    image: nariz08010,
    gallery: [nariz08010],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril cristal acqua em aço cirúrgico',
    inStock: true,
  },
  {
    id: 'nariz-07016',
    name: 'Piercing Nariz Flor Cristal Grande',
    price: 32.90,
    image: nariz07016,
    gallery: [nariz07016, nariz07016_2],
    category: 'joia',
    subcategory: 'nariz',
    description: 'Piercing nostril flor de cristal grande em aço cirúrgico',
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
