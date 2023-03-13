function submit()
{
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
	  "username": $("#username").val(),
	  "password": $("#pass").val()
	});

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	  redirect: 'follow'
	};

	fetch("https://localhost:44357/v1/login", requestOptions)
	  .then(response => response.text())
	  .then(result => {
		  $("#errorMsg").text("");
		  var obj =  (result);
		  var error = JSON.parse(result);
		  if(error.message != null){
			  $("#errorMsg").text(error.message);
			  return;
		  }
		  console.log(obj);
		  localStorage.setItem('user',obj);
		  location.href = "products.html";
	  })
	  .catch(error => console.log('error', error));	
}

$( window ).load(function() {

	if(isUserLogged())
	{
		window.location = "products.html";
	}
});
	