function swDev(){
    let swURL = `${process.env.PUBLIC_URL}/serviceWorker.js` 
    navigator.serviceWorker.register(swURL).then((response) =>{
        console.warn("response", response)
    })
}
export default swDev