function isUserLogged()
{
		const user = localStorage.getItem('user');
		return user != null;
}

function isUserAdmin()
{
	var user = JSON.parse(localStorage.getItem('user'));
	  if(isUserLogged() == true){

		  return (user.user.role == "admin");
	  }
		  
	
	return false;
}

function isUserCustomer()
{
	var user = JSON.parse(localStorage.getItem('user'));
	  if(isUserLogged() == true){
		  return (user.user.role == "customer");
	  }
		  
	
	return false;	
}

function getToken()
{
	if(isUserLogged() == true)
	{
		var user = JSON.parse(localStorage.getItem('user'));
		return user.token;
	}
	
	return "";
}

$("#logoff_b").click(()=>{
		localStorage.removeItem('user');
		window.location.reload();
		//updateLogin();
});
