

const form = document.getElementById("registerForm");

form.addEventListener("submit", async(event) =>{
    event.preventDefault();
    const data = new FormData(form);
    //const first_name = document.getElementById("first_name").value
    //console.log(first_name)
    const obj = {};
     data.forEach((value,key) => (obj[key] = value));
    console.log(obj)
    
    
     const response = await fetch("http://localhost:8080/api/sessions/register",{
       method: "POST",
         body: JSON.stringify(obj),
         headers:{
             "Content-Type": "application/json; charset=UTF-8",
         },
     }).then(res => {
		if (res.status !== 200) {
			alert(`Invalid credentials`);
		} else {
			alert(`Created`);
			window.location.replace("/login");
		};
	}).catch(err => {return `Catch error: ${err}`});
//      const responseData = await response.json();
//      console.log(responseData)
//      if (responseData.status === "success"){
//         console.log("llegue al if del register")
//          window.location.replace("/login")
//      }
 })
