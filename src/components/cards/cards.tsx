import React from 'react';
import * as data from './cards.json';

const cardsString = JSON.stringify(data);
const cards = JSON.parse(cardsString).cards;

type Card = {
    title: string;
    description: string;
    link: string;
};

const Cards: React.FunctionComponent<{}> = () => {
    return (
        <div className="row">
            {cards.map((card: Card) => {
                return (
                    <div className="column">
                        <div className="card">
                            <h3>{ card?.title }</h3>
                            <p>{card?.description}</p>
                            <p>
                                <a href={card?.link} target='_blank'>Learn More</a>
                            </p>
                        </div>
                    </div>
                )
            })}
        </div> 
    )
}

export default Cards;
