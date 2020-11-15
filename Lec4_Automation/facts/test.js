let links = [ "abcd" , "abcd" , "asdai" , "akjsd" ];


// let newLinks = links.map( function(link){
//     return "hello to " +link;
// })

// console.log(newLinks);



let filteredLinks = links.filter( function(link){
    return link != "abcd";
})

console.log(filteredLinks);