
// fonction de connection au server 
async function loadConfig(){
    let result = await fetch("http://localhost:3000/api/teddies");
    return result.json();

}

