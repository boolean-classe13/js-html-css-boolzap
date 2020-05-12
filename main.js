// intercetto il click sull'icona di destra
$('.right-footer-icon').click(invia_messaggio);

// intercetto l'input digitato dall'utente nel campo di input del messaggio
$('.new-message-inputs').keypress(function(event) {
    // verifico se l'utente ha digitato "ENTER"
    if(event.which == 13) { // il tasto "ENTER" è mappato con il numero 13
        invia_messaggio();
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
    }
}
