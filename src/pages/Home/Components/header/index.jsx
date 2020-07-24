import React from "react";
import "../../styles.css";

//Componente de Header
class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        <button onClick={this.props.createPost}>{this.props.btnText}</button>
      </header>
    );
  }
}

export default Header;
