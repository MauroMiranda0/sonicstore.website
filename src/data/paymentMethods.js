import getImageUrl from '../config/imageUrls';

export const paymentMethods = [
  {
    id: 'aplazo',
    icon: getImageUrl('public/img/aplazo-logo.png'),
    iconAlt: 'Logo oficial de Aplazo',
    name: 'Aplazo',
    description: 'Compra ahora y paga en cuotas sin tarjeta de crédito.',
  },
  {
    id: 'mercadopago',
    icon: getImageUrl('public/img/Mercado_Pago.svg.png'),
    iconAlt: 'Logo oficial de Mercado Pago',
    name: 'Mercado Pago',
    description: 'Con o sin tarjeta, en cuotas o al contado.',
  },
  {
    id: 'transferencia',
    icon: getImageUrl('public/img/transferencia-icon.svg'),
    iconAlt: 'Ícono de transferencia bancaria electrónica',
    name: 'Transferencia',
    description: 'Transferencia bancaria electrónica sin comisiones extra.',
  },
];
