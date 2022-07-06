const sayHelloWorld = () => {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            resolve(console.log("Hello World"));
        }, 1000);
    });
};

(async function executeSayHelloWorld() {
    await sayHelloWorld();
    console.log("Hey");
})();