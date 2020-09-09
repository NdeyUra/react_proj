import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess=(id,orderData)=>{
    return({
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData
    })
}

export const purchaseBurgerFail=(error)=>{
    return({
        error
    })
}

export const purchaseBurgerStart=()=>{
    return({
        type:actionTypes.PURCHASE_BURGER_START
    })
}

export const purchaseBurger=(orderData)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json',orderData)
            .then(res=>{
                console.log(res.data);
            dispatch(purchaseBurgerSuccess(res.data,orderData));
            })
            .catch(e=>{
            dispatch(purchaseBurgerFail(e));
            });
    }
}

export const purchaseInit=()=>{
    return({
        type:actionTypes.PURCHASE_INIT,        
    })
}

export const fetchOrderSuccess=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders
    }
}

export const fetchOrderFail=(error)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAIL,
        error
    }
}

export const fetchOrderStart=()=>{
    return{
        type:actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrder=()=>{
    return dispatch=>{
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
         .then(res=>{
             const fetchOrders=[];
             for(let key in res.data){
                 fetchOrders.push({
                     ...res.data[key],
                     id:key
                    })
                }
            dispatch(fetchOrderSuccess(fetchOrders));
         })
         .catch(error=>{
            dispatch(fetchOrderFail(error));
         });
    }
}