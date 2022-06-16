"use strict";

const URL_RICK = `https://rickandmortyapi.com/api/character/?page=`;
const URL_RICK_PAGES = `https://rickandmortyapi.com/api/character/`;

let paginas = getRickPages(URL_RICK_PAGES);
let paginaCargada = 1;

//& Funcion que devuelve cuantas paginas tiene en total
async function getRickPages(urlApi){
	try {
		let response = await fetch(urlApi);
		let datos = await response.json();
		return datos.info.pages;
	} catch (error) {
		console.log(error)
	}
}

//& devuelve array con 20 personajes 
async function getRick(urlApi,page){
	let response = await fetch(urlApi+page);
	let datos = await response.json();
	return datos.results	
};

//& devuelve una tarjeta rellena con los datos
function pintaTarjeta(res,index){
	return `<article class="card" id="card"> 
				<div class="cardFront">
					<div class="card-body">
						<img src="${res[index].image}" alt="" class="card-body-img">
						<h1 class="card-body-title">
							${res[index].name}
						</h1>
						<p class="card-body-text">${res[index].species}</p>
					</div>
			
					<div class="card-footer">
						<div class="card-footer-social">
							<h3>${res[index].origin.name}</h3>
							<p>Origin</p>
						</div>
		
						<div class="card-footer-social">
							<h3>${res[index].status}</h3>
							<p>Status</p>
						</div>
		
						<div class="card-footer-social">
							<h3>${res[index].gender}</h3>
							<p>Gender</p>
						</div>
					</div>
				</div>
				<div class="cardBack">
				${res[index].url}
				</div>
			</article>`	
}

getRick(URL_RICK,1).then((res) =>{																//* Cuando recibe la promesa resuelta
	console.log(res);
	let titulo = document.querySelector(".flex");
	for (let index = 0; index < res.length; index++) {
		if (index === 0) {
			titulo.innerHTML = pintaTarjeta(res,index);
		} else {			
			titulo.innerHTML +=  pintaTarjeta(res,index);
	}
	}
	
});	

window.addEventListener('scroll', () => {														//* Cuando baja el scroll	
    if (window.scrollY >= (document.documentElement.scrollHeight - window.innerHeight)-200) {
		paginaCargada++
		getRick(URL_RICK,paginaCargada).then((res) =>{
			let titulo = document.querySelector(".flex");	
			for (let index = 0; index < res.length; index++) {
				titulo.innerHTML +=  pintaTarjeta(res,index);
			}
		});	
	}
});




