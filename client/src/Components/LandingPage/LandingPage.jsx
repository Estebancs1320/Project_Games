import { Link } from 'react-router-dom';
import style from './landingpage.module.css';
import logoLanding from '../../Image/logolanding.png'
import botonstart from '../../Image/botonstart.png'

const LandingPage = () => {
  return (
    <div className={style.welcomeimagen}>
      <img  className={style.landingLogo} src={logoLanding} alt="zlogo" />
      <h1 className={style.welcome}>¡Welcome!</h1>
      <div>
      <Link to={"/home"}>
          <img className={style.botonstart} src={botonstart} alt="botstart" />
      </Link>
      </div>
    </div>
  );
};

export default LandingPage;
