import {faBars, faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useState} from 'react'

export default function Header() {
  const sections = ["The world this week", "Leaders", "Letters", "Briefing", "United States", "The Americas", "Asia", "China", "Middle East & Africa", "Europe", "Britain", "International", "Business", "Finance & economics", "Science & technology", "Books & arts", "Graphic detail", "Obituary", "Special reports", "Technology Quarterly", "Essay", "By Invitation", "Schools brief", "The World If", "Open Future", "Prospero", "The Economist Explains"]
  const sectionsLi = sections.map((section, index) => <li key={index} className="list-item">{section}</li>)
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
