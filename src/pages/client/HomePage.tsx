import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.scss'
import HeroImg from '../../assets/images/7607107_3644996.png';

const HomePage = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <section className={styles.home}>
      <div className="container">
        <div className={styles.home__wrapper}>
          <div>
            <h1>SharePort</h1>
            <h3>Create your own CV profile with us and make employers shocked</h3>
            <button onClick={() => navigate('/login')}>Get Started</button>
          </div>
          <div>
            <img src={HeroImg} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage