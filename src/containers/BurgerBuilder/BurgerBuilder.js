import React,{Component}from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../Store/actions';

class BurgerBuilder extends Component{
    state={
        purchasing:false,
        loading:false,
        error:false
    }
    componentDidMount(){
        // axios.get('https://react-my-burger-da62f.firebaseio.com/ingedients.json').then(res=>{
        //     this.setState({ingredients:res.data})
        // }).catch(e=>{this.setState({error:true})})
    }
    updatePurchasable(ingredients){
        const sum=Object.keys(ingredients).map(igKey=>ingredients[igKey]).reduce((sum,el)=>sum+el,0);
        return sum>0;
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
        this.props.history.push('/checkout');
    }
render(){
    const disabledInfo={
        ...this.props.ings
    };
    for(let key in disabledInfo)
    disabledInfo[key]=disabledInfo[key]<=0;

    let orderSummary=null;

    let burger=this.state.error?<p>Ingredients can't be loaded!
    </p>:<Spinner/>
    if(this.props.ings){
        burger=(
            <Aux>
             <Burger ingredients={this.props.ings}/>
             <BuildControls ingredientAdded={this.props.onIngredientAdded} 
             ingredientRemoved={this.props.onIngredientRemoved}
             disabled={disabledInfo}
             price={this.props.price}
             purchasable={this.updatePurchasable(this.props.ings)}
             ordered={this.purchaseHandler}/>
            </Aux>
            );
            orderSummary=<OrderSummary 
              price={this.props.price}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinue={this.purchaseContinueHandler}
              ingredients={this.props.ings}/>
    }
    if(this.state.loading){
        orderSummary=<Spinner/>
    }
    return(
        <Aux>
        <Modal show={this.state.purchasing} 
         modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
         {burger}
        </Aux>
    );
}
}

const mapStateToProps=state=>{
    return{
        ings:state.ingredients,
        price:state.totalPrice
    };
}

const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientRemoved:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName}),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));