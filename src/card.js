import React, { Component } from "react";
import axios from 'axios';

class Card extends Component {
  arr = [];
  avail = 'none';
  state = {
    name: '',
    starship: [],
  }
  componentDidMount() {
    this.homeWorld();
    this.starship();
  }

  homeWorld = async () => {
    try {
      const res = await axios.get(this.props.cardsData.homeworld);
      this.setState({ name: res.data.name });
    } catch (err) {
      console.log(err);
    }
  }

  starship = () => {
    this.props.cardsData.starships.map(async data => {
      const res = await axios.get(data);
      this.setState({ starship: res.data.name })
      this.arr.push(res.data.name);
    })
  }
  render() {
    const { name } = this.props.cardsData;
    return (
      <div className="mt-3 cardData  col-md-4">
          <div className="card ">
            <p className="p-1 warriorName">{name}</p>
            <p className="warriorFeature">HomeWorld:{this.state.name}</p>
            <p className="warriorFeature">Starships:{this.arr.map(ships => {
              if(ships) return ships;
              else if(this.state.starship.length<1) return 'None';
            }
            )}</p>
            <p className="warriorFeature">Films:{this.props.cardsData.films.length}</p>
          </div>
      </div>
    );

  }

};

export default Card;
