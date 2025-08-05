import got from 'got';

const getAccessToken = async (req, res) => {
    try {
        const { body } = await got.post(process.env.PAYPAL_BASE_URL + "/v1/oauth2/token", {
            form: {
                grant_type: 'client_credentials',
            },
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_CLIENT_SECRET,
            responseType: 'json'  // This will automatically parse the JSON
        });
        
        console.log("access token by paypal : ", body);
        
        return body.access_token
    } catch (err) {
        return res.json({
            success: false,
            message: 'Error fetching access token',
            error: err.message,
        });
    }
};

const createOrder = async (req, res) => {
    try {
        // Fix: getAccessToken returns a response, not just the token
        // We need to extract the token or modify the approach
        const tokenResponse = await getAccessToken(); // Use internal function
        // console.log("access token by paypal : ", tokenResponse);
        
        if (!tokenResponse) {
            return res.json({
                success: false,
                message: 'Failed to retrieve access token',
            });
        }

        const response = await got.post(process.env.PAYPAL_BASE_URL + '/v2/checkout/orders', {
            headers: {
                Authorization: `Bearer ${tokenResponse}`,
                'Content-Type': 'application/json',
            },
            json :{
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        items: [
                            {
                                name: 'Booking for prescription items',
                                description: 'Booking for prescription items',
                                unit_amount: {
                                    currency_code: 'USD',
                                    value: '10.00', // Example amount, replace with actual value
                                },
                                quantity: '1', // Example quantity, replace with actual value
                            }
                        ],
                        amount:{
                            currency_code: 'USD',
                            value: '10.00', // Example amount, replace with actual value
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: '10.00', // Example amount, replace with actual value
                                }
                            }
                        }
                    }
                ],
                paymentSource: {
                    paypal: {
                        experience_context: {
                            payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
                            payment_method_selected: 'PAYPAL',
                            brand_name: 'Prescripto',
                            shipping_preference: 'NO_SHIPPING',
                            locale: 'en_US',
                            user_action: 'PAY_NOW',
                            return_url: `${process.env.PAYPAL_BASE_URL}/complete-payment`,
                            cancel_url: `${process.env.PAYPAL_BASE_URL}/cancel-payment`,
                        },
                    },
                },
            },
            responseType: 'json' // This will automatically parse the JSON
        });

        console.log("Order created by paypal : ", response.body);
        const orderId = response.body.id;
        if (!orderId) {
            return res.json({
                success: false,
                message: 'Failed to create order',
            });
        }
        
        return res.json({
            success: true,
            message: 'Order created successfully',
            orderId: orderId,
        });
    } catch (err) {
        return res.json({
            success: false,
            message: 'Error creating order',
            error: err.message,
        });
    }
};

const capturePayment = async(req,res) => {
    try{
        const accessToken = await getAccessToken();
        const paymentId = req.params.paymentId;
        if (!accessToken) {
            return res.json({
                success: false,
                message: 'Failed to retrieve access token',
            });
        }

        const reponse = await got.post(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${paymentId}/capture`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            responseType: 'json' // This will automatically parse the JSON
        });

        const paymentData = reponse.body;
        console.log("Payment captured by paypal : ", paymentData);
        
        
    }
    catch(err){
        return res.json({
            success: false,
            message: 'Error capturing payment',
            error: err.message,
        });
    }
}

export {
    getAccessToken,
    createOrder,
    capturePayment
};