type FooterLink = {
  url: string;
  name: string;
};

type FooterContent = {
  id: string;
  title: string;
  links: FooterLink | FooterLink[];
};

export const footerContent: FooterContent[] = [
  {
    id: 'infos',
    title: 'Informações da empresa',
    links: [
      {
        url: 'https://pauloxaviers.vercel.app/',
        name: 'Sobre nós',
      },
      {
        url: 'https://www.linkedin.com/in/paulo-henrique18/?isSelfProfile=true',
        name: 'Carreira',
      },
    ],
  },
  {
    id: 'resources',
    title: 'Resources',
    links: {
      url: 'https://dummyjson.com/docs/products',
      name: 'API',
    },
  },
];
