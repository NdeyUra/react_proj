import React from 'react';
import classes from './Burger.module.css';

import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger=(props)=>{
    let trnsformedIngredients=Object.keys(props.ingredients).map(igKey=>{
        return[...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredients key={igKey+i} type={igKey}/>
        });
    }).reduce((arr,el)=>{return arr.concat(el)},[]);
    if(trnsformedIngredients.length===0){
        trnsformedIngredients=<p>Please start adding ingredients!</p>
    }
    return(
        <div className={classes.Burger}>
        <BurgerIngredients type='bread-top'/>
        {trnsformedIngredients}
        <BurgerIngredients type='bread-bottom'/>
        </div>
    );
}
export default burger;