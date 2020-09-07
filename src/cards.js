import React, { Component } from "react";
import Card from "./card";
import axios from 'axios';

class Cards extends Component {

  state = {
    warriors: [],
    next:'',
    count:0,
  };
  prev = 1;
  numberOfCharacters=9;

  async componentDidMount() {
    await this.getWarriors();
  }

  getWarriors = async () => {
    const res = await axios.get("https://swapi.dev/api/people/");
    console.log(res);
    this.setState({ warriors: res.data.results, next: res.data.next, prev: res.data.previous,count:res.data.count });
  };

  getNextData = async () => {
    this.numberOfCharacters += 9;
    this.prev++;
    if(this.state.next){
      const res = await axios.get(this.state.next);
      console.log(res);
      console.log(res.data.results);
      this.setState({ warriors: res.data.results,next: res.data.next})
    }
  }

  getPreviousData = async () => {
    try {
        const res = await axios.get(`http://swapi.dev/api/people/?page=${this.prev}`);
        this.prev--;
        if(this.prev >0){
          this.numberOfCharacters -= 9;
        }
        console.log(res);
        console.log(res.data.results);
        this.setState({warriors: res.data.results,next: res.data.next})
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <p className="text-center mt-4">{this.numberOfCharacters} characters of {this.state.count}</p>
        <div className="container">
          <div className="row mt-4">
            {this.state.warriors && this.state.warriors.pop() && this.state.warriors.map((data) => (
              <Card key={data.name} cardsData={data} />
            ))}
          </div>
          <div className="d-flex justify-content-center mb-5 mt-3 ">
            <button className="mr-5 btn btn-secondary" disabled={this.prev<1} onClick={() =>this.getPreviousData()}>{'<<'}prev</button>
            <button className="ml-5 btn btn-secondary" disabled={this.state.next===null} onClick={() => this.getNextData()}>next{'>>'}</button>
          </div>
        </div>

      </div>
    );

  }
};

export default Cards;