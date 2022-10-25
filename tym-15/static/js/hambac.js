function hambacMenu() 
{

		var x = document.getElementById("polozkyPhone");
		var y = document.getElementById("logoo");
		var z = document.getElementById("show");

		if (x.style.display === "flex") //když je hamburger zavřený
		{
			x.style.display = "none";
			y.style.display = "flex"; //logo
			z.classList.add('fa-bars');
			z.classList.remove('fa-xmark');


		} 
		else 
		{
			x.style.display = "flex";  //když je hamburger otevřený 
			y.style.display = "none"; //logo
			z.classList.remove('fa-bars');
			z.classList.add('fa-xmark');

		}

		document.getElementsByTagName("a")[0].onclick = function()
		{
			x.style.display = "none";
			y.style.display = "flex"; //logo
			z.classList.add('fa-bars');
			z.classList.remove('fa-xmark');
		}

		document.getElementsByTagName("a")[1].onclick = function()
		{
			x.style.display = "none";
			y.style.display = "flex"; //logo
			z.classList.add('fa-bars');
			z.classList.remove('fa-xmark');
		}

		document.getElementsByTagName("a")[2].onclick = function()
		{
			x.style.display = "none";
			y.style.display = "flex"; //logo
			z.classList.add('fa-bars');
			z.classList.remove('fa-xmark');
		}

		document.getElementsByTagName("a")[3].onclick = function()
		{
			x.style.display = "none";
			y.style.display = "flex"; //logo
			z.classList.add('fa-bars');
			z.classList.remove('fa-xmark');
		}

		document.getElementsByTagName("a")[4].onclick = function()
		{
			x.style.display = "none";
			y.style.display = "flex"; //logo
			z.classList.add('fa-bars');
			z.classList.remove('fa-xmark');
		}
}

/* hodnota a typ se rovná === */