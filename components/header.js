import {faBars} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import Link from "next/link";

import Button from "./button/button";
import {useUser} from "../lib/hooks";

const sections = ["Leaders", "Letters", "Briefing", "United States", "The Americas", "Asia", "China", "Middle East & Africa", "Europe", "Britain", "International", "Business", "Finance & economics", "Science & technology", "Books & arts", "Graphic detail", "Obituary", "Essay", "By Invitation", "Schools brief", "The World If", "Open Future", "Prospero", "The Economist explains"]

export default function Header() {
  const user = useUser()

  const closeMenu = () => {
    triggerMenu(false)
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location = "/"
  };

  const sectionsLi = sections.map((section, index) =>
    <Link key={index} href={`/${section}/page/1`}>
      <a >
        <li onClick={closeMenu} className="list-item">{section}</li>
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


        {!user &&
        <div style={{display: " flex", alignItems: "center"}}>
          <Link href="/login" >
            <a style={{marginRight: '1rem'}}>
              <Button>Login Page</Button>
            </a>
          </Link>
          <Link href="/signup">
            <a>
              <Button>Signup Page</Button>
            </a>
          </Link>
        </div>
        }

        {user && <div style={{display: " flex", alignItems: "center"}}>
          <div>{user.user.email}</div>
          <Button onClick={handleLogout}>Sign out</Button>
        </div>}

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
