import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name:'',
        emai:'',
        address:{
            street:'',
            postalcode:'',
        },
        loading:false
      }
      orderHandler=(e)=>{
            e.preventDefault();
            this.setState({loading:true});
            const order={
            ingredient:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:'saurav',
                address:{
                    street:'teststreet',
                    zipcode:456789,
                    country:'India'
                },
                emai:'test@gmail.com',
            },
            delivery:'fastest'
        }
            axios.post('/orders.json',order)
            .then(res=>{
            this.setState({loading:false});
            this.props.history.push('/');
            })
            .catch(e=>{
            this.setState({loading:false});
            });
      }
    render() {
        let form=(
            <form>
             <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
             <input className={classes.Input} type='email' name='mail' placeholder='Your Email'/>
             <input className={classes.Input} type='text' name='street' placeholder='Street'/>
             <input className={classes.Input} type='number' name='postalcode' placeholder='e.g 788106'
             />
             <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
           </form>
           );
        if(this.state.loading)
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

export default ContactData;