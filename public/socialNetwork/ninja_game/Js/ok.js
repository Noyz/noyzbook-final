var linkArray = []; // your links
var test = '';

jQuery('.area-product.member').each(function(index, element){
	linkArray =  jQuery(element).find('a').attr('href');
	linkArray.push();
});
console.log(linkArray)
// for (var i = 0; i < linkArray.length; i++) {
//     // will open each link in the current window
//     chrome.tabs.create({
//         url: linkArray[i]
//     });
// }


