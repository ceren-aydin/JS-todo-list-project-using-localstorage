/*Selectors */
const gorevGirisAlani = document.querySelector(".gorev-GirisAlani");
const gorevEkle = document.querySelector(".gorev-Ekle");
const gorevListesi = document.querySelector(".gorev-Listesi");
const uyari = document.querySelector(".uyari");

gorevEkle.addEventListener("click",goreviEkle);
gorevListesi.addEventListener("click",gorevSilTamamla);

uyari.style.display= "none";

/* Görev yazılan bölüme 30 karakterden fazla yazılmasına izin verilmemesi */
function checkChar() {
    var enFazlaKarakter = 30;
    var icerik = document.getElementById("content");
    var icerikUzunlugu = icerik.value.length;

    if (icerikUzunlugu > enFazlaKarakter) {
        icerik.value = icerik.value.substring(0, enFazlaKarakter);
        uyari.style.display= "block";

    setTimeout(()=> {
        uyari.style.display = "none";
        },3000);
    }
}

/* Görevlerin sayfaya eklenmesi */
function goreviEkle(e){
    e.preventDefault();

    const isEmpty = str => !str.trim().length;

    if(isEmpty(gorevGirisAlani.value)){
        gorevGirisAlani.value="";
    }else{
        goreviLocaleKaydet(gorevGirisAlani.value);
        
        const gorevDiv = document.createElement("div");
        gorevDiv.classList.add("gorev");

        const yeniGorev = document.createElement("ul");
        yeniGorev.innerText = gorevGirisAlani.value;
        yeniGorev.classList.add("gorev-item");
        gorevDiv.appendChild(yeniGorev);

        const tamamlaButonu = document.createElement("button");
        tamamlaButonu.classList.add("tamamla-butonu");
        tamamlaButonu.innerHTML = "<i class='fa-sharp fa-regular fa-circle-check'></i>";
        gorevDiv.appendChild(tamamlaButonu);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("sil-butonu");
        deleteButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
        gorevDiv.appendChild(deleteButton);

        gorevListesi.appendChild(gorevDiv);

        gorevGirisAlani.value="";
    }
}

/* Görevlerin sayfadan silinmesi veya üstünün çizilmesi */
function gorevSilTamamla(e){
    const item = e.target;
    if(item.classList[0] === "sil-butonu"){
        const silinecekGorev = item.parentElement;
        silinecekGorev.remove(); 
        goreviLocaldenSil(silinecekGorev);
    }else{
        if(item.classList[0] === "tamamla-butonu"){
            const tamamlananGorev = item.parentElement;
            tamamlananGorev.classList.toggle("ustunuCiz");
        }
    }
}

/* Görevin Local'e kaydedilmesi */
function goreviLocaleKaydet(localeEklenecekGorev){
    let gorevler;
    if(localStorage.getItem("gorevler") === null){ 
        gorevler = [];                              
    }else{
        gorevler = JSON.parse(localStorage.getItem("gorevler"));
        }
    gorevler.push(localeEklenecekGorev);

    localStorage.setItem("gorevler", JSON.stringify(gorevler)); 
}

/* Görevin Local'den silinmesi */
function goreviLocaldenSil(localdenSilinecekGorev){
    let gorevler;
    if(localStorage.getItem("gorevler") === null){ 
        gorevler = [];                              
    }else{
        gorevler = JSON.parse(localStorage.getItem("gorevler"));
    }

    const silinecekGorev = localdenSilinecekGorev.children[0].innerText;
    gorevler.splice(gorevler.indexOf(silinecekGorev),1);
    localStorage.setItem("gorevler", JSON.stringify(gorevler));
}

/* Eklenen görevlerin sayfa yenilendikten sonra da ekranda kalması */
function getGorev(){
    let gorevler;

    if(localStorage.getItem("gorevler") === null){
        gorevler = [];
    }else{
        gorevler = JSON.parse(localStorage.getItem("gorevler"));
    }
    gorevler.forEach(herBirGorev => { 
        const gorevDiv = document.createElement("div");
        gorevDiv.classList.add("gorev");

        const yeniGorev = document.createElement("ul");
        yeniGorev.innerText = herBirGorev;
        yeniGorev.classList.add("gorev-item");
        gorevDiv.appendChild(yeniGorev);

        const tamamlaButonu = document.createElement("button");
        tamamlaButonu.classList.add("tamamla-butonu");
        tamamlaButonu.innerHTML = "<i class='fa-sharp fa-regular fa-circle-check'></i>";
        gorevDiv.appendChild(tamamlaButonu);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("sil-butonu");
        deleteButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
        gorevDiv.appendChild(deleteButton);

        gorevListesi.appendChild(gorevDiv);
    });
}
getGorev();