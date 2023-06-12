import React from 'react';
import styles from './Nav.module.css';
import * as data from './cards.json';
import ASGARDEO_LOGO from "../../images/asgardeo-logo-transparent.png";
const cardsString = JSON.stringify(data);
const cards = JSON.parse(cardsString).cards;

type Card = {
    title: string;
    description: string;
    link: string;
};

const Cards: React.FC<{}> = () => {
    return (
        <div className="row">
        
        {cards.map((card:  Card) => {
            return (
                <div className="column">
                <div className="card">
                <h3>{ card.title }</h3>
                <p>{card.description}</p>
                <p><a href={card.link}>Learn More</a></p>
              </div>
              </div>
            )
        })}
        </div>
      
        
    )
}

export default Cards;