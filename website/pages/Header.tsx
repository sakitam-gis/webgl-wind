import '../assets/style/header.scss';
import * as React from 'react';

const github = require('../assets/images/github.png');

class Header extends React.Component {
  constructor (props: object, context: any) {
    super(props, context);
    this.state = {
      isMobel: false
    }
  }

  componentDidMount () {
  }

  handleDefEvent (event: Event) {
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }
  }

  openDocs () {
    window.open('./docs/index.html')
  }

  render () {
    return (
      <div className="header clearfix" onClick={(event: any) => this.handleDefEvent(event)}>
        {/* <div className="navbar-header">
          <a href="" className="navbar-brand">
            <img src={logo} alt="logo" className="navbar-logo" />
          </a>
        </div> */}
        <div className="navbar-collapse clearfix">
          {/* <ul className="nav navbar-nav navbar-left clearfix">
            <li id="nav-index">
              <a href="./">首页</a>
            </li>
            <li id="nav-doc" className="dropdown">
              <a href="./docs/" target="_blank" onClick={event => this.openDocs(event)}>文档</a>
            </li>
          </ul> */}
          <ul className="nav navbar-nav navbar-right">
            <li id="nav-github">
              <a href="https://github.com/sakitam-fdd/ol-deckgl" target="_blank">
                <img src={github} width="18" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header;
