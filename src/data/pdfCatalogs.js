import getImageUrl from '../config/imageUrls';

export const pdfCatalogs = [
  {
    id: 'terramar',
    name: 'Terramar Brands',
    description: 'Belleza de alta tecnología con ingredientes del mar y la naturaleza.',
    logoSrc: getImageUrl('img/Marcas/terramar.png'),
    logoAlt: 'Logo Terramar Brands',
    bgGradient: 'linear-gradient(135deg, #0a4f7a 0%, #0e7db5 100%)',
    waMessage: 'Hola. Me gustaría recibir el catálogo PDF de Terramar Brands.',
  },
  {
    id: 'forever',
    name: 'Forever Living',
    description: 'Productos de Aloe Vera, suplementación, nutrición y cuidado personal.',
    logoSrc: getImageUrl('img/Marcas/forever.png'),
    logoAlt: 'Logo Forever Living',
    bgGradient: 'linear-gradient(135deg, #F7BF01 0%, #F8D45E 100%)',
    waMessage: 'Hola. Me gustaría recibir el catálogo PDF de Forever Living.',
  },
];