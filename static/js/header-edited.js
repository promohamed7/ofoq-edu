var navbtn = document.querySelector('#navbtn')
if (navbtn) {
navbtn.addEventListener('click', (e) => {
        if ($('#mobilemenu').hasClass('translate-x-full')) {
            $('#mobilemenu').removeClass('translate-x-full')
        $('#closeicon').removeClass('hidden')
        $('#menuicon').addClass('hidden')
    } else {
            $('#mobilemenu').addClass('translate-x-full')
        $('#closeicon').addClass('hidden')
        $('#menuicon').removeClass('hidden')
    }
})
}


var searchInput = document.querySelector('#navbar-search-input');

if (searchInput) {
searchInput.addEventListener('input', function(){
    if(searchInput.value.trim().length > 0){
        $("#navbar-search-btn").prop('disabled', false);
    }else{
        $("#navbar-search-btn").prop('disabled', true);
    }
});
}

var searchInput1 = document.querySelector('#navbar-search-input-1');

if (searchInput1) {
searchInput1.addEventListener('input', function(){
    if(searchInput1.value.trim().length > 0){
        $("#navbar-search-btn-1").prop('disabled', false);
    }else{
        $("#navbar-search-btn-1").prop('disabled', true);
    }
});
}


