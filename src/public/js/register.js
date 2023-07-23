const form = document.getElementById("registerForm");

form.addEventListener("submit", async(event) =>{
    event.preventDefault();
    const data = new FormData(form);
    //const first_name = document.getElementById("first_name").value
    //console.log(first_name)
    const obj = {};
     data.forEach((value,key) => (obj[key] = value));
    console.log(obj)
    body = JSON.stringify(obj);
    console.log(body)
     const response = await fetch("http://localhost:8080/api/sessions/register",{
       method: "POST",
         body: body,
         headers:{
             "Content-Type": "application/json",
         },
     });
     const responseData = await response.json();
     if (responseData.status === "success"){
         window.location.replace("/login")
     }
})
