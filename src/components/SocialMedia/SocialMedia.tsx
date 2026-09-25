import {
  WhatsappLogoIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
  IconContext,
} from '@phosphor-icons/react';
import './SocialMedia.scss';

const SocialMedia = () => {
  return (
    <section className="social-media">
      <p>A gente se encontra em</p>

      <IconContext.Provider value={{ color: '#2c2c2c', size: '1.7rem', weight: 'bold' }}>
        <a
          href="https://wa.me/5511981909538?text=Olá, vim pelo site Hubcentral."
          title='Abrir Whatsapp'
          aria-label="Link para Whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappLogoIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/paulo-henrique18/"
          title='Abrir Linkedin'
          aria-label="Link para Linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinLogoIcon />
        </a>
        <a
          href="https://github.com/PauloXaviers/"
          title='Abrir Github'
          aria-label="Link para Github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogoIcon />
        </a>
      </IconContext.Provider>
    </section>
  );
};
export default SocialMedia;
