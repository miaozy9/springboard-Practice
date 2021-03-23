// console.log("Let's get this party started!");


$("#searchForm").on("submit", async function(e){
    e.preventDefault()
    let term = $("#searchTerm").val()
    const response = await axios.get("http://api.giphy.com/v1/gifs/search",{params:{
        q : term,
        api_key : "p5HC15nFkERXk9nMCe8eNROnaTxGw3w8"
    }
    })



    let numResults = response.data.data.length
    console.log(numResults)
    let random = Math.floor(Math.random() * numResults)

    if(numResults){
        
        let img = $("<img>",{
            src : response.data.data[random].images.original.url
        })
        $("#gif").append(img)
    }
})

$("#remove").on("click", function() {
    $("#gif").empty();
  });

