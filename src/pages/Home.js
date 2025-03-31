import React from 'react';
import logo from '../assets/logo.png';
import Drink from '../components/Drink';
import arrow from '../assets/chevron-down-2.png';
import PopularList from '../components/PopularList';
import Random from '../components/RandomDrink.js';
import '../styles/Home.css';
import { useEffect, useState, useMemo } from 'react';
import GetIngredients from '../helpers/GetIngredients.js';

function Home() {
    return (
        <div className='home'>
            <Header />
            <AprilsFool />
            <PopularSection />
            <OurPicks />
            <RandomDrink />
        </div>
    );
}

function Header() {
    return (
        <div className='main'>
            <img src={logo} className='logo' alt='Logo' />
            <img src={arrow} className='arrow' alt='Arrow' />
        </div>
    );
}

function AprilsFool() {
    const myDrink = {
        idDrink: "99999", 
        strDrink: "Denatured Cocktail", 
        strDrinkThumb: "https://i.ibb.co/jPLSM7rH/Projekt-bez-nazwy.png", 
        strInstructions: "Pour 150ml denatured alcohol into a glass, add 50ml lime juice and garnish with mint leaves.",
        ingredients: ["Denatured Alcohol", "Solvent", "Mint leaves"], 
    };

    return (
        <div className='popular'>
            <h2>Our Bestseller!</h2>
            <div className='content'>
                <Drink
                    id={myDrink.idDrink}
                    image={myDrink.strDrinkThumb}
                    name={myDrink.strDrink}
                    ingredients={myDrink.ingredients.join(", ")} 
                />
            </div>
        </div>
    );
}

function PopularSection() {
    return (
        <div className='popular'>
            <h2>You must try these!</h2>
            <div className='content'>
                <PopularList />
            </div>
        </div>
    );
}

function RandomDrink() {
    return (
        <div className='random'>
            <h2>Can't decide?</h2>
            <div className='RandDrink'>
                <Random />
            </div>
        </div>
    );
}


const OurPicks = () => {
    const picks = useMemo(() => [
        { name: "Oliwia", drinkName: "aperol spritz", explain: ' "I love Aperol Spritz for its refreshing, bittersweet flavor." ' },
        { name: "Kacper", drinkName: "tom collins", explain: ' "I enjoy Tom Collins for its zesty, citrusy refreshment." ' },
        { name: "Pola", drinkName: "mojito", explain: ' "I like mojitos for their refreshing blend of mint and lime." ' }
    ], []);

    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        const fetchDrinks = async () => {
            const fetchedDrinks = [];
            for (const pick of picks) {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${pick.drinkName}`);
                const data = await response.json();
                if (data.drinks) {
                    fetchedDrinks.push({ ...pick, drinkData: data.drinks[0] });
                }
            }
            setDrinks(fetchedDrinks);
        };

        fetchDrinks();
    }, [picks]);

    return (
        <div className='OurPicks'>
            <h2>OUR FAVOURITES</h2>
            <div className='content'>
                <div className='drinksList'>
                    {drinks.map((item, index) => (
                        <div key={index} className="pick">
                            <h4>{item.name}'s Pick</h4>
                            <Drink
                                key={item.drinkData.idDrink}
                                id={item.drinkData.idDrink}
                                image={item.drinkData.strDrinkThumb}
                                name={item.drinkData.strDrink}
                                ingredients={GetIngredients(item.drinkData)}
                            />
                            <h5>{item.explain}</h5>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;