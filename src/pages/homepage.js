import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './homepage.css'
import showmebug from '../showmebug.svg';

const HomePage = () => {
    useEffect(() => {
    document.body.classList.add("homepage-body-background");

    // 当组件卸载时，移除样式
    return () => {
      document.body.classList.remove("homepage-body-background");
    };
  }, []);

    return (

      <div className="homepage">
        <img className="logo" src={showmebug} alt="ShowMeBug" />
        <p>
          <Link to="/vote/1">Code with React</Link>
        </p>
      </div>
      
    );
}

export default HomePage