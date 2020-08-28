import React,{Component} from 'react';
import Aux from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
 //this can be a stateless component
    render(){
        const ingredientsSummary=Object.keys(this.props.ingredients).map(igKey=>{
            return (
                <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span>:
                 {this.props.ingredients[igKey]}
                </li>
            );
        });
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
             {ingredientsSummary}
            </ul>
            <p>Continue to checkout?</p>
            <p><strong>Total Price:&#8377; {this.props.price.toFixed(2)}</strong></p>
            <Button btnType='Danger' 
            clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' 
            clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Aux>
        );
    }
}

export default OrderSummary;