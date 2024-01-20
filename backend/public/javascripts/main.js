// JavaScript to handle form submission
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const batchId = document.getElementById('batchId').value;
    const price = parseInt(document.getElementById('price').value);
    const stockNumber = parseInt(document.getElementById('stockNumber').value);

    const data = { productName, batchId, price, stockNumber };

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Submission successful!');
            // Handle success, e.g., show a success message to the user
        } else {
            console.error('Submission failed.');
            // Handle error, e.g., show an error message to the user
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
