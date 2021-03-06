var html_template = $('#message-template').html();
var template_function = Handlebars.compile(html_template);

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

// intercetto il click su un contatto
$('.contact').click(function() {

    // tolgo la classe active a tutti i div .contact
    $('.contact').removeClass('active');
    // aggiungo la classe active al contatto su cui ho cliccato
    $(this).addClass('active');

    // recupero il valore dell'attributo data-chat del contatto su cui ho cliccato
    // var chat = $(this).data('chat');
    var chat = $(this).attr('data-chat');
    // console.log('data-chat letto dal contatto :' + chat);

    // tolgo la classe active a tutti i div right-messages per nascondere tutti i pannelli delle chat
    $('.right-messages').removeClass('active');
    // recupero il div right-messages che ha lo stesso attributo data-chat del contatto su cui ho cliccato e ci assegno la classe active
    $('.right-messages[data-chat="' + chat + '"]').addClass('active');

    // recupero il nome del contatto su cui ho cliccato
    var nome_contatto = $(this).find('.contact-name').text();
    // console.log(nome_contatto);
    // inserisco il nome del contatto nella parte di intestazione di destra
    $('#header-right-contact-name').text(nome_contatto);

    // recupero il percorso del file dell'immagine del contatto su cui ho cliccato
    var src_contatto = $(this).find('.contact-logo img').attr('src');
    // console.log(src_contatto);
    // imposto il percorso del file dell'immagine nella parte di intestazione di destra
    $('.header-right-logo img').attr('src', src_contatto);

});

// intercetto il click sull'icona del dropdown del messaggio
$('.right-messages').on('click', '.message-options', function(){
    // visualizzo il div "message-options-panel" corrispondente al messaggio su cui ho cliccato e aggiungo la classe "z-index-100" per far sì che il pannellino sia sempre visibile
    $(this).siblings('.message-options-panel').toggleClass('active z-index-100');
});

// quando esco con il mouse da un messaggio, chiudo un eventuale pannello di opzioni aperto
$('.right-messages').on('mouseleave', '.message', function() {
    // tolgo la classe active e z-index-100 al pannello delle opzioni di questo messaggio
    $('.message-options-panel.active').removeClass('active z-index-100');
});

// intercetto il click sulla voce "cancella messaggio"
$('.right-messages').on('click', '.message-destroy', function(){
    // $(this).parent().siblings('.message-text').text('messaggio eliminato!');
    // cancello il messaggio corrispondente
    $(this).closest('.message').remove();
});

// funzione per inviare un nuovo messaggio
function invia_messaggio() {
    // recupero il testo inserito dall'utente nell'input
    var testo_utente = $('.new-message-inputs').val();
    // verifico che il testo digitato non sia vuoto (o che non contenga solo " ")
    if(testo_utente.trim() != '') {
        // creo un oggetto che contiene i dati con cui compilare i template
        var placeholder = {
            'classe': 'sent',
            'messaggio': testo_utente
        };
        var nuovo_messaggio = template_function(placeholder);

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
    // creo un oggetto che contiene i dati con cui compilare i template
    var placeholder_pc = {
        'classe': 'received',
        'messaggio': 'ok'
    };
    var nuovo_messaggio_pc = template_function(placeholder_pc);
    // inserisco il nuovo messaggio nel contenitore di tutti i messaggi della conversazione
    $('.right-messages.active').append(nuovo_messaggio_pc);
}
