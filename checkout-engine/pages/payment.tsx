import React from "react";
import { 
    loadStripe,
    paymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (!stripe) {
            return;
        }
        
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        
        if (!clientSecret) {
            return;
        }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe!.createPaymentMethod({
            type: "card",
            card: elements!.getElement(CardElement)!
        });

        if (!error) {
            console.log(paymentMethod);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
        </form>
    )
}
