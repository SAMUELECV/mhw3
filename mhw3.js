/* REGISTRAZIONE */

function onClickLogin(event) {
    const login = document.querySelector('#login');
    isVisible = !isVisible;
  if (isVisible) {
    login.classList.remove('hidden');
    document.body.classList.add('no-scroll');
  }
  else {
    login.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }
}
let isVisible = false;

const detailLogin = document.querySelector('#mobileUser');
detailLogin.addEventListener('click', onClickLogin);

function onClickMap(event) {
  const login = document.querySelector('#mappa');
  isVisibleMap = !isVisibleMap;
if (isVisibleMap) {
  mappa.classList.remove('hidden');
}
else {
  mappa.classList.add('hidden');
}
}
let isVisibleMap = true;

const detailMap = document.querySelector('#logoFt');
detailMap.addEventListener('click', onClickMap);

/* CREAZIONE ALBUM FOTO */ 

const photo_list = [];

function createImage(src) {
  const image = document.createElement('img');
  image.src = src;
  return image;
}

const albumView = document.querySelector('#FBoxImg');
for (let i = 0; i < photo_list.length; i++) {
  const photoSrc = photo_list[i];
  const image = createImage(photoSrc);
  albumView.appendChild(image);
}

/* CLICK IMMAGINI PANINO SUSI ECC */

function onThumbnailClick(event) {
const modalView = document.querySelector('#modalView');
const image = createImage(event.currentTarget.src);
document.body.classList.add('no-scroll');
modalView.innerHTML = '';
modalView.appendChild(image);
modalView.classList.remove('hidden');
}

function onModalClick(event) {
  document.body.classList.remove('no-scroll');
  const modalView = document.querySelector('#modalView');
  modalView.classList.add('hidden');
}

const modalView = document.querySelector('#modalView');
modalView.addEventListener('click', onModalClick);

const galleriaItems = document.querySelectorAll('#FBoxImg img');
for (let i = 0; i < galleriaItems.length; i++) {
  const item = galleriaItems[i];
  item.addEventListener('click', onThumbnailClick);
}

//API mappa FETCH

  fetch('https://js.api.here.com/v3/3.1/mapsjs-core.js')
  .then(response => response.text())
  .then(data => {
    //Step 1: initialize communication with the platform
        // Replace variable YOUR_API_KEY with your own apikey
        var platform = new H.service.Platform({
            apikey: 'wLiqrmEhnQU3dNYgLtepoGgYV25AfjO6yQQSCNcnMdk'
        });
        var defaultLayers = platform.createDefaultLayers();
        //Step 2: initialize a map - this map is centered over Europe
        var map = new H.Map(document.getElementById('mappa'),
            defaultLayers.vector.normal.map,
            {
                center: { lat: 50, lng: 5 },
                zoom: 4,
                pixelRatio: window.devicePixelRatio || 1
            }
        );
        // add a resize listener to make sure that the map occupies the whole container
        window.addEventListener('resize', () => map.getViewPort().resize());
        //Step 3: make the map interactive
        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Create the default UI components
        var ui = H.ui.UI.createDefault(map, defaultLayers);

        // Marker code goes here
        var LocationOfMarkerPortali = { lat: 37.59141040302254, lng: 15.106117048335266}; 
        var LocationOfMarkerPorteDiCatania = { lat: 37.48061185569616, lng: 15.050876145864866};
        var LocationOfMarkerCaltanissetta = { lat: 37.50239278551406, lng: 14.04013604847603};
        var LocationOfMarkerPalermo1 = { lat: 38.1394624864376, lng: 13.35565174847603};
        var LocationOfMarkerPalermo2 = { lat: 38.168079704779956, lng: 13.32475270123559};
        // optionally - resize a larger PNG image to a specific size
        var pngIcon = new H.map.Icon("https://cdn2.iconfinder.com/data/icons/gpsmapicons/orange/gpsmapicons07.png",
        { size: { w:40, h: 40 } });
        // Create a marker using the previously instantiated icon:
        var marker1 = new H.map.Marker(LocationOfMarkerPortali, { icon: pngIcon });
        var marker2 = new H.map.Marker(LocationOfMarkerPorteDiCatania, { icon: pngIcon });
        var marker3 = new H.map.Marker(LocationOfMarkerCaltanissetta, { icon: pngIcon });
        var marker4 = new H.map.Marker(LocationOfMarkerPalermo1, { icon: pngIcon });
        var marker5 = new H.map.Marker(LocationOfMarkerPalermo2, { icon: pngIcon });
        // Add the marker to the map:
        map.addObject(marker1);
        map.addObject(marker2);
        map.addObject(marker3);
        map.addObject(marker4);
        map.addObject(marker5);
        
        // Optionally, 
        //Show the marker in the center of the map
        map.setCenter(LocationOfMarkerPortali)

        //Zooming so that the marker can be clearly visible
        map.setZoom(11)
  })
  .catch(error => {
    console.error('Si è verificato un problema con l\'operazione di fetch:', error);
  });

  //API Spotify OAUTH
 
  function onJson(json) {
    console.log('JSON ricevuto');
    console.log(json);
    // Svuotiamo la libreria
    const library = document.querySelector('#album-view');
    library.innerHTML = '';
    // Leggi il numero di risultati
    const results = json.albums.items;
    let num_results = results.length;
    // Mostriamone al massimo 10
    if(num_results > 10)
      num_results = 10;
    // Processa ciascun risultato
    for(let i=0; i<num_results; i++)
    {
      // Leggi il documento
      const album_data = results[i]
      // Leggiamo info
      const title = album_data.name;
      const selected_image = album_data.images[0].url;
      // Creiamo il div che conterrà immagine e didascalia
      const album = document.createElement('div');
      album.classList.add('album');
      // Creiamo l'immagine
      const img = document.createElement('img');
      img.src = selected_image;
      // Creiamo la didascalia
      const caption = document.createElement('span');
      caption.textContent = title;
      // Aggiungiamo immagine e didascalia al div
      album.appendChild(img);
      album.appendChild(caption);
      // Aggiungiamo il div alla libreria
      library.appendChild(album);
    }
  }
  
  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
  function search(event)
  {
    // Impedisci il submit del form
    event.preventDefault();
    // Leggi valore del campo di testo
    const album_input = document.querySelector('#album');
    const album_value = encodeURIComponent(album_input.value);
    console.log('Eseguo ricerca: ' + album_value);
    // Esegui la richiesta
    fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
      {
        headers:
        {
          'Authorization': 'Bearer ' + token
        }
      }
    ).then(onResponse).then(onJson);
  }
  
  function onTokenJson(json)
  {
    console.log(json)
    // Imposta il token global
    token = json.access_token;
  }
  
  function onTokenResponse(response)
  {
    return response.json();
  }
  
  // OAuth credentials --- NON SICURO!
  const client_id = 'b2842ee88cf24777a2d1e0821aa48b80'; //email e pswd nixos40616@lewenbo.com
  const client_secret = 'e8533f0868364a7e960903a4d4b1257a';
  // Dichiara variabile token
  let token;
  // All'apertura della pagina, richiediamo il token
  fetch("https://accounts.spotify.com/api/token",
    {
     method: "post",
     body: 'grant_type=client_credentials',
     headers:
     {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
     }
    }
  ).then(onTokenResponse).then(onTokenJson);
  // Aggiungi event listener al form
  const form = document.querySelector('form');
  form.addEventListener('submit', search)
  