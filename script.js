function ricomincia(){
  const a = document.querySelectorAll('.choice-grid div');
  const immagine = document.querySelectorAll('.checkbox');
  for(let z of immagine){
    z.src = 'images/unchecked.png';
  }
  for (let i of a){
    i.classList.remove('overlay');
    i.classList.remove('color');
  }
  const first = document.querySelector('#ricomincia');
  first.classList.add('test_completato');
  
  for(let i=0;i<27; i++){
    a[i].addEventListener('click', spunta);
  }
  risposta.one = null;
  risposta.two=  null;
  risposta.three= null;
  const album=document.querySelector('#album-view');
album.innerHTML= '';
const musica=document.querySelector('#risultato');
musica.innerHTML='';

}


function spunta(event)
{
  const l= event.currentTarget;
  const immagine = l.querySelector('.checkbox');
  const a = document.querySelectorAll('.choice-grid div'); 
  immagine.src = 'images/checked.png';
  l.classList.remove('overlay');
  l.classList.add('color');

  retro(l);

  const cid = l.dataset.choiceId;
  const qid = l.dataset.questionId;

  risposta[qid]=cid;
  if(risposta.one !== null && risposta.two !== null && risposta.three !== null){
    for(let i=0;i<27; i++){
      a[i].removeEventListener('click', spunta);
    }
    const ris= risultato_personalita(risposta);

    const testo_titolo = document.querySelector('h2');
    const articolo = document.querySelector('p');
    testo_titolo.textContent = RESULTS_MAP[ris].title;
    articolo.textContent = RESULTS_MAP[ris].contents;
    
    const completato = document.querySelector('.test_completato');
    completato.classList.remove('test_completato');

    const pulsante = document.querySelector('#pulsante');
    pulsante.addEventListener('click', ricomincia);

  }

}


function retro(risposta){
  const r= document.querySelectorAll('.choice-grid div');
  for(const s of r){
    if (s.dataset.choiceId !== risposta.dataset.choiceId && s.dataset.questionId === risposta.dataset.questionId){
      s.classList.remove('color');
      const rimuovi_immagine = s.querySelector('.checkbox').src = 'images/unchecked.png';
      s.classList.add('overlay');
    }
  }
}

function risultato_personalita(risposta){
  
  if(risposta.one === risposta.two || risposta.one === risposta.three)
  return risposta.one;
  else if(risposta.two === risposta.three)
  return risposta.two;
  else if (risposta.one !== risposta.two && risposta.one !== risposta.three)
  return risposta.one;
   
}



const immagine = document.querySelectorAll('.choice-grid div');

for(let i=0;i<27; i++){
  immagine[i].addEventListener('click', spunta);
}

const risposta = {
  'one':null,
  'two':null,
  'three':null,
}

const numResults = 1;
const anime_key='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MDkiLCJuYmYiOjE2NTEwNzc4NzksImV4cCI6MTY1MzY2OTg3OSwiaWF0IjoxNjUxMDc3ODc5fQ.AJtb4DwBNqpZLsODm4MS4UDsxuyUMovPCtRfz7frZNU';
const anime_api_endpoint ='https://api.aniapi.com/v1/anime';

//

function onResponse(response){
  return response.json();
}
let token;
function onTokenJson(json){
  console.log(json)
  token = json.access_token;
}

function onImgJson(json){
console.log(json);
const risultato= json.data.documents;
const album=document.querySelector('#album-view');
album.innerHTML= '';

for(let result of risultato){
  
  const imgContainer= document.createElement('div');
  imgContainer.classList.add('container')
  const img= document.createElement('img');
  img.src= result.cover_image;
  imgContainer.appendChild(img);
  album.appendChild(imgContainer);
}
}
function onJson(json) {
  console.log('json ok');
  console.log(json);

const result=json.artists.items;
const album_data= result[0].external_urls.spotify;
console.log(album_data);
document.querySelector("#risultato").href=album_data;
document.querySelector("#risultato").textContent=album_data;
}
function richiesta(event){
  event.preventDefault();

  const testo= document.querySelector('#content').value;  //salviamo il testo
  const encodedText= encodeURIComponent(testo); // converte il testo utilizzabile all'interno del url
  const tipo = document.querySelector('#tipo').value;
  if(tipo === 'artista'){
    fetch("https://api.spotify.com/v1/search?type=artist&q=" + encodedText,
{
  headers:
  {
    'Authorization': 'Bearer ' + token
  }
}
).then(onResponse).then(onJson);
const album=document.querySelector('#album-view');
album.innerHTML= ''}
if(tipo=== 'anime'){

anime_richiesta = anime_api_endpoint + '?key='  + anime_key+ '&testo=' + encodedText + '&per_page=' + numResults;
  fetch(anime_richiesta).then(onResponse).then(onImgJson);
  album.innerHTML= ''}

  const album=document.querySelector('#album-view');
  album.innerHTML= ''

}
const form=document.querySelector('#search_content');
form.addEventListener('submit', richiesta);


const client_id= '59c8ab5ef931448bbd0de9c22f5ae82b';
const client_secret='5f877c4b43664f29aee436cc1bfd7085';


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
 ).then(onResponse).then(onTokenJson);
































