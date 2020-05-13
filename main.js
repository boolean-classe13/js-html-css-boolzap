// intercetto il click sull'icona di destra
$('.right-footer-icon').click(invia_messaggio);

// intercetto l'input digitato dall'utente nel campo di input del messaggio
$('.new-message-inputs').keypress(function(event) {
    // verifico se l'utente ha digitato "ENTER"
    if(event.which == 13) { // il tasto "ENTER" è mappato con il numero 13
        invia_messaggio();
    }
});

// intercetto il focus nell'input del messaggio
$('.new-message-inputs').focus(function() {
    // tolgo la classe "fa-microphone" dall'icona di destra
    // aggiungo la classe "fa-paper-plane"
    // $('.right-footer-icon i').removeClass('fa-microphone').addClass('fa-paper-plane');
    // posso usare toggleClass per aggiungere e togliere le classi in modo compatto
    $('.right-footer-icon i').toggleClass('fa-microphone fa-paper-plane');
});

// intercetto la perdita di focus dall'input del messaggio
$('.new-message-inputs').blur(function() {
    // aggiungo la classe "fa-microphone" dall'icona di destra
    // tolgo la classe "fa-paper-plane"
    // $('.right-footer-icon i').removeClass('fa-paper-plane').addClass('fa-microphone');
    // posso usare toggleClass per aggiungere e togliere le classi in modo compatto
    $('.right-footer-icon i').toggleClass('fa-paper-plane fa-microphone');
});

// intercetto la digitazione nell'input della ricerca
$('#contacts-filter').keyup(function() {
    // recupero il testo contenuto nell'input di ricerca
    var testo_ricerca = $('#contacts-filter').val().trim().toLowerCase();
    // console.log('testo cercato: ' + testo_ricerca);
    // verifico se il testo di ricerca non è vuoto
    if(testo_ricerca != '') {
        // il testo ricercato non è vuoto => applico la ricerca e filtro i contatti
        // per ogni contatto, verifico se il nome corrisponde al testo cercato
        $('.contact').each(function() {
            // recupero il nome di questo contatto
            var nome_contatto = $(this).find('.contact-name').text().toLowerCase();
            // console.log(nome_contatto);
            // verifico se il testo cercato è contenuto all'interno del nome del contatto
            if(nome_contatto.includes(testo_ricerca)) {
                // ho trovato una corrispondenza => visualizzo il contatto
                $(this).show();
                // console.log('corrisponde');
            } else {
                // non c'è alcuna corrispondeza => nascondo il contatto
                $(this).hide();
                // console.log('non corrisponde');
            }
        });
    } else {
        // il testo ricercato è vuoto => non applico alcun filtro
        // visualizzo tutti i contatti
        $('.contact').show();
    }
});

// funzione per inviare un nuovo messaggio
function invia_messaggio() {
    // recupero il testo inserito dall'utente nell'input
    var testo_utente = $('.new-message-inputs').val();
    // verifico che il testo digitato non sia vuoto (o che non contenga solo " ")
    if(testo_utente.trim() != '') {
        // faccio una copia del template per creare un nuovo messaggio
        var nuovo_messaggio = $('.template .message').clone();
        // aggiungo la classe "sent" al messaggio
        nuovo_messaggio.addClass('sent');
        // inserisco il testo dell'utente nello span "message-text"
        nuovo_messaggio.children('.message-text').text(testo_utente);
        // inserisco il nuovo messaggio nel contenitore di tutti i messaggi della conversazione
        $('.right-messages.active').append(nuovo_messaggio);
        // resetto l'input
        $('.new-message-inputs').val('');
        // risposta del pc
        // imposto un timeout di 1s e poi ci sarà la risposta del pc
        setTimeout(risposta_pc, 1000);
    }
}

// funzione per aggiungere alla conversazione la risposta del pc
function risposta_pc() {
    // faccio una copia del template per creare un nuovo messaggio
    var nuovo_messaggio_pc = $('.template .message').clone();
    // aggiungo la classe "received" al messaggio
    nuovo_messaggio_pc.addClass('received');
    // inserisco il testo "ok" nello span "message-text"
    nuovo_messaggio_pc.children('.message-text').text('ok');
    // inserisco il nuovo messaggio nel contenitore di tutti i messaggi della conversazione
    $('.right-messages.active').append(nuovo_messaggio_pc);
}
