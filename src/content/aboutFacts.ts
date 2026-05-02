export type AboutFact = {
  id: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  /** Intrinsic dimensions for layout reserve / decode hints (cards use object-cover) */
  imageWidth: number;
  imageHeight: number;
};

/** Short facts for the About page — swap images/copy anytime. */
export const aboutFacts: AboutFact[] = [
  {
    id: 'uni-physics',
    title: 'Engineering physics at UNI',
    body:
      'I study Engineering Physics at the National University of Engineering (UNI), with a sharp focus on mathematical depth and first-principles thinking.',
    image: '/images/uni.jpeg',
    imageAlt: 'UNI campus and academic context',
    imageWidth: 800,
    imageHeight: 500,
  },
  {
    id: 'research-ml',
    title: 'Research in deep learning',
    body:
      'I spend a lot of time on modern ML — from wave-function–style neural models to how we evaluate and reproduce tricky papers.',
    image: '/images/nonhuman_2.jpg',
    imageAlt: 'Research and collaboration',
    imageWidth: 800,
    imageHeight: 500,
  },
  {
    id: 'acecom',
    title: 'ACECOM member',
    body:
      'I joined ACECOM (Asociación Científica de Computación) to work alongside peers on serious, technical projects outside the classroom.',
    image: '/images/acecom.jpg',
    imageAlt: 'ACECOM computing association',
    imageWidth: 800,
    imageHeight: 500,
  },
  {
    id: 'path',
    title: 'An unusual path in',
    body:
      'Before physics, I touched mechatronics and telecoms engineering — useful training in systems, hardware intuition, and not giving up when things break.',
    image: '/images/utec.webp',
    imageAlt: 'Earlier engineering studies',
    imageWidth: 800,
    imageHeight: 500,
  },
];
