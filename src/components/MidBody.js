import React, { Component } from 'react';
import request from 'superagent';
import ProductId from './ProductId';
import { headers } from '../data/datasource.js';
import { Link } from 'react-router-dom';
import logoImg from '../images/mf-logo-black.svg'
import Footer from './Footer';
//import Splash from './Splash';

class MidBody extends Component {
  constructor(args){
    super(args)
    this.state = {
      furniList: [],
      visibleFurniture : 'Sale',
      colSale : 'red',
      colAll : 'gri',
      titu: ''
    }
  }

  _fetchFurniData(componentProps){
    let apiReqUrl='https://mallory-furniture-admin.now.sh/api/v1/products'
    let genderInRoute = componentProps.match.params.ProId

    if(typeof genderInRoute !== 'undefined'){
      const genObj = {
        S: 'seating',
        T: 'tables',
        D: 'desks',
        St: 'storage',
        B: 'bedroom',
        M: 'miscellaneous'
      }
      apiReqUrl = `https://mallory-furniture-admin.now.sh/api/v1/products?category=${genObj[genderInRoute]}`
      let titulo = `${genObj[genderInRoute]}`
      let titImg = titulo.charAt(0).toUpperCase() + titulo.slice(1)
      this.setState({titu: titImg})
    }

    request
      .get(apiReqUrl)
      .then((serRes)=>{
        const serResJson = serRes.body
        //console.log(serResJson)
        this.setState({
          furniList : serResJson
        })
      })
   }

   componentWillMount(){
    this._fetchFurniData(this.props)
   }
   componentWillReceiveProps(newProps){
    this._fetchFurniData(newProps)
   }

   _renFeatCards(furniDataList){
     let visiPro = this.state.visibleFurniture;
     // visiPro = this.props.;
     //console.log(visiPro);
     let filFeatList = this.state.furniList.filter(function(cardObj){
       if(cardObj.category === "seating"){
         if(visiPro === 'All'){
           return true
         }
         if(cardObj.onSale === true){
           return true
         }
       }else if(cardObj.category === "tables"){
         if(visiPro === 'All'){
           return true
         }
         if(cardObj.onSale === true){
           return true
         }
       }else if(cardObj.category === "desks"){
         if(visiPro === 'All'){
           return true
         }
         if(cardObj.onSale === true){
           return true
         }
       }else if(cardObj.category === "storage"){
         if(visiPro === 'All'){
           return true
         }
         if(cardObj.onSale === true){
           return true
         }
       }else if(cardObj.category === "bedroom"){
         if(visiPro === 'All'){
           return true
         }
         if(cardObj.onSale === true){
           return true
         }
       }else if(cardObj.category === "miscellaneous"){
         if(visiPro === 'All'){
           return true
         }
         if(cardObj.onSale === true){
           return true
         }
       }else {
         return false
       }
     })
      let featCompList = filFeatList.map((cardObj, i)=>{
        return <ProductId
           imgUrl={cardObj.imageLink}
           name={cardObj.item}
           price={cardObj.price}
           cat={cardObj.category}
           id={cardObj._id}
           key={i}
           />
      })
    return featCompList
   }

   _hanProClick(clickedVal){
     this.setState({
       visibleFurniture : clickedVal
     })
     let visiPro = this.state.visibleFurniture;
     let colA = 'gri';
     let colS = 'red';
     if(visiPro === 'Sale'){
       this.setState ({colAll : colS})
       this.setState ({colSale : colA})
     }else {
       this.setState ({colAll : colA})
       this.setState ({colSale : colS})
     }
   }

   render(){

     return (
       <section>
         <div className={`${this.state.titu}-img`}>
           <p className="titulo2">Mallory Furniture</p>
           <h2>Your Furniture is Old</h2>
           <h2>Ours is Older</h2>
         </div>
         <div className="midbody">
           <h2 className="titulo">{this.state.titu} Products</h2>
           <p className="titulo1">Check out some of our favorite listings</p>
         </div>
         <div className="item2">
           <p>
            <span data-ptype="All" onClick={ ()=>{ this._hanProClick('All')}}><Link className={`headers-list__${this.state.colAll}`} to="#">All Items</Link></span>
            <span data-ptype="onSale" onClick={ ()=>{ this._hanProClick('Sale')}}><Link className={`headers-list__${this.state.colSale}`} to="#">On Sale</Link></span>
           </p>
           <p><span className="item-num">{this._renFeatCards(this.state.furniList).length}</span>  Items Showing</p>
         </div>
         <div className="forniList">
          {this._renFeatCards(this.state.furniList)}
        </div>
        <div className="downbody">
          <img src={logoImg} alt=""/>
        </div>
        <Footer footer = {headers}/>
      </section>
     );
   }

  }

  export default MidBody;
