/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  let response = await axios.get(`http://api.tvmaze.com/search/shows`, {params:{
    q: query
  }
  })

  let responseArr = response.data
  let showArr = responseArr.map(function(val){
    return{
      id: val.show.id,
      name: val.show.name,
      summary: val.show.summary,
      image: val.show.image ? val.show.image.medium : "http://tinyurl.com/missing-tv"
    }
  })
  console.log(showArr)
  return showArr
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <img class="card-img-top" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button id= "getEp">Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  let response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)

  let responseArr = response.data

  // console.log(responseArr)
  let epArr = responseArr.map(function(val){
    return{
      id: val.id,
      name: val.name,
      season: val.season,
      number: val.number
    }
  }
  )
  // console.log(epArr)
  return epArr
}

function populateEpisodes(epArr) {
  const $epList = $("#episodes-list");
  $epList.empty();
  for (let ep of epArr) {
    let $item = $(
      `
      <li>
         ${ep.name}
         (season ${ep.season}, episode ${ep.number})
       </li>
      `);

    $epList.append($item);
    $("#episodes-area").show();
  }
}

$("#shows-list").on("click", "#getEp", async function handleEpisodeClick(evt) {
  // console.log("clicked!")
  let showId = $(evt.target).closest(".Show").data("show-id");
  // console.log(showId)
  let episodes = await getEpisodes(showId);
  // console.log(episodes)
  populateEpisodes(episodes);
});