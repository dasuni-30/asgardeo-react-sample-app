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
            'title': 'Add a Connection',
            'description': 'Enable your application users to log in using a standard-based identity provider.',
            'link': 'https://wso2.com/asgardeo/docs/guides/authentication/#manage-connections'
        },
        {
            'title': 'Enable Multifactor Authentication',
            'description': 'Add strong authentication to your application by enabling multiple authentication factors.',
            'link': 'https://wso2.com/asgardeo/docs/guides/authentication/mfa/'
        },
        {
            'title': 'Guides',
            'description': 'The guides provide the instructions for building IAM uses cases.',
            'link': 'https://wso2.com/asgardeo/docs/guides/'
        }
    ];

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
