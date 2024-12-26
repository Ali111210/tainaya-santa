document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nickname = document.getElementById('nickname').value;
    if (nickname) {
        const participant = document.createElement('div');
        participant.className = 'card';
        participant.textContent = nickname;
        document.getElementById('participants').appendChild(participant);
        document.getElementById('nickname').value = '';
    }
    updateDrawButton();
});

function updateDrawButton() {
    const participants = document.querySelectorAll('#participants .card');
    const drawButton = document.getElementById('drawButton');
    drawButton.disabled = participants.length < 2;
}

function startDraw() {
    const participants = document.querySelectorAll('#participants .card');
    if (participants.length < 2) {
        alert('Недостаточно участников для жеребьевки.');
        return;
    }
    
    const shuffled = Array.from(participants).sort(() => Math.random() - 0.5);
    const result = document.getElementById('result');
    result.innerHTML = '';

    for (let i = 0; i < shuffled.length; i++) { 
        const santa = shuffled[i].textContent;
        const receiver = shuffled[(i + 1) % shuffled.length].textContent;
        const pairing = document.createElement('div');
        pairing.className = 'card';
        pairing.innerHTML = `<strong>${santa}</strong> подарит подарок <strong>${receiver}</strong>`;
        result.appendChild(pairing);
    }
}

document.getElementById('drawButton').addEventListener('click', startDraw);
