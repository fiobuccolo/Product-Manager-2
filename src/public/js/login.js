const form = document.getElementById("loginForm");

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
     const response = await fetch("http://localhost:8080/api/sessions/login",{
       method: "POST",
         body: JSON.stringify(obj),
         headers:{
             "Content-Type": "application/json; charset=UTF-8",
         },
     }).then(res => {
     
      if (res.status !== 200) {
        alert(`Invalid credentials`);
      } else {
       
        alert(`Loged`);
        window.location.replace("/");
      };
    }).catch(err => {return `Catch error: ${err}`});
    //  const responseData = await response.json();
    //  if (responseData.status === "success"){
    //    console.log("llegue al if del register")
    //    window.location.replace("/login")
    // }
})
