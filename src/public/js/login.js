const form= document.getElementById("loginForm");

form.addEventListener("submit", async(event) =>{
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>(obk[key]=value));
    const response = await fetch("/api/sessions/register", {
        method: "POST",
        body: JSON.stringify(obj),
        headers:{
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    console.log(responseData)
    //if (responseData.status === "success"){   
    //}
})