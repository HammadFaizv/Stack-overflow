import * as api from '../api'

export const handlePayment = (id, amount) => async (dispatch) => {
    try{    
        const { data: {order} } = await api.order(amount);
        // console.log(data);
        const options = {
                key:'rzp_test_IzePxibyhpfvQz',
                amount: order.amount,
                currency: "INR",
                name: "StackOverflow Plan",
                description: "Tutorial of RazorPay",
                image: "https://w7.pngwing.com/pngs/784/593/png-transparent-answer-coding-hexagon-media-networking-social-stackoverflow-hexagon-social-medias-icon-thumbnail.png",
                order_id: order.id,
                handler: async function (response){
                    console.log("Response",response);
                    const result = await api.verifyOrder({id, amount, response});
                    console.log(result);
                    if(result.data.success === true){
                        alert("New Subscription Plan is activated. Please login again to see the affects.");
                    } else {
                        alert("The Plan has failed to activate!!! Contact us later.")
                    }
                },
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9205076156"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();
    } catch (err){
        console.log(err);
    }
}

export const checkSubscription = (id) => async (dispatch) => {
    try {
        const { data } = await api.checkSubs(id);
        console.log(data);
        if(data.subs === 'free'){
            dispatch({ type: "UPDATE_CURRENT_USER", payload: data.newUser })
            alert("Your monthly subscription has ended!!!");
        }
    } catch (err) {
        console.log(err);
    }
}