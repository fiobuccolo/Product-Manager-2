const form = document.getElementById("registerForm");

form.addEventListener("submit", async(event) =>{
    event.preventDefault();
    const data = new FormData(form);
   
    //const first_name = document.getElementById("first_name").value
    //console.log(first_name)
  const obj = {};
     data.forEach((value,key)=>(obj[key]=value));
    console.log(obj)
     const response = await fetch("/api/sessions/register", {
       method: "POST",
         body: JSON.stringify(obj),
         headers:{
             "Content-Type": "application/json",
         },
     });
     const responseData = await response.json();
     if (responseData.status === "success"){
         window.location.replace("/login")
     }
})