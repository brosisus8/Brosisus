// Function to display the chosen section
function showSection(section) {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('locataire-section').classList.add('hidden');
    document.getElementById('proprietaire-section').classList.add('hidden');
    document.getElementById('messagerie-section').classList.add('hidden');
    
    // Display only the selected section
    document.getElementById(`${section}-section`).classList.remove('hidden');
}

// Function to return to previous page
function goBack() {
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('locataire-section').classList.add('hidden');
    document.getElementById('proprietaire-section').classList.add('hidden');
    document.getElementById('messagerie-section').classList.add('hidden');
}

function receiveResponses(responses) {
    const reponsesList = document.getElementById('reponses-list');
    reponsesList.innerHTML = ''; // Clear previous responses
    responses.slice(0, 10).forEach(response => {
        const li = document.createElement('li');
        li.textContent = response;
        reponsesList.appendChild(li);
    });
    document.getElementById('reponses').classList.remove('hidden');
}

// Site sharing function
function shareSite() {
    alert("Share this Platform's link with 50 people to get 10% refund after room acquisition. Option 2: Share the site to benefit from 20% discount!");
}




// Traductions pour chaque langue
const translations = {
    en: {
        header: "Brosisus",
        description: "Your platform for housing and anonymous messaging",
        trust: "Already trusted by over 10,000 users!",
        chooseOption: "Choose an option",
        searchHousing: "I am looking for housing",
        publishHousing: "I want to publish housing",
        anonymousMessaging: "Anonymous Messaging",
        share: "Share the site",
        shareInfo: "If you share the site with 100 people, 50% of your payment will be refunded after room acquisition.",
        submitRequest: "Submit the request",
        back: "Back",
        paymentProof: "Upload your proof of payment",
        paymentOptions: "Payment Options",
        footer: "The information provided is used to connect potential landlords and tenants. Terms and privacy policy apply.",
        modeNormal: "Normal Mode (€50, 30-day delay)",
        modeExpress: "Express Mode (€299, 1-week delay)"
    },
    fr: {
        header: "Brosisus",
        description: "Votre plateforme de logement et de messagerie anonyme",
        trust: "Déjà plus de 10 000 utilisateurs nous font confiance !",
        chooseOption: "Choisissez une option",
        searchHousing: "Je cherche un logement",
        publishHousing: "Je veux publier un logement",
        anonymousMessaging: "Messagerie Anonyme",
        share: "Partager le site",
        shareInfo: "Si vous partagez le site avec 50 personnes, 10 % de votre paiement vous sera remboursé après acquisition de la chambre.",
        shareInfo: "Si vous partagez le site avec 50 personnes, 10 % de votre paiement vous sera remboursé après acquisition de la chambre.",
        submitRequest: "Soumettre la demande",
        back: "Retour",
        paymentProof: "Téléchargez votre preuve de paiement",
        paymentOptions: "Modes de paiement",
        footer: "Les informations fournies sont utilisées pour mettre en relation propriétaires et locataires potentiels. Conditions générales et politique de confidentialité appliquées.",
        modeNormal: "Mode Normal (50 €, délai de 30 jours)",
        modeExpress: "Mode Express (299 €, délai de 1 semaine)"
    },
    de: {
        header: "Brosisus",
        description: "Ihre Plattform für Wohnen und anonyme Nachrichten",
        trust: "Bereits von über 10.000 Nutzern vertraut!",
        chooseOption: "Wählen Sie eine Option",
        searchHousing: "Ich suche eine Unterkunft",
        publishHousing: "Ich möchte eine Unterkunft veröffentlichen",
        anonymousMessaging: "Anonyme Nachrichten",
        share: "Teilen Sie die Website",
        shareInfo: "Wenn Sie die Website mit 50 Personen teilen, wird Ihnen 50% Ihrer Zahlung nach Zimmererwerb zurückerstattet.",
        shareInfo: "Wenn Sie die Website mit 500 Personen teilen, wird Ihnen 90% Ihrer Zahlung nach Zimmererwerb zurückerstattet.",
        submitRequest: "Anfrage einreichen",
        back: "Zurück",
        paymentProof: "Laden Sie Ihren Zahlungsnachweis hoch",
        paymentOptions: "Zahlungsmöglichkeiten",
        footer: "Die angegebenen Informationen werden verwendet, um potenzielle Vermieter und Mieter zu verbinden. Es gelten die allgemeinen Geschäftsbedingungen und Datenschutzrichtlinien.",
        modeNormal: "Normaler Modus (50 €, 30 Tage Verzögerung)",
        modeExpress: "Express-Modus (299 €, 1 Woche Verzögerung)"
    },
    es: {
        header: "Brosisus",
        description: "Tu plataforma de alojamiento y mensajería anónima",
        trust: "¡Ya confiado por más de 10,000 usuarios!",
        chooseOption: "Elige una opción",
        searchHousing: "Estoy buscando alojamiento",
        publishHousing: "Quiero publicar alojamiento",
        anonymousMessaging: "Mensajería anónima",
        share: "Compartir el sitio",
        shareInfo: "Si compartes el sitio con 100 personas, el 50% de tu pago será reembolsado después de la adquisición de la habitación.",
        submitRequest: "Enviar solicitud",
        back: "Atrás",
        paymentProof: "Sube tu comprobante de pago",
        paymentOptions: "Opciones de pago",
        footer: "La información proporcionada se utiliza para conectar a posibles propietarios e inquilinos. Se aplican términos y política de privacidad.",
        modeNormal: "Modo Normal (50 €, plazo de 30 días)",
        modeExpress: "Modo Express (299 €, plazo de 1 semana)"
    }
};

// Fonction pour changer la langue
function changeLanguage() {
    const selectedLang = document.getElementById("language-selector").value;
    const lang = translations[selectedLang];

    // Met à jour le texte pour chaque élément
    document.querySelector("header h1").textContent = lang.header;
    document.querySelector("header p:nth-of-type(1)").textContent = lang.description;
    document.querySelector("header p.red-text").textContent = lang.trust;
    document.querySelector("#home h2").textContent = lang.chooseOption;
    document.querySelector("#home button:nth-of-type(1)").textContent = lang.searchHousing;
    document.querySelector("#home button:nth-of-type(2)").textContent = lang.publishHousing;
    document.querySelector("#home button:nth-of-type(3)").textContent = lang.anonymousMessaging;
    document.querySelector("#home .share-button").textContent = lang.share;
    document.querySelector("#home .message-info").textContent = lang.shareInfo;

    document.querySelector("#locataire-section h2").textContent = lang.submitRequest;
    document.querySelector("#locataire-section label[for='proof']").textContent = lang.paymentProof;
    document.querySelectorAll("#locataire-section label span")[0].textContent = lang.modeNormal;
    document.querySelectorAll("#locataire-section label span")[1].textContent = lang.modeExpress;
    document.querySelector("#locataire-section p.red-text").textContent = lang.paymentOptions;
    
    document.querySelector("footer p").textContent = lang.footer;
}

// Initialisation de la langue par défaut
changeLanguage();



