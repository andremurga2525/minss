// State
const validPasswords = ['bobo', 'boba'];
let answeredQuestions = {
    1: false,
    2: false,
    3: false
};

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeButton();
}

function updateDarkModeButton() {
    const button = document.querySelector('.dark-mode-toggle');
    if (document.body.classList.contains('dark-mode')) {
        button.textContent = '◑';
    } else {
        button.textContent = '◐';
    }
}

// Initialize dark mode from localStorage
function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeButton();
}

// Letters data
const letters = {
    1: {
        title: "Nuestro Primer Momento 💕",
        content: `Amor,<br><br>
Hay recuerdos que no se olvidan porque no solo pasaron…<br>
se sintieron.<br><br>

Ese primer día no fue perfecto,<br>
fue real, intenso y nuestro.<br>
Me acuerdo de tus manos, de tu mirada,<br>
de ese beso que diste sin pensarlo dos veces<br>
y que a mí me dejó claro que algo fuerte estaba por venir.<br><br>

No fue solo el momento,<br>
fue la conexión, la confianza, la forma en la que todo fluyó<br>
como si ya nos conociéramos de antes.<br><br>

Ese día no empezó una historia bonita…<br>
empezó NUESTRA historia.<br>
Y por eso la valoro tantoooo 💕`
    },
    2: {
        title: '"Te Amo" 💭',
        content: `Amor,<br><br>
Nunca voy a olvidar ese momento.<br>
No fue un lugar especial para el mundo,<br>
pero lo fue para mí.<br><br>

Estábamos ahí, sin escenario, sin discursos,<br>
solo tú y yo… y esas dos palabras que no se dicen a cualquiera.<br><br>

Cuando me dijiste "te amo" no sonó a algo vacio,<br>
sonó a verdad.<br>
A algo que nació sin presión, sin miedo,<br>
simplemente porque lo sentías.<br><br>

Desde ese día entendí que lo nuestro no era un juego,<br>
que había sentimientos reales de por medio,<br>
y que eso se cuida.<br><br>

Gracias por decirlo primero.<br>
Gracias por sentirlo de verdad 💕`
    },
    3: {
        title: "Tu Respuesta del Corazón 💌",
        content: null // Will be set dynamically
    }
};

const supportLetters = {
    bajoneada: {
        title: "🌤️ Para cuando te sientas bajoneada",
        content: `Amor,<br><br>
no pasa nada si hoy no te sientes al cien.<br>
No tienes que ser fuerte todo el tiempo ni sonreír por compromiso.<br>
Hay días en los que el mundo pesa un poco más y ya. Eso también es vivir.<br><br>

Quiero que recuerdes algo simple pero importante:<br>
no estás fallando, no estás atrasada, no estás perdiendo nada.<br>
Solo estás teniendo un día humano.<br><br>

Respira.<br>
Hazlo despacio.<br>
Mañana no depende de cómo te sientas hoy.<br><br>

Y si ahora mismo no tienes energía para todo…<br>
está bien, con que existas es suficiente.<br>
Yo creo en ti incluso en los días en los que tú dudas. 💕`
    },
    triste: {
        title: "🌧️ Para cuando estés triste",
        content: `Amor,<br><br>
si estás leyendo esto es porque algo te tocó el corazón.<br>
Y quiero que sepas que no tienes que cargarlo sola.<br><br>

Puedes llorar, puedes sentirte frágil,<br>
puedes no tener respuestas.<br>
Eso no te hace débil, te hace real.<br><br>

Si pudiera, te abrazaría sin decir nada,<br>
porque a veces no hacen falta palabras,<br>
solo sentir que alguien se queda.<br><br>

Esto va a pasar.<br>
No porque yo lo diga,<br>
sino porque tú ya has salido adelante antes, incluso cuando no lo notaste.<br><br>

Estoy contigo, incluso cuando el día se ve gris.<br>
No te dejaré sola 💕`
    },
    muyTriste: {
        title: "🌑 Para cuando estés muy triste",
        content: `Amor,<br><br>
si llegaste hasta aquí es porque estás pasando por un momento duro de verdad.<br>
Y quiero decirte algo con toda la claridad del mundo:<br>
lo que sientes importa.<br><br>

No minimices tu dolor.<br>
No te digas "debería estar bien".<br>
No te exijas cuando lo único que necesitas es descansar del mundo un rato.<br><br>

Esto no define quién eres.<br>
Este momento no es tu final, es solo una parte del camino.<br><br>

Aun en tu peor día, sigues siendo valiosa,<br>
sigues siendo amada,<br>
sigues siendo alguien por quien vale la pena quedarse.<br><br>

Si ahora no puedes con todo…<br>
apóyate en mí.<br>
Yo puedo sostener un poco mientras respiras. 💕`
    },
    extraño: {
        title: "💭 Cuando me extrañas",
        content: `Amor,<br><br>
si estás aquí es porque me estás sintiendo lejos…<br>
pero quiero que recuerdes algo: la distancia no borra lo que es real.<br><br>

Cada foto es una prueba de que lo nuestro existe,<br>
de que nos elegimos,<br>
de que hemos sido felices juntos y lo seguiremos siendo.<br><br>

No importa si ahora no estoy físicamente contigo,<br>
estoy en tu memoria, en tu sonrisa,<br>
en cada momento que compartimos.<br><br>

Extrañar también es una forma de amar.<br>
Y yo te extraño también, incluso cuando no lo digo. 💕`,
        hasPhotos: true
    },
    noPuedoMas: {
        title: "🆘 Cuando sientas que no puedes más",
        content: `Amor,<br><br>
si estás leyendo esto, para un momento.<br>
No tomes decisiones desde el cansancio ni desde el dolor.<br><br>

No estás sola.<br>
Aunque tu cabeza diga lo contrario, no es verdad.<br><br>

Este momento no te define,<br>
no resume tu vida,<br>
no borra todo lo bueno que eres y todo lo que aún falta por vivir.<br><br>

Has aguantado más de lo que crees.<br>
Has sido fuerte incluso sin darte cuenta.<br><br>

Si ahora sientes que no puedes más,<br>
no es porque seas débil,<br>
es porque has cargado demasiado.<br><br>

Descansa.<br>
Respira.<br>
Y recuerda: pedir apoyo no es rendirse.<br><br>

Yo estoy aquí.<br>
Y aunque ahora no lo veas,<br>
esto también va a pasar 💕`
    }
};

// Password check
function checkPassword() {
    const input = document.getElementById('passwordInput').value.toLowerCase();
    const errorMsg = document.getElementById('errorMsg');

    if (validPasswords.includes(input)) {
        errorMsg.textContent = '';
        showScreen('homeScreen');
    } else {
        errorMsg.textContent = 'Sí que eres boba, inténtalo de nuevo 😏';
        document.getElementById('passwordInput').value = '';
        document.getElementById('passwordInput').focus();
    }
}

// Allow Enter key on password input
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('passwordInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    // Enter key for question 3
    const q3Input = document.getElementById('q3Input');
    if (q3Input) {
        q3Input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                submitQuestion(3);
            }
        });
    }
});

// Screen navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function goToQuestions() {
    showScreen('questionsScreen');
}

function goToStory() {
    showScreen('storyScreen');
}

function goToSupport() {
    showScreen('supportScreen');
}

function backToHome() {
    showScreen('homeScreen');
}

function backToQuestions() {
    showScreen('questionsScreen');
}

function backToSupport() {
    showScreen('supportScreen');
}

function logout() {
    document.getElementById('passwordInput').value = '';
    answeredQuestions = { 1: false, 2: false, 3: false };
    document.getElementById('q3Input').value = '';
    
    // Reset question cards
    resetQuestionCards();
    
    showScreen('loginScreen');
    document.getElementById('passwordInput').focus();
}

function resetQuestionCards() {
    // Reset Q1
    document.querySelectorAll('input[name="q1"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Reset Q2
    document.querySelectorAll('input[name="q2"]').forEach(radio => {
        radio.checked = false;
        radio.disabled = true;
    });
    document.getElementById('question2').classList.add('locked');
    document.querySelector('button[onclick="submitQuestion(2)"]').disabled = true;
    
    // Reset Q3
    document.getElementById('q3Input').value = '';
    document.getElementById('q3Input').disabled = true;
    document.getElementById('question3').classList.add('locked');
    document.querySelector('button[onclick="submitQuestion(3)"]').disabled = true;
}

// Question submission
function submitQuestion(questionNum) {
    let isCorrect = false;

    if (questionNum === 1) {
        const selected = document.querySelector('input[name="q1"]:checked');
        if (selected && selected.value === 'correct') {
            isCorrect = true;
        }
    } else if (questionNum === 2) {
        const selected = document.querySelector('input[name="q2"]:checked');
        if (selected && selected.value === 'correct') {
            isCorrect = true;
        }
    } else if (questionNum === 3) {
        const textValue = document.getElementById('q3Input').value.trim();
        if (textValue.length > 0) {
            isCorrect = true;
            // Save the response for the letter
            supportLetters.extraño.userResponse = textValue;
        } else {
            alert('No tengas prisa… esto viene del corazón 💭');
            return;
        }
    }

    if (isCorrect) {
        answeredQuestions[questionNum] = true;
        showLetter(questionNum);
        unlockNextQuestion(questionNum);
    } else {
        alert('Esa no es la respuesta correcta... intenta de nuevo 💭');
    }
}

function showLetter(questionNum) {
    const letterData = letters[questionNum];
    const letterContent = document.getElementById('letterContent');
    
    if (questionNum === 3) {
        letterData.content = `Amor,<br><br>
Todo esto significa más de lo que imaginas.<br>
Porque amar no es solo sentir bonito,<br>
es tener miedo de perder… y aun así quedarse.<br><br>

Saber que en algún momento pensaste<br>
"no quiero que se vaya"<br>
me toca el corazón de una forma muy real.<br><br>

Este primer mes me enseñó que el amor no siempre llega despacio,<br>
a veces llega fuerte, sin pedir permiso,<br>
y te cambia los días, las prioridades y la forma de mirar el futuro.<br><br>

No sé qué nos espera,<br>
pero sí sé que lo que hemos construido hasta ahora<br>
vale la pena cuidarlo.<br><br>

Si algún día dudas, vuelve a este momento,<br>
a estas palabras,<br>
a este inicio tan nuestro.<br><br>

Yo estoy aquí.<br>
Y hoy, te elijo otra vez, y siempre lo haré 💕<br><br>
<strong>Lo que tú sentiste:</strong><br>
"${supportLetters.extraño.userResponse}"`;
    }
    
    letterContent.innerHTML = `
        <h2>${letterData.title}</h2>
        <p>${letterData.content}</p>
    `;
    
    showScreen('letterScreen');
}

function showSupport(type) {
    const letterData = supportLetters[type];
    const letterSupportContent = document.getElementById('letterSupportContent');
    
    let content = `<h2>${letterData.title}</h2>`;
    
    if (letterData.hasPhotos) {
        content += `
            <div class="support-content-wrapper">
                <div class="message-section">
                    <p>${letterData.content}</p>
                </div>
                <div class="photos-section">
                    <h3>Nuestros Momentos 📸</h3>
                    <div class="photos-grid" id="photosGrid">
                        <!-- Photos will be loaded here -->
                    </div>
                </div>
            </div>
        `;
    } else {
        content += `<p>${letterData.content}</p>`;
    }
    
    letterSupportContent.innerHTML = content;
    
    // Load photos if this is the "extraño" section
    if (type === 'extraño') {
        loadPhotos();
    }
    
    showScreen('letterSupportScreen');
}

function loadPhotos() {
    const photosGrid = document.getElementById('photosGrid');
    if (!photosGrid) return;
    
    // Try to load photos from photos folder
    const photoFolder = 'fotos/';
    // We'll create placeholder divs, user will add images manually
    
    // Check if photos folder exists by trying to load a few
    // For now, show a message
    photosGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #999;">
            <p>📸 Aquí irán nuestras fotos más bonitas</p>
            <p style="font-size: 12px;">Copia tus fotos a la carpeta "fotos" en la misma ubicación que esta página</p>
        </div>
    `;
    
    // Try to load images
    setTimeout(() => {
        loadPhotosFromFolder();
    }, 500);
}

function loadPhotosFromFolder() {
    const photosGrid = document.getElementById('photosGrid');
    if (!photosGrid) return;
    
    // Lista de fotos en la carpeta fotos
    const photoFiles = [
        'foto1.jpg',
        'foto2.jpg',
        'foto3.jpg',
        'foto4.jpg',
        'foto5.jpg'
    ];
    
    // Limpiar el placeholder
    photosGrid.innerHTML = '';
    
    // Crear elementos para cada foto
    photoFiles.forEach((photoName, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.style.animation = `slideUp 0.6s ease ${index * 0.1}s backwards`;
        
        const img = document.createElement('img');
        img.src = 'fotos/' + photoName;
        img.alt = 'Foto ' + (index + 1);
        img.onerror = function() {
            photoItem.innerHTML = '<div style="width: 100%; height: 200px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; color: #999;">📸</div>';
        };
        
        photoItem.appendChild(img);
        photosGrid.appendChild(photoItem);
    });
}

function unlockNextQuestion(questionNum) {
    if (questionNum === 1) {
        // Unlock question 2
        const q2Options = document.querySelectorAll('input[name="q2"]');
        q2Options.forEach(radio => radio.disabled = false);
        document.getElementById('question2').classList.remove('locked');
        document.querySelector('button[onclick="submitQuestion(2)"]').disabled = false;
        
        // Update lock icon
        document.getElementById('lock2').textContent = '🔓';
    } else if (questionNum === 2) {
        // Unlock question 3
        document.getElementById('q3Input').disabled = false;
        document.getElementById('question3').classList.remove('locked');
        document.querySelector('button[onclick="submitQuestion(3)"]').disabled = false;
        
        // Update lock icon
        document.getElementById('lock3').textContent = '🔓';
    }
}

// Story Book Navigation
let currentPage = 0;
let isAnimating = false;

// Create audio context for sound generation
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration, type = 'sine') {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

function playBookOpenSound() {
    // Sonido de apertura del libro (ascendente)
    playSound(220, 0.3);
    setTimeout(() => playSound(330, 0.3), 150);
    setTimeout(() => playSound(440, 0.3), 300);
}

function playPageFlipSound() {
    // Sonido de pasar página
    playSound(600, 0.15, 'triangle');
    setTimeout(() => playSound(800, 0.1, 'triangle'), 100);
}

function playBookCloseSound() {
    // Sonido de cierre del libro
    playSound(440, 0.3);
    setTimeout(() => playSound(330, 0.3), 150);
    setTimeout(() => playSound(220, 0.3), 300);
}

function openBook() {
    const storyBook = document.getElementById('storyBook');
    const storyControls = document.getElementById('storyControls');
    const storyCover = document.getElementById('storyCover');
    
    storyCover.style.display = 'none';
    storyBook.style.display = 'flex';
    storyControls.style.display = 'flex';
    
    // Agregar clase de animación
    storyBook.classList.add('opening');
    
    // Reproducir sonido de apertura
    setTimeout(() => playBookOpenSound(), 200);
    
    currentPage = 0;
    setTimeout(() => {
        showPage(currentPage);
    }, 600);
}

function showPage(pageNum) {
    // Hide all pages
    document.querySelectorAll('.page').forEach((page, index) => {
        page.classList.remove('active', 'prev');
        if (index < pageNum) {
            page.classList.add('prev');
        }
    });
    
    // Show current page
    const page = document.getElementById('page' + pageNum);
    if (page) {
        page.classList.add('active');
    }
    
    // Update page indicator
    const currentPageEl = document.getElementById('currentPage');
    if (currentPageEl) {
        currentPageEl.textContent = pageNum + 1;
    }
    
    // Update button states
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    
    if (prevBtn) prevBtn.disabled = pageNum === 0;
    if (nextBtn) nextBtn.disabled = pageNum === 10;
}

function nextPage() {
    if (currentPage < 10 && !isAnimating) {
        isAnimating = true;
        currentPage++;
        showPage(currentPage);
        setTimeout(() => { isAnimating = false; }, 800);
    }
}

function prevPage() {
    if (currentPage > 0 && !isAnimating) {
        isAnimating = true;
        currentPage--;
        showPage(currentPage);
        setTimeout(() => { isAnimating = false; }, 800);
    }
}

// Load initial focus
window.addEventListener('load', function() {
    initDarkMode();
    document.getElementById('passwordInput').focus();
});
