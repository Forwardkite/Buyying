import { load } from '@cashfreepayments/cashfree-js';

// Define an async function to initialize and load cashfree
export const initializeCashfree = async () => {
    try {
        const cashfree = await load({
            mode: "sandbox" // or production
        });
        return cashfree;
    } catch (error) {
        console.error("Error initializing Cashfree:", error);
        throw error; // Rethrow the error to handle it elsewhere if necessary
    }
};

// You can now call initializeCashfree() wherever you need to initialize Cashfree
