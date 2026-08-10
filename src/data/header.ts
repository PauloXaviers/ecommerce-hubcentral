import phoneIcon from "../assets/icons/phone_forwarded.svg";
import mailIcon from "../assets/icons/mail.svg";
import instagramIcon from "../assets/icons/instagram.png";
import youtubeIcon from "../assets/icons/youtube.png";
import facebookIcon from "../assets/icons/facebook.png";
import twitterIcon from "../assets/icons/twitter_old.png";

interface TopBarContactItems {
  id: string;
  description: string;
  icon: string;
}

interface Icon {
  id: string;
  img: string;
  url?: string;
}

interface TopBarSocialItems {
  description: string;
  icons: Icon[];
}

interface NavItems {
  id: string;
  path: string;
  text: string;
}

export const topBarContactItems: TopBarContactItems[] = [
  {
    id: "contact",
    description: "(225) 555-0118",
    icon: phoneIcon,
  },
  {
    id: "mail ",
    description: "hubcentral@hubcentral.com",
    icon: mailIcon,
  },
];

export const topBarSocialtItems: TopBarSocialItems = {
  description: "Siga-nos",
  icons: [
    {
      id: "instagram",
      img: instagramIcon,
    },
    {
      id: "youtube",
      img: youtubeIcon,
    },
    {
      id: "facebook",
      img: facebookIcon,
    },
    {
      id: "twitter",
      img: twitterIcon,
    },
  ],
};

export const navItems: NavItems[] = [
  {
    id: "home",
    path: "/",
    text: "Ínicio",
  },
  {
    id: "parceiros",
    path: "/parceiros",
    text: "Parceiros",
  },
  {
    id: "contato",
    path: "/contato",
    text: "Contato",
  },
];
