export async function getServerSideProps(context) {
    // Check if the request has cookies
    const cookies = context.req.cookies;
    const myCookie = cookies['your_cookie_name'];

    if (myCookie) {
        console.log("Cookie exists:", myCookie);
    } else {
        console.log("Cookie does not exist");
    }

    return {
        props: {}, // you can pass additional props to your page component here
    };
}
