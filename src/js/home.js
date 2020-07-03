// console.log('hola mundo!');
// const noCambia = "Leonidas";

// let cambia = "@LeonidasEsteban"

// function cambiarNombre(nuevoNombre) {
//   cambia = nuevoNombre
// }


// cambiarNombre ('jhonatan')


// const getUserAll = new Promise (function (todoBien, todoMal) {
//   setTimeout (function (){
//     todoBien('si hay usuario, promesa realizadao')
//     // todoMal('no hay usuarios, se acabo el tiempo')
//   }, 5000)

// }) 


// const getUser = new Promise (function (todoBien, todoMal) {
//   setTimeout (function (){
//     todoBien('si hay usuario, promesa realizada2')
//     // todoMal('no hay usuarios, se acabo el tiempo')
//   },3000)

// }) 

// getUser
// .then (function () { //cuando funciona la promesa
//   console.log ('promesa realizada')
// })
// .catch (function (message) { //cuando la promesa falla
//   console.log (`${message}`)
// })

// Promise.all ([ //enviar varias promesas a la ves
//   getUser,
//   getUserAll,
// ])
// .then (function (message) { //cuando funciona la promesa
//      console.log (`${message}`)
//    })
// .catch (function (message) { //cuando la promesa falla
//      console.log (`${message}`)
//    })

//    Promise.race ([ //enviar varias promesas a la ves
//     getUser,
//     getUserAll,
//   ])
//   .then (function (message) { //cuando funciona la promesa
//        console.log (`${message}`)
//      })
//   .catch (function (message) { //cuando la promesa falla
//        console.log (`${message}`)
//      })

// ###########################

// AJAX EN JQUERY

// #####################33

// $.ajax('https://randomuser.me/api/', {

//  method:'GET', //porque metodo se tra algo GET, mandando un dato POST
//  success: function (data) {
//    console.log (data)

//  },
//  error: function (error) {
//   console.log (error)
//  }

// })

// ###########################

// AJAX EN JS

// #####################33

// // fetch (url, configuracion)
// fetch ('https://randomuser.me/api/' ) //fecth devuelve una promesa
//   .then (function (response) {
//     console.log (response) // la respuesta tiene un metodo llamado json
//    return  response.json() //.json() devuelve una promesa y podemos retornar la promesa
//   })
//   .then(function (user) { //aca trae los datos
//     console.log(user)
//     console.log(`user ${user.results[0].name.first}`)

//   }).catch(function () {
//     console.log(`algo fallo`)

//   })


//       // fetch (url, configuracion)
// fetch ('https://pokeapi.co/api/v2/pokemon/1' ) //fecth devuelve una promesa
// .then (function (response) {
//   console.log (response) // la respuesta tiene un metodo llamado json
//  return  response.json() //.json() devuelve una promesa y podemos retornar la promesa
// })
// .then(function (user) { //aca trae los datos
//   console.log(`user ${user.abilities[0].ability.name}`)
//   console.log(`user ${user.abilities[0].ability.url}`)

// }).catch(function () {
//   console.log(`algo fallo`)

// })


// CLASE 7 FUNCIONES ASINCRONAS


(async function load() {
  const $actionContainer = document.querySelector('#action')
  const $dramaContainer = document.getElementById('drama')
  const $animationContainer = document.getElementById('animation')
  const $featuringContainer = document.getElementById('featuring')
  const $formulario = document.getElementById('form')
  const $home = document.querySelector('#home')

  const $modal = document.getElementById('modal')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  // buscar elementos en una seccion
  const $modalTile = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDesription = $modal.querySelector('p')



  async function getData(url) { //getData devuelve una promesa
    const response = await fetch(url)
    const data = await response.json()
    if (data.data.movie_count>0) { //validar si retorna un¿a pelicula o no
      return data     
    }else{
      //crea run nuevo errro

      throw new Error ('no se encontró ningun resultado')
    }

  }

  function setAttributes($elemento, attributes) { //$elemento =elemento variable que recibe // attributes= el objeto que recibe

 for (const attribute in attributes) {
  
  $elemento.setAttribute(attribute, attributes[attribute]) //attributes[attribute] llama el atributo que se envia
  
 }
  }
  


   const BASE_API = "https://yts.mx/api/v2/"

//funcion de crear / renderizar los valorres de la pelicula a la hora de buscar un apelicula

function featureTemplate(peli) {
  return (
        `
      <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
    </div>
  `
  )
}


  $formulario.addEventListener('submit', async (event)=>{
    // debugger
    event.preventDefault();
    $home.classList.add('search-active')

    // creacion de elementos
    const $loader= document.createElement('img')
    setAttributes($loader, {
      src:'src/images/loader.gif',
      height: 50,
      width:50
      
    })
    //colocar el $loader=el elemento creado en html
    $featuringContainer.append($loader)
    //obtener el dato que se envia del form
    const data = new FormData($formulario)
    try{
      const {
        data:{
          movies:pelis
        }
        
  
      } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`) // data.get('name')  obtiene el valor de lo que se escribio en elformulario
     
  
      const HTMLString = featureTemplate(pelis[0])
      $featuringContainer.innerHTML = HTMLString

    }catch(error){
      alert(error.message);
      $loader.remove()
      $home.classList.remove('search-active')
    }
    


  })






  function videoItemTemplate(movie, category) {
    return (

      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
          <div class="primaryPlaylistItem-image">
            <img src="${movie.medium_cover_image}">
          </div>
          <h4 class="primaryPlaylistItem-title">
          ${movie.title}
          </h4>
          </div>`

    )
  }

  // console.log(videoItemTemplate('src/images/cover/felices.jpg', 'Somos felices'))

  function createTemplate(HTMLstring) {

    const $html = document.implementation.createHTMLDocument() //convertir string a html
    $html.body.innerHTML = HTMLstring                           //convertir string a html

    return $html.body.children[0]
  }

  function addEventClick($element) {
    $element.addEventListener('click', () =>{
      
      // alert('hola mundo')
      showModal($element)
    })
    // $('div').on('click',function(){ //codigo }) esto es en jquery

    
  }

  //PARA MOSTRAR LAS PELICULAS

  function renderMoveList(list, $container, category) {

    // actionList.data.movies.
    $container.children[0].remove()
    list.forEach(movie => { //funcion flecha

      const HTMLstring = videoItemTemplate(movie, category)
      const movieElement = createTemplate(HTMLstring)
      $container.append(movieElement)

      //buscar la img
      const image = movieElement.querySelector('img')
      image.addEventListener ('load', (event)=>{ //cuando se cargue la img
        event.srcElement.classList.add('fadeIn') //event  trae de quien al lanzo, y se trae solo la img =srcElement / target
      }) 
      
      // console.log(HTMLstring)
      addEventClick(movieElement)

    });
  }

//para verificar si hay algo en cache // localstorage
     async function cacheExist(category) {
       const listName = `${category}List`
       const cacheList = window.localStorage.getItem(listName)

       if (cacheList) {
         return JSON.parse (cacheList)
         
       }

     const {data:{  movies: data} } = await getData(`${BASE_API}list_movies.json?genre=${category}`)
     localStorage.setItem(listName, JSON.stringify(data)  )
     return data
      
    }

    // const {data:{  movies: actionList} } = await getData(`${BASE_API}list_movies.json?genre=action`)
  const actionList = await cacheExist('action')
  // localStorage.setItem('actionList', JSON.stringify(actionList)  )
  renderMoveList(actionList, $actionContainer, 'action' )
  

  // const {data:{  movies:dramaList} } = await getData(`${BASE_API}list_movies.json?genre=drama`)
  const dramaList  = await await cacheExist('drama')
  // localStorage.setItem('dramaList', JSON.stringify(dramaList) )
  renderMoveList(dramaList, $dramaContainer , 'drama')
  

  // const {data:{  movies:animationList} } = await getData(`${BASE_API}list_movies.json?genre=animation`)

  const animationList = await  await cacheExist('animation')
  // localStorage.setItem('animationList', JSON.stringify(animationList) )
  renderMoveList(animationList, $animationContainer, 'animation')
  console.log(actionList, dramaList, animationList )
  // debugger







  // creación de template }} con jquery en aca linea utiliza comilla sencilla y concatenar con un +

  function  findByID(list, id) {
   return list.find((movie)=>{
      return movie.id === parseInt( id, 10)
    })
  }

      //funcion para busar los elementos segun su ig y pasandola su categoria

      function findMovie(id, category) {
        switch (category) {
          case 'drama':
           
           return  findByID (dramaList, id);
           
          case 'action':
            return   findByID (actionList, id);
           
          
          case 'animation':
            return   findByID (animationList, id);
       
        }

        //filtrado de datos
       

        
      }

  // Activar el Modal

  function showModal($element) { 

    $overlay.classList.add('active')
    $modal.style.animation='modalIn .8s forwards'

    const id = $element.dataset.id
    const category = $element.dataset.category    
    //funcion para busar los elementos segun su ig y pasandola su categoria

   const data =  findMovie(id, category)

   $modalTile.textContent=data.title
   $modalImage.setAttribute('src', data.medium_cover_image)
   $modalDesription.textContent=data.description_full
   
    
  }
  // Cerrar el Modal
  $hideModal.addEventListener('click', hideModal)

  function hideModal() {
    $overlay.classList.remove('active')
    $modal.style.animation='modalOut .8s forwards'
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // fetch ('https://randomuser.me/api/' ) //fecth devuelve una promesa
  //   .then (function (response) {
  //     console.log (response) // la respuesta tiene un metodo llamado json
  //    return  response.json() //.json() devuelve una promesa y podemos retornar la promesa
  //   })
  //   .then(function (user) { //aca trae los datos
  //     console.log(user)
  //     console.log(`user ${user.results[0].location.street.name}`)
  
  //   }).catch(function () {
  //     console.log(`algo fallo`)
  
  //   })


    async function users(url) {

      const response = await fetch (url)
      const data =  await response.json()
      return data
      
    }
    
    const user = await users('https://randomuser.me/api/?results=15')


    function userListTemplate(user){
      return (  
        `<li class="playlistFriends-item">
        <a href="#">
          <img src="${user.picture.medium}" alt="${user.name.first}" />
          <span>
          ${user.name.first}  ${user.name.last}
          </span>
        </a>
      </li>
        
        `
      )
    }

    const $userContainer = document.getElementById ('playlistFriends')
    user.results.forEach((users) => {
      const HTMLString =  userListTemplate(users)
      const html = document.implementation.createHTMLDocument() //convertir string a html
    html.body.innerHTML = HTMLString                           //convertir string a html
    $userContainer.append( html.body.children[0])

    })

    
///////////////////////// peliculas  que em gustan
    
    async function likeMovie(url) {

      const response = await fetch (url)
      const data =  await response.json()
      return data
      
      
    }
    


    const {
      data: {
        movies: suggestions,}
        
      }  = await likeMovie(`${BASE_API}movie_suggestions.json?movie_id=20`)
   
    

    function likeTemplate(movie){
      return (  
        `
        <li class="myPlaylist-item">
              <a href="#">
                <span>
                 ${movie.title}
                </span>
              </a>
            </li>
        
        `
      )
    }
    

    const $movieContainer = document.getElementById('myPlaylist')
    suggestions.forEach((movie) => {
      const HTMLString =  likeTemplate(movie)
      const html = document.implementation.createHTMLDocument() //convertir string a html
    html.body.innerHTML = HTMLString                           //convertir string a html
    $movieContainer.append( html.body.children[0])
    
    })



    ////////////////////////////////////////////////

    
    async function userPrincipal(url) {

      const response = await fetch (url)
      const data =  await response.json()
      return data
      
    }
    
    const userPrin = await userPrincipal('https://randomuser.me/api/?results=1')


    function userlogin(user){
      return (  
        `<p>
        <img src="${user.picture.medium}" alt=""/>
        <span>${user.name.title} ${user.name.first}</span>
      </p>
        
        `
      )
    }

    const $userPrincipal = document.getElementById ('user')
    userPrin.results.forEach((userP) => {
      const HTMLString =  userlogin(userP)
      const html = document.implementation.createHTMLDocument() //convertir string a html
    html.body.innerHTML = HTMLString                           //convertir string a html
    $userPrincipal.append( html.body.children[0])

    })




})() // para auto ejecutar una funcion