let skoly = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Seznam_škol_a_školských_zařízení/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
let studentiVS = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Počty_studentů_krajských_vyšších_odborných_škol/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
let studentiSS = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Počty_žáků_v_oborech_středních_škol_zřizovaných_krajem/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
let druhy = [];
let mesta = [];
let skolyData;
let studentiVSarray;
let obj;
let skolyGPS;

async function getSkoly(){
    await fetch(skoly).then(response => {
        return response.json();
    }).then(dat =>{
        skolyData =  dat.features;
        //console.log(dat.fields);
        //console.log(skolyData);
    skolyData.forEach(skola => {
        let att = skola.attributes;
        if(!druhy.includes(att.zarizeni_druh))
            druhy.push(att.zarizeni_druh); 
        if(!mesta.includes(att.nazev_okresu))
            mesta.push(att.nazev_okresu); 
        let tr = document.createElement("tr");
        tr.id = att.ico;
        let td1 =  document.createElement("td");td1.innerHTML = att.nazev;td1.setAttribute("keyeee",att.nazev);
        let td2 = document.createElement("td"); td2.innerHTML = att.ico;
        let td3 = document.createElement("td"); td3.innerHTML = att.zarizeni_druh;
        if(!druhy.includes(td3.innerHTML))
            druhy.push(td3.innerHTML)
        let td4 = document.createElement("td"); td4.innerHTML = att.nazev_okresu;
        let td5 = document.createElement("td"); td5.innerHTML = att.nazev_obce;
        let td6 = document.createElement("td"); td6.innerHTML = att.nazev_ulice;
        let td7 = document.createElement("td"); td7.innerHTML = att.cislo_domovni;
        let td8 = document.createElement("td"); td8.innerHTML = att.psc;
        let td9 = document.createElement("td"); td9.innerHTML = att.www;
        let btn = document.createElement("button"); btn.innerHTML = "Zobrazit na mapě";
        btn.addEventListener("click", () =>{mymap.setView([att.y,att.x]);
            mymap.setZoom(20);});
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        tr.appendChild(td9);
        tr.appendChild(btn);
        document.getElementById("results").appendChild(tr);
        let f = document.createElement("tr")
        tr.after()
        var marker = L.marker([att.y, att.x]).on('click', ()=>{
            alert(att.nazev);
        });
        marker.addTo(mymap);
    });           
    selecty();
    //console.log(druhy);
})
}


async function getStudentiSS(){
    await fetch(studentiSS).then(response => {
        return response.json();
    }).then(dat =>{
        let studentiSSarray =  dat.features;
        //console.log(dat.fields);
        //console.log(studentiSSarray);
        studentiSSarray.forEach(studenti => {
            let id = document.getElementById(studenti.attributes.ico);
            
            //console.log(studenti.attributes.ico);
                let tr = document.createElement("tr");
                let ul = document.createElement("ul");
                let li1 = document.createElement("li");
                let li2 = document.createElement("li");
                let li3 = document.createElement("li");
                let li4 = document.createElement("li");
                let li5 = document.createElement("li");
                let li6 = document.createElement("li");
                let li7 = document.createElement("li");
                let li8 = document.createElement("li");
                let par = document.createElement("p");
                ul.appendChild(par);
                par.innerHTML = studenti.attributes.obor_nazev;
                par.id = studenti.attributes.obor_kod;
                if(studenti.attributes.pocet_studentu_1_rocnik != 0){
                    let p1 = document.createElement("p");
                    p1.innerHTML = "Počet studentů v 1 ročníku";
                    li1.innerHTML=studenti.attributes.pocet_studentu_1_rocnik;
                    ul.appendChild(p1);
                    ul.appendChild(li1);

                }
                if(studenti.attributes.pocet_studentu_2_rocnik != 0){
                    let p2 = document.createElement("p");
                    p2.innerHTML = "Počet studentů v 2 ročníku";
                    li2.innerHTML=studenti.attributes.pocet_studentu_2_rocnik;
                    ul.appendChild(p2);
                    ul.appendChild(li2);

                }
                if(studenti.attributes.pocet_studentu_3_rocnik != 0){
                    let p3 = document.createElement("p");
                    p3.innerHTML = "Počet studentů v 3 ročníku";
                    li3.innerHTML=studenti.attributes.pocet_studentu_3_rocnik;
                    ul.appendChild(p3);
                    ul.appendChild(li3);

                }
                if(studenti.attributes.pocet_studentu_4_rocnik != 0){
                    let p4 = document.createElement("p");
                    p4.innerHTML = "Počet studentů v 4 ročníku";
                    li4.innerHTML=studenti.attributes.pocet_studentu_4_rocnik;
                    ul.appendChild(p4);
                    ul.appendChild(li4);

                }
                if(studenti.attributes.pocet_studentu_5_rocnik != 0){
                    let p5 = document.createElement("p");
                    p5.innerHTML = "Počet studentů v 5 ročníku";
                    li5.innerHTML=studenti.attributes.pocet_studentu_5_rocnik;
                    ul.appendChild(p5);
                    ul.appendChild(li5);

                }
                if(studenti.attributes.pocet_studentu_6_rocnik != 0){
                    let p6 = document.createElement("p");
                    p6.innerHTML = "Počet studentů v 6 ročníku";
                    li6.innerHTML=studenti.attributes.pocet_studentu_6_rocnik;
                    ul.appendChild(p6);
                    ul.appendChild(li6);

                }
                if(studenti.attributes.pocet_studentu_7_rocnik != 0){
                    let p7 = document.createElement("p");
                    p7.innerHTML = "Počet studentů v 7 ročníku";
                    li7.innerHTML=studenti.attributes.pocet_studentu_7_rocnik;
                    ul.appendChild(p7);
                    ul.appendChild(li7);

                }
                if(studenti.attributes.pocet_studentu_8_rocnik != 0){
                    let p8 = document.createElement("p");
                    p8.innerHTML = "Počet studentů v 8 ročníku";
                    li8.innerHTML=studenti.attributes.pocet_studentu_8_rocnik;
                    ul.appendChild(p8);
                    ul.appendChild(li8);
                }               
            tr.append(ul)
            id.after(ul);
            
        });
    
});
}
async function getStudentiVS(){
    await fetch(studentiVS).then(response => {
        return response.json();
    }).then(dat =>{
        let studentiVSarray =  dat.features;
        studentiVSarray.forEach(studenti => {
            let id = document.getElementById(studenti.attributes.ico);
            let ul = document.createElement("ul");
            let li1 = document.createElement("li");
            let li2 = document.createElement("li");
            let li3 = document.createElement("li");
            let li4 = document.createElement("li");
            let li5 = document.createElement("li");
            let li6 = document.createElement("li");

            
            let par = document.createElement("p");
            par.innerHTML = studenti.attributes.vzdelavaci_program_nazev;
            par.id = studenti.attributes.kod;

            let p1 = document.createElement("p");
            p1.innerHTML = "Počet studentů v 1 ročníku";
            li1.innerHTML=studenti.attributes.pocet_studentu_1_rocnik;
            let p2 = document.createElement("p");
            p2.innerHTML = "Počet studentů v 2 ročníku";
            li2.innerHTML=studenti.attributes.pocet_studentu_2_rocnik;
            let p3 = document.createElement("p");
            p3.innerHTML = "Počet studentů v 3 ročníku";
            li3.innerHTML=studenti.attributes.pocet_studentu_3_rocnik;
            let p4 = document.createElement("p");
            p4.innerHTML = "Počet studentů v 4 ročníku";
            li4.innerHTML=studenti.attributes.pocet_studentu_4_rocnik;
            let p5 = document.createElement("p");
            p5.innerHTML = "Počet absolventů v roce 2019/20";
            li5.innerHTML=studenti.attributes.pocet_absolventu_2019_2020;
            let p6 = document.createElement("p");
            p6.innerHTML = "Počet přijatých studentů";
            li6.innerHTML=studenti.attributes.pocet_prijatych_studentu;

        })
    })
}

function selecty(){
    let selectType = document.getElementById("selectType");
    let selectTown = document.getElementById("selectTown");
    let selectDistance = document.getElementById("selectDistance");

    for(i = 0; i< druhy.length; i++){
        let op = document.createElement("option");
        op.innerHTML = druhy[i];
        op.value = druhy[i];
        selectType.appendChild(op);
    }

    for(i = 0; i< mesta.length; i++){
        let op = document.createElement("option");
        op.innerHTML = mesta[i];
        selectTown.appendChild(op);
    }
}

function filtrovat(){
    let type = document.getElementById("selectType").value;
    let tytown = document.getElementById("selectTown").value;
    let distance = document.getElementById("selectDistance").value;
    let pokrocilyData;
    if(distance != 0){
        
        navigator.geolocation.getCurrentPosition(function(location) {
            let lat = location.coords.latitude;
            let lon = location.coords.longitude;
        }) 
    }
    if(type !=""){
        pokrocilyData = document.getElementsByTagName("tr");
        console.log(pokrocilyData)
        for(i =0; i<pokrocilyData.length;i++){
            console.log(type);
            console.log(pokrocilyData[i].cells[2].innerHTML)
            if(pokrocilyData[i].cells[2].innerHTML != type){
                pokrocilyData[i].style.display = "none";
            }
            else{
                pokrocilyData[i].style.display = "block";
            }

        }
    }

    if(tytown != ""){
        pokrocilyData = document.getElementsByTagName("tr");
        for(i =0; i<pokrocilyData.length;i++){
            if(pokrocilyData[i].cells[3].innerHTML != tytown){
                pokrocilyData[i].style.display = "none";
            }
            else{
                pokrocilyData[i].style.display = "block";

            }

        }

    }


}

getSkoly();
//getStudentiSS();
//getStudentiVS();