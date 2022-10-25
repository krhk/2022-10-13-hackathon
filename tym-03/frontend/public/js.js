

const main = async () => {
    const res1 = await fetch('/api/data1')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        
        

        console.log("vysl", data)
        
        let dropdown = document.getElementById('dropdown');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Město...';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;


var e = document.getElementById("dropdown1");
var text = e.options[e.selectedIndex].text;
var e2 = document.getElementById("dropdown");
var text2 = e.options[e.selectedIndex].text;


let option;
for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i];
        dropdown.add(option,0);
    }
    });


}




main();









  
    
    
   




