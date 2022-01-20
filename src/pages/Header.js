import { Link } from 'react-router-dom';

const  Header = () => {
  const lang = localStorage.getItem('lang') || 'al';
  const onChange  = (e) => {
    localStorage.setItem("lang", e.target.value)
    window.location.reload();
  }
    return (
      <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light navb1">
        <Link className="llink" to={'/'}>
          <img className="logo" src="/img/PIK_logo-01-min.png" width="200px"></img>
        </Link>
          {/* <img className="logo" src="/img/PIK_logo-01-min.png" width="15%"></img> */}
          <button className="navbar-toggler ntr mr-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

  <div className="collapse navbar-collapse nvr" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
    <Link className="nav-link nv" to="/aboutus">{lang === 'al' ? 'Rreth nesh' : 'Über uns'}</Link>
      </li>
      <li className="nav-item">
    <Link className="nav-link nv" to="/courses">{lang === 'al' ? 'Kurset' : 'Kurse'}</Link>
      </li>
      <li className="nav-item">
    <Link className="nav-link nv" to="/application">{lang === 'al' ? 'Aplikimi' : 'Anwendung'}</Link>
      </li>
      <li className="nav-item">
    <Link className="nav-link nv" to="/news">{lang === 'al' ? 'Lajme' : 'Nachrichten'}</Link>
      </li>
      <li className="nav-item">
    <Link className="nav-link nv" to="/contact">{lang === 'al' ? 'Kontakti' : 'Kontakt'}</Link>
      </li>  
      {/* <li className="nav-item">
            <select className="form-select form-select-sm langbutton" onChange={onChange} value={lang} >
              <option value="al" className="opt">Shqip</option>
              <option value="dt" className="opt">Deutsch</option>
            </select>
       </li> */}
    </ul>
  </div>
</nav>
</>
    )
}

export default Header;
