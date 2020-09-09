import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../Store/actions/index';

class ContactData extends Component {
    state = {
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:6
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },               
            emai:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            delivery:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value:'fastest',
                validation:{},
                valid:true
            }
        },
        formIsValid:false
      }
      orderHandler=(e)=>{
            e.preventDefault();
            const formData={};
            for(let key in this.state.orderForm)
            {
                formData[key]=this.state.orderForm[key].value;
            }
            const order={
            ingredient:this.props.ings,
            price:this.props.price,
            orderData:formData
            }
            this.props.onOrderBurger(order);
      }
      checkValidity(value,rule){
          let isValid=true;
          if(rule.required)
          {
              isValid=value.trim()!==''&&isValid;
          }
          if(rule.minLength)
          {
              isValid=value.length >=rule.minLength&&isValid;
          }
          if(rule.maxLength)
          {
              isValid=value.length<=rule.maxLength&&isValid;
          }
          return isValid;
      }
      inputChangedHandler=(e,inputIdentifier)=>{
          const updatedOrderForm={
              ...this.state.orderForm
          }
          const updatedOrderFormElement={
              ...updatedOrderForm[inputIdentifier]
            }
            updatedOrderFormElement.value=e.target.value;
            updatedOrderFormElement.valid=this.checkValidity(updatedOrderFormElement.value,updatedOrderFormElement.validation);
            updatedOrderFormElement.touched=true;
            updatedOrderForm[inputIdentifier]=updatedOrderFormElement;

            let formIsValid=true;
            for(let inputIdentifier in updatedOrderForm)
            {
                formIsValid=updatedOrderForm[inputIdentifier].valid&&formIsValid;   
            }
            this.setState({orderForm:updatedOrderForm,formIsValid});
      }
    render() {
        const formElementsArray=[];
        for(let key in this.state.orderForm)
        {
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form=(
            <form onSubmit={this.orderHandler}>
             {formElementsArray.map(formElement=>(
                 <Input key={formElement.id}
                 elementType={formElement.config.elementType}
                 elementConfig={formElement.config.elementConfig}
                 value={formElement.config.value}
                 changed={(e)=>this.inputChangedHandler(e,formElement.id)}
                 valid={!formElement.config.valid}
                 shouldValidate={formElement.config.validation}
                 touched={formElement.config.touched}/>
             ))}
             <Button btnType='Success' disable={!this.state.formIsValid}>ORDER</Button>
           </form>
           );
        if(this.props.loading)
        {
            form=(<Spinner/>);
        }
        return (
            <div className={classes.ContactData}>
             <h4>Enter your contact data</h4>
             {form}
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading        
    }
};

const mapDispatchToProps=dipatch=>{
    return{
    onOrderBurger:(orderData)=>dipatch(actions.purchaseBurger(orderData)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));