import React, { Component } from 'react';
import request from 'superagent';

class Splash extends Component {
  constructor(args){
    super(args)
    this.state = {furni: 'Featured'}
  }

  _hanProClick(clickedType){
    let cli = clickedType
    request
      .get(cli)
      .then((serRes)=>{
        const serResJson = serRes.body
        console.log(serResJson)
        this.setState({
            furni: serResJson
        })
      })
  }


  render() {
    return (
      <section>
      <div className={`${this.state.furni}-img`}>
        {/*<img src={logoImg} Alt="">*/}

        <p className="titulo2">Mallory Furniture</p>
        <h2>Your Furniture is Old</h2>
        <h2>Ours is Older</h2>
      </div>
      <div className="midbody">

       <h2 className="titulo">{this.state.furni} Products</h2>
       <p className="titulo1">Check out some of our favorite listings</p>
       </div>
      </section>
    );
  }
}

export default Splash
