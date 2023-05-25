let JSssn = 0 
let JSpalte = 0
$('.MainPage').fadeIn(0);
$('.CitizenBase').fadeOut(0);
$('.VehiclesBase').fadeOut(0);
$('.GiveFine').fadeOut(0);
$('.SetVerdict').fadeOut(0);
$('.CitizenInfo').fadeOut(0);
$('.SetVerdict').fadeOut(0);
$('.SetVerdict').fadeOut(0); 
$(".tablet-screen").fadeOut();
$(".tablet-main").fadeOut();
$(".tablet-screen").css("transform", "translate(-50%, -50%) scale(1.0)");

$(".close").on("click", function(){
 
    $(".tablet-main").fadeOut(500);
    setTimeout(function(){
        $(".tablet-screen").css("transform", "translate(-50%, -50%) scale(0.7)");
        setTimeout(function(){
            $(".tablet-screen").animate({
                top: "1400px"
            }, 450, function() {
                $(".tablet-screen").fadeOut();
            });
        }, 250);
        $('.list .item').css({
            'color':"rgb(210, 210, 210)"
        })
        $('#kurwawwawa').css({
            'color':"rgb(63, 110, 240)"
        })
        $('.MainPage').fadeIn(0); 
        $('.CitizenBase').fadeOut(0);
        $('.VehiclesBase').fadeOut(0);
        $('.GiveFine').fadeOut(0);
        $('.SetVerdict').fadeOut(0);
        $('.CitizenInfo').fadeOut(0);
        $('.SetVerdict').fadeOut(0);
        $('.SetVerdict').fadeOut(0); 
        $('#SFCJD1').fadeIn();
        $('#ScItabNotes').html('');
        $('#ScItabFines').html('');
        $.post('https://frp_policetablet/NUIFocusOff', JSON.stringify({}));
    }, 250)
})
let close = false
$('.MenuClose').click(function (e) { 

    if(close){
        $('.MenuClose').css({
            'left':'10.8rem',
        })
        $('.MenuClose i').css({
            'rotate':'-180deg'
        })
        $('.menu').css({
            'transform':'translateX(0%)',
            'width':'240px'
        })
        $('main').css({
            'width':'960px'
        })
        $('.list i').css({
            'transform':'translateX(0%) scale(1)',
        })
        close = false
    }else{
        
        $('.menu').css({
            'transform':'translateX(-76%)',
            'width':'300px'
        })
        setTimeout(() => {
            $('.MenuClose').css({
                'left':'14.5rem',
                
            })
            $('.MenuClose i').css({
                'rotate':'0deg'
            })
            $('.list i').css({
                'transform':'translateX(760%) scale(1.5)',
            })
        }, 150);
        $('main').css({
            'width':'1130px'
        })
        close = true
    }

});

$('.list i').hover(function (e) {
    if(close){
        $('#h'+$(e.target).attr('data-num')).css({
            'opacity':'1'
        })
    }
        
    }, function (e) {
        if(close){
            $('#h'+$(e.target).attr('data-num')).css({
                'opacity':'0'
            })
        }
        
    }
);

$('.backToSfI').click(function (e) { 
    $('#SfItabNotes').html('');
    $('#SfItabFines').html('');
    $('.FCitizenInfo').fadeOut(300);
    setTimeout(() => {
        $('#SFCFjd2').fadeIn();
    }, 250);
});

$('.backToScI').click(function (e) { 
    $('#ScItabNotes').html('');
    $('#ScItabFines').html('');
    $('.CitizenInfo').fadeOut(300);
    setTimeout(() => {
        $('#SFCJD1').fadeIn();
    }, 250);
});

$('.backToCar').click(function (e) { 
    $('.CarInfo').fadeOut(300);
    setTimeout(() => {
        $('.SearchForVehicle').fadeIn();
    }, 250);
});

$('.backToSDI').click(function (e) { 
    $('.DCitizenInfo').fadeOut(300);
    setTimeout(() => {
        $('#GIVEDICTSEARCH').fadeIn();
    }, 250);
});


$('.cloaseNoteA').click(function (e) { 
    $('.SendNoteC').fadeOut()
});
$('.addNote').click(function (e) { 
    $('.SendNoteC').fadeIn()
});

window.addEventListener("message", function (event) {
    var lexu = event.data
    switch (lexu.action) {
            
            case"openTablet":
            setTimeout(function(){ 
                $('html,body').fadeIn(0);
                $(".tablet-screen").fadeIn();
                setTimeout(function(){
                    $(".tablet-screen").css("transform", "translate(-50%, -50%) scale(0.7)");
                    $(".tablet-screen").animate({
                        top: "50%"
                    }, 450, function() {
                        $(".tablet-screen").css("transform", "translate(-50%, -50%) scale(1.0)");
                        setTimeout(function(){
                            $(".tablet-main").fadeIn(500);
                            $('.name').html(lexu.data.firstname +' '+lexu.data.lastname )
                         
                            $('.grade').html(lexu.data.job.grade_label)
                        }, 350)
                    });
                }, 250);
            });
        break;
        case "updateData": 
            if(lexu.user != false){
                $('#SFCJD1').fadeOut(350);
                $('#Cname').html(lexu.user.firstname);
                $('#CsName').html(lexu.user.lastname);
                $('#CDate').html(lexu.user.data);
                $('#cWork').html(lexu.user.job);
                if(lexu.playerData.job.grade > 4){
                    $('.GiveWeaponAllow').fadeIn()
                    if(lexu.user.weapon_allow){
                        $('#CweaponAllow').html('posiada');
                        $('.GiveWeaponAllow').html('Usuń Licencje');
                        $('.GiveWeaponAllow').attr('MenageLicense', 'remove');
                        
                    }else{
                        $('#CweaponAllow').html('brak');
                        $('.GiveWeaponAllow').html('Nadaj Licencje');
                        $('.GiveWeaponAllow').attr('MenageLicense', 'add');
                    }
                }else{
                    $('.GiveWeaponAllow').fadeOut()
                }
                if(lexu.notes != 0){ 
                   
                    if(Array.isArray(lexu.notes)){
                        for(let i in lexu.notes){

                            $('#ScItabNotes').append(`
                            <tr>
                                <td>${lexu.notes[i].notefrom}</td>
                                <td>${lexu.notes[i].note}</td>
                                <td>${lexu.notes[i].data}</td>
                            </tr>`);
                        } 
                    }else{
                        $('#ScItabNotes').append(`
                        <tr>
                            <td>${lexu.notes.notefrom}</td>
                            <td>${lexu.notes.note}</td>
                            <td>${lexu.notes.data}</td>
                        </tr>`);
                    }
                     
                    
                }else{
                    $('#ScItabNotes').append(`
                    <tr>
                        <td>brak</td>
                        <td>brak</td>
                        <td>brak</td>
                    </tr>`);
                }
                if(lexu.fine != 0){
                    if(Array.isArray(lexu.fine)){
                        for(let i in lexu.fine){
                            $('#ScItabFines').append(`
                            <tr>
                                <td>${lexu.fine[i].finefrom}</td>
                                <td>${lexu.fine[i].fine_note}</td>
                                <td>${lexu.fine[i].fine}$</td>
                                <td>${lexu.fine[i].jailtime}</td>
                                <td>${lexu.fine[i].data}</td>
                            </tr>
                            `);
                        }
                    }else{
                        $('#ScItabFines').append(`
                            <tr>
                                <td>${lexu.fine.finefrom}</td>
                                <td>${lexu.fine.fine_note}</td>
                                <td>${lexu.fine.fine}</td>
                                <td>${lexu.fine.jailtime}</td>
                                <td>${lexu.fine.data}</td>
                            </tr>
                            `);
                    }
                }else{
                    $('#ScItabFines').append(`
                    <tr>
                    <td>brak</td>
                    <td>brak</td>
                    <td>brak</td>
                    <td>brak</td>
                    <td>brak</td>
                </tr>`);}
                setTimeout(() => {
                    $('.CitizenInfo').fadeIn();
                }, 350);
            }else{
                $('#jd1D').html(`<span style="color:red;">Niepoprawne Dane spróbuj ponownie</span>`)
            }
        break;

        case "updateDataF": 
         
            if(lexu.user != false){
                $('#SFCFjd2').fadeOut(350);
                $('#Fname').html(lexu.user.firstname);
                $('#FsName').html(lexu.user.lastname);
                $('#FDate').html(lexu.user.dateofbirth);
                $('#FWork').html(lexu.user.job);
       
                if(lexu.user.weapon_allow){
                    $('#FweaponAllow').html('posiada');      
                }else{
                    $('#FweaponAllow').html('brak');
                }
                setTimeout(() => {
                    $('.FCitizenInfo').fadeIn();
                }, 350);
            }else{
                $('#jd2D').html(`<span style="color:red;">Niepoprawne Dane spróbuj ponownie</span>`)
            }
        break;

        case "noteEnd":
            $('.SendNoteC').fadeOut(250)
            $('.CitizenInfo').fadeOut(250);
            setTimeout(() => {
                $('#SFCJD1').fadeIn(250);
            }, 270);
        break;
        
        case "UpdateCar":
            if(lexu.car != false){
                
                $('.SearchForVehicle').fadeOut(250);
                setTimeout(() => {
                    $('.CarInfo').fadeIn(250);
                }, 250);
                $('#Carname').html(`${lexu.user.firstname} ${lexu.user.lastname}`);
                $('#Carohunt').html(lexu.user.ishunt);
                $('#PojazdN').html(lexu.label);
                $('#Carchunt').html(lexu.car.ishunt);
                $("#carEZimg").attr("src",`https://cfx-nui-frp_cardealer/imgs/${lexu.label}.png`)
            }else{
                $('#carerror').html(`<span style="color:red;">Niepoprawne Dane spróbuj ponownie</span>`)
            }  
        break;
        case "updateDataD": 
         
            if(lexu.user != false){
                $('#GIVEDICTSEARCH').fadeOut(350);
                $('#Dname').html(lexu.user.firstname);
                $('#DsName').html(lexu.user.lastname);
                $('#DDate').html(lexu.user.dateofbirth);
                $('#DWork').html(lexu.user.job);
                if(lexu.user.weapon_allow){
                    $('#DeaponAllow').html('posiada');      
                }else{
                    $('#DeaponAllow').html('brak');
                }
                setTimeout(() => {
                    $('.DCitizenInfo').fadeIn();
                }, 350);
            }else{
                $('#dicterror').html(`<span style="color:red;">Niepoprawne Dane spróbuj ponownie</span>`)
            }
        break;
    }

});
document.onkeyup = function (data) {
    
    if (data.which == 27 ) {
        
        $(".tablet-main").fadeOut(500);
        setTimeout(function(){
            $(".tablet-screen").css("transform", "translate(-50%, -50%) scale(0.7)");
            setTimeout(function(){
                $(".tablet-screen").animate({
                    top: "1400px"
                }, 450, function() {
                    $(".tablet-screen").fadeOut();
                });
            }, 250);
            $('.list .item').css({
                'color':"rgb(210, 210, 210)"
            })
            $('#kurwawwawa').css({
                'color':"rgb(63, 110, 240)"
            })
            $('#ScItabNotes').html('');
            $('#ScItabFines').html('');
            $('.MainPage').fadeIn(0);
            $('.CitizenBase').fadeOut(0);
            $('.VehiclesBase').fadeOut(0);
            $('.GiveFine').fadeOut(0);
            $('.SetVerdict').fadeOut(0);
            $('.CitizenInfo').fadeOut(0);
            $('.SetVerdict').fadeOut(0);
            $('.SetVerdict').fadeOut(0); 
            $('#SFCJD1').fadeIn();
            $.post('https://frp_policetablet/NUIFocusOff', JSON.stringify({}));
        }, 250)
    }
};



const ChangeWindow = function (e,a) {
    $('.list .item').css({
        'color':"rgb(210, 210, 210)"
    })

    $('.MainPage').fadeOut(200);
    $('.CitizenBase').fadeOut(200);
    $('.VehiclesBase').fadeOut(200);
    $('.GiveFine').fadeOut(200);
    $('.SetVerdict').fadeOut(200);
    setTimeout(() => {
        $(e).fadeIn(200);
    }, 200);
    $(a).css({
        'color':"rgb(63, 110, 240)"
    })
}


const SendDataSsn = function (ssn,type) { 
    if(ssn.length != 0){
        JSssn = ssn
        $.post('https://frp_policetablet/Getdata', JSON.stringify({ssn:ssn,type:type}));
    }else{
        $('#jd1D').html(`<span style="color:red;">Niepoprawne Dane spróbuj ponownie</span>`)
    }
};
const SendNote = function (note) { 
    if(note.length != 0 ){
        $.post('https://frp_policetablet/SendNote', JSON.stringify({note:note}));
    }
};
const GiveFine = function (fine,price) { 
    if(fine.length != 0 && price != 0 ){
        $.post('https://frp_policetablet/GiveFine', JSON.stringify({fine:fine,price:price}));
    }
};
const SendDataSsnF = function (ssn,type) { 
    if(ssn.length != 0){
        JSssn = ssn
        $.post('https://frp_policetablet/GetdataF', JSON.stringify({ssn:ssn,type:type}));
    }else{
        $('#jd2D').html(`<span style="color:red;">Niepoprawne Dane spróbuj ponownie</span>`)
    }
};
const SearchForCar = function (plate) { 
    if(plate.length != 0){
        let uplate = plate.toUpperCase()
        JSpalte = plate.toUpperCase()
        $.post('https://frp_policetablet/GetCar', JSON.stringify({plate:uplate}));
    }else{
        $('#carerror').html(`<span style="color:red;">Niepoprawne Dane spróbuj ponownie</span>`)
    }
};
const SendDataSsnD = function (ssn) { 
    if(ssn.length != 0){
        JSssn = ssn
        $.post('https://frp_policetablet/GetdataD', JSON.stringify({ssn:ssn}));
    }else{
        $('#dicterror').html(`<span style="color:red;">Niepoprawne Dane spróbuj ponownie</span>`)
    }
};
const GiveDict = function (Dict,months,price) { 
    if(Dict.length != 0 && price != 0  && months != 0){
        $.post('https://frp_policetablet/GiveDict', JSON.stringify({fine:Dict,jailtime:months,price:price}));
    }
};

const HuntCar = function (e) { 
    let action = $(e).attr('MenageCarLicense')
    $.post('https://frp_policetablet/AddWAllow', JSON.stringify({action:action,plate:JSpalte}));
};

const addWlicense = function(e) {
    let action = $(e).attr('MenageLicense')
    $.post('https://frp_policetablet/AddWAllow', JSON.stringify({action:action,ssn:JSssn}));
}

