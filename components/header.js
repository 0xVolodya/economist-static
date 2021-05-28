import {faBars, faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useState} from 'react'
import Link from "next/link";

export default function Header() {
  const sections = ["Leaders", "Letters", "Briefing", "United States", "The Americas", "Asia", "China", "Middle East & Africa", "Europe", "Britain", "International", "Business", "Finance & economics", "Science & technology", "Books & arts", "Graphic detail", "Obituary", "Essay", "By Invitation", "Schools brief", "The World If", "Open Future", "Prospero", "The Economist Explains"]
  const closeMenu = () => {
    triggerMenu(false)
  }

  const sectionsLi = sections.map((section, index) =>
    <Link href={`/${section}`} className="list-item">
      <a>
        <li onClick={closeMenu}>{section}</li>
      </a>
    </Link>)
  const [isMenuOpen, triggerMenu] = useState(false)

  const handleMenuClick = () => {
    triggerMenu(!isMenuOpen)
  }

  return <header className="header-wrapper">

    <div className="header-border">
      <div className="header">
        <div className="menu" onClick={handleMenuClick}>
          <FontAwesomeIcon icon={faBars}/>
          <div className="menu-text">Menu</div>
        </div>

        <div className="header-right">
          <div>My account</div>
          <FontAwesomeIcon icon={faChevronDown}/>
        </div>
      </div>
    </div>
    {isMenuOpen && <ul className="opened-menu">
      <li className="section-wrapper">
        <h2 className="section-header">Section</h2>
        <ul className="list-section">
          {sectionsLi}
        </ul>
      </li>
    </ul>}
  </header>
}
