import { footerContent } from '../../data/footer';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="footer-main">
        {footerContent.map((item) => (
          <div key={item.id} className="container-list">
            <p>{item.title}</p>
            <ul>
              {Array.isArray(item.links) ? (
                item.links.map((value) => (
                  <li key={value.url}>
                    <a href={value.url} target="_blank" rel="noopener noreferrer">
                      {value.name}
                    </a>
                  </li>
                ))
              ) : (
                <li>
                  <a href={item.links.url} target="_blank" rel="noopener noreferrer">
                    {item.links.name}
                  </a>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
      <div className="copyright-container">
        <p> &copy; Feito por Paulo Xavier {new Date().getFullYear()} </p>
      </div>
    </footer>
  );
};

export default Footer;
