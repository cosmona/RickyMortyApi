"use strict";

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
	console.log('res', res)
	let episodios;
	let pizarra = `<article class="card" id="card${res[index].id}"> 
						<section class="imagenTitulo">
							<img src="${res[index].image}" alt="" class="card-body-img">
							<h1>${res[index].name}</h1>
						</section>			
						<section class="datosTarjeta">
							<div class="card-footer">
								<h3>Specie</h3>
								<p>${res[index].species}</p>
								
								<h3>Origin</h3>
								<p>${res[index].origin.name}</p>
								
								<h3>Status</h3>
								<p>${res[index].status}</p>
								
								<h3>Gender</h3>
								<p>${res[index].gender}</p>
							</div>	
							<section class="episodesCard">
							<h3>Episodes</h3>
							<div class="episodes">
								`;

	episodios = res[index].episode.map((e)=> e);	
	console.log('episodios', episodios)
	episodios.forEach((e)=>{
		pizarra += `<p>${e}</p>`;
	});

	pizarra += `</div>	
	</section>			
	</section>			
	</article>`;				
					
	//* pinta una tarjeta del array res en la posicion index
	return pizarra;
};

//& funcion principal, la que pincha y corta
async function main(){
	const URL_RICK = `https://rickandmortyapi.com/api/character/?page=`;
	const URL_RICK_PAGES = `https://rickandmortyapi.com/api/character/`;
	const TITULO = document.querySelector(".flex");
	
	const PAGINAS = await getRickPages(URL_RICK_PAGES);
	
	let paginaCargada = 1;
	let res = await getRick(URL_RICK,1)
	let scrollY;
	
	//^ Handle funcion cuando se hace click en una tarjeta
	let handleFuction = function () {
		let pescador = document.querySelector(`.datosTarjeta`);
		
		//* Si ya esta abierto lo cierra
		if (this.classList.contains('Abre')) {
			this.removeAttribute( 'style');
			this.classList.remove('Abre');
			pescador.classList.remove("aparece")
			//* hace scroll automatico hacia donde estaba la tarjeta
			window.scrollTo({top: scrollY, behavior: 'smooth'});
		} else { //* se quiere abrir 
			
			//* posicion actual del scroll
			scrollY = window.scrollY;

			//* recorre todas las .cards y les borra la clase Abre y el style
			TARJETA.forEach((tarjeta) => {
				tarjeta.classList.remove('Abre');
				tarjeta.removeAttribute('style');
			});
			
			//* se guarda la posicion actual de la tarjeta clickada
			var startTop = this.offsetTop;
			var startLeft = this.offsetLeft;

			//* le añade la clase Abre pone la posicion absolute y la posiciona donde estaba
			this.classList.add('Abre');
			this.style.position = 'absolute';
			this.style.left = `${startLeft}px`;
			this.style.top = `${startTop}px`;

			
			//* sube el scroll arriba con la tarjeta abierta
			setTimeout(() => {
				window.scrollTo({top: 0, behavior: 'smooth'});
			}, 1100);	
			setTimeout(() => {
				//* pescando .imagenTitulo de la tarjeta clickada
				let pescador2 = document.querySelector(`.Abre .datosTarjeta`);
			   	pescador2.classList.add("aparece");
				   this.style.left = `0px`;
				   this.style.top = `0px`;
			}, 2000);
		};
	};

	//* pinta los primeros 20 personajes
	for (let index = 0; index < res.length; index++) {
		if (index === 0) {
			TITULO.innerHTML = pintaTarjeta(res,index);
		} else {			
			TITULO.innerHTML +=  pintaTarjeta(res,index);
		}
	}

	//* añade un escuchador (handleFuction) click por cada tarjeta
	let TARJETA = document.querySelectorAll(".card")
	TARJETA.forEach((tarjeta) => {
		 tarjeta.addEventListener("click",handleFuction);
	  });
	
	//* Cuando baja el scroll genera 20 tarjetas mas
	window.addEventListener('scroll', async () => {	

		//* si hay alguna tarjeta abierta no genera mas al bajar
		let abierto = document.querySelectorAll(".Abre").length;
		if (!abierto >0 ){

			//* si el scroll llega al final de la pagina comprueba si hay mas de la api
			if (window.scrollY >= (document.documentElement.scrollHeight - window.innerHeight)-200) {
				paginaCargada++
				if (paginaCargada <= PAGINAS) {
					res = await getRick(URL_RICK,paginaCargada);
					for (let index = 0; index < res.length; index++) {
						TITULO.innerHTML +=  pintaTarjeta(res,index);
					}
				}
			}

			//* añade un escuchador (handleFuction) click por cada tarjeta
			TARJETA = document.querySelectorAll(".card")
			TARJETA.forEach((tarjeta) => {
				tarjeta.addEventListener("click",handleFuction);
			});	
		}
	}); 
}
	
//!========================================================================================!//
//!                                                                                        !//
//!                                    SCOPE PRINCIPAL                                     !//
//!                                                                                        !//
//!========================================================================================!//

main();

