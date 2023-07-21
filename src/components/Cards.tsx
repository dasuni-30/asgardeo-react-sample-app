import React from 'react';

type Card = {
    title: string;
    description: string;
    link: string;
};

const cards: {
    title: string;
    description: string;
    link: string;
}[]= [
        {
            'title': 'User Guide',
            'description': 'Check out our user guide and we will guide you to integrate your applications with Asgardeo.',
            'link': 'https://docs.google.com/document/d/1-yKHQgQE3-Pj5FRoBdOLf33u1Y41QWzNd3jdR6TVhIQ/edit#heading=h.mvq9fx4kf8ex'
        },
        {
            'title': 'Github Repository',
            'description': 'Lets go through the application codebase and contribute to our Asgardeo React Sample application.',
            'link': 'https://github.com/dasuni-30/asgardeo-react-sample-app'
        },
        {
            'title': 'Asgardeo Docs',
            'description': 'Read our Docs for the guides to provide the instructions for building IAM uses cases.',
            'link': 'https://wso2.com/asgardeo/docs/'
        }
    ];

/**
 * Card component.
 */
const Cards: React.FunctionComponent<{}> = () => {
    return (
        <div className='row'>
            {cards.map((card: Card) => {
                return (
                    <div className='column'>
                        <div className='card'>
                            <h3>{ card?.title }</h3>
                            <p className='p-description'>{card?.description}</p>
                            <p className='p-description'>
                                <a href={card?.link} target='_blank' rel="noreferrer">Learn More</a>
                            </p>
                        </div>
                    </div>
                )
            })}
        </div> 
    )
}

export default Cards;
