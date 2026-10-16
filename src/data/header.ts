import { PhoneIcon, MailboxIcon, InstagramLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import { type Icon } from '@phosphor-icons/react';

interface TopBarContactItems {
  id: string;
  description: string;
  icon: Icon;
}

interface SocialIcon {
  id: string;
  icon: Icon;
  url?: string;
}

interface TopBarSocialItems {
  description: string;
  icons: SocialIcon[];
}

interface NavItems {
  id: string;
  path: string;
  text: string;
}

export const topBarContactItems: TopBarContactItems[] = [
  {
    id: 'contact',
    description: '(225) 555-0118',
    icon: PhoneIcon,
  },
  {
    id: 'mail ',
    description: 'hubcentral@hubcentral.com',
    icon: MailboxIcon,
  },
];

export const topBarSocialtItems: TopBarSocialItems = {
  description: 'Siga-nos',
  icons: [
    {
      id: 'instagram',
      icon: InstagramLogoIcon,
    },
    {
      id: 'youtube',
      icon: LinkedinLogoIcon,
    },
  ],
};

export const navItems: NavItems[] = [
  {
    id: 'home',
    path: '/',
    text: 'Ínicio',
  },
  {
    id: 'parceiros',
    path: '/parceiros',
    text: 'Parceiros',
  },
  {
    id: 'contato',
    path: '/contato',
    text: 'Contato',
  },
];
