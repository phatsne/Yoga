import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API } = studentEndpoints;

// Helper function to handle errors
const handleError = (error) => {
    console.error("Error: ", error);
    const errorMessage = error?.response?.data?.message || error.message || "An unexpected error occurred.";
    toast.error(errorMessage);
};

// Helper function to initiate payment
const initiatePayment = async (token, coursesId) => {
    try {
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            { coursesId },
            { Authorization: `Bearer ${token}` }
        );

        if (!orderResponse || !orderResponse.data) {
            throw new Error("Invalid API response. No data returned.");
        }
        
        const paymentUrl = orderResponse.data.message?.paymentUrl || orderResponse.data?.paymentUrl;
        
        if (!paymentUrl) {
            console.error("API response does not include paymentUrl:", JSON.stringify(orderResponse, null, 2));
            throw new Error("Could not generate VNPay payment URL.");
        }
        

        return paymentUrl;
    } catch (error) {
        handleError(error);
        throw error; // Rethrow error to be caught in the main function
    }
};

// ================ buyCourse ================
export async function buyCourse(token, coursesId, navigate, dispatch) {
    const toastId = toast.loading("Processing payment...");

    try {
        // Attempt to initiate the payment and get the URL
        const paymentUrl = await initiatePayment(token, coursesId);

        // Redirect to VNPay payment page
        window.location.href = paymentUrl;
    } catch (error) {
        toast.dismiss(toastId); // Dismiss loading toast on error
    } finally {
        toast.dismiss(toastId); // Ensure loading toast is dismissed
    }
}

// ================ verifyPayment ================
export async function verifyPayment(queryParams, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment...");

    // Set the loading state to true while verifying the payment
    dispatch(setPaymentLoading(true));

    try {
        // Verify the payment with backend
        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            queryParams,
            { Authorization: `Bearer ${token}` }
        );

        if (!response.data.success) {
            throw new Error(response.data.message || "Payment verification failed.");
        }

        // Successfully verified, notify the user
        toast.success("Payment successful, you are now enrolled in the course.");

        // Navigate to the enrolled courses page
        navigate("/dashboard/enrolled-courses");

        // Reset the cart
        dispatch(resetCart());
    } catch (error) {
        handleError(error); // Use the helper function to handle errors
    } finally {
        toast.dismiss(toastId); // Dismiss loading toast
        dispatch(setPaymentLoading(false)); // Reset loading state
    }
}
