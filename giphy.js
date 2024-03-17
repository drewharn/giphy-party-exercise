// console.log("Let's get this party started!");
const $gifArea = $("#gif-area");
const $searchInput = $("#search");

//This will use the ajax result to add a gif//

function addGif(res) {
    let numResults = res.data.length;
    if(numResults) {
        let randomIndex = Math.floor(Math.random() * numResults);
        let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4"});
        let $newGif = $("<img>", {
            src: res.data[randomIndex].images.original.url,
            class: "w-100"
        });
        $newCol.append($newGif);
        $gifArea.append($newCol);
    }
}

//This will enable form submission so that the search box is cleared and an ajax call will be made. //
$("form").on("submit", async function(evt) {
    evt.preventDefault();

    let searchTerm = $searchInput.val();
    $searchInput.val("");

    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: searchTerm,
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    });
    addGif(response.data);
});

//Removing gif//
$("#remove").on("click", function() {
    $gifArea.empty();
}); 