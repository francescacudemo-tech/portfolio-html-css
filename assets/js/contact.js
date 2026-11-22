// Invio del form di contatto.
// - Se configuri EmailJS (https://www.emailjs.com) l'invio avviene direttamente dal sito.
// - Altrimenti il form apre il client di posta con il messaggio già compilato.
// L'indirizzo email NON compare mai nell'HTML: viene ricostruito qui solo al momento dell'invio.
(function () {
  'use strict';

  var EMAILJS = {
    publicKey: 'YOUR_PUBLIC_KEY',
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID'
  };

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (!form) { return; }

  function setStatus(text, state) {
    status.textContent = text;
    status.setAttribute('data-state', state || '');
  }

  function recipient() {
    return atob('ZnJhbmNlc2NhLmN1ZGVtb0BpY2xvdWQuY29t');
  }

  var emailjsReady = window.emailjs && EMAILJS.publicKey.indexOf('YOUR_') !== 0;
  if (emailjsReady) { window.emailjs.init({ publicKey: EMAILJS.publicKey }); }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Honeypot: se è compilato è un bot, fingiamo che sia andato tutto bene.
    if (form.elements.website.value) { return; }

    // Validazione nativa HTML (required, type="email")
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (emailjsReady) {
      setStatus('Invio in corso…');
      window.emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, form).then(
        function () {
          form.reset();
          setStatus('Grazie! Messaggio inviato, ti rispondo presto.', 'ok');
        },
        function () {
          setStatus('Qualcosa è andato storto. Riprova tra poco o scrivimi su LinkedIn.', 'error');
        }
      );
      return;
    }

    // Fallback senza servizio esterno: apre il programma di posta
    var subject = encodeURIComponent(form.elements.subject.value + ' (dal portfolio)');
    var body = encodeURIComponent(
      form.elements.message.value + '\n\n' + form.elements.from_name.value + '\n' + form.elements.reply_to.value
    );
    setStatus('Sto aprendo il tuo programma di posta…', 'ok');
    window.location.href = 'mailto:' + recipient() + '?subject=' + subject + '&body=' + body;
  });
})();
