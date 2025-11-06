document.getElementById('generate-notes-btn').addEventListener('click', generateNotes);
document.getElementById('calculate-btn').addEventListener('click', calculateMoyenne);
document.getElementById('reset-btn').addEventListener('click', resetForm);
document.getElementById('add-note-btn').addEventListener('click', addNote);

document.getElementById('add-note-btn').style.display = 'none';

document.getElementById('notes-container').addEventListener('input', function(e) {
    if (e.target.classList.contains('grade')) {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= 20) {
            e.target.style.borderColor = '';
        } else {
            e.target.style.borderColor = '#f56565';
        }
    } else if (e.target.classList.contains('coefficient')) {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value > 0 && value <= 7) {
            e.target.style.borderColor = '';
        } else {
            e.target.style.borderColor = '#f56565';
        }
    }
});


function generateNotes() {
    const n = parseInt(document.getElementById('nombre-notes').value);
    if (isNaN(n) || n < 1) {
        alert("Merci d'entrer un nombre valide de notes (entre 1 et 30).");
        return;
    }
    if (n > 30) {
        alert("Le nombre maximum de notes est 30.");
        return;
    }

    const container = document.getElementById('notes-container');
    container.innerHTML = ''; // Ms7 les anciens

    for (let i = 0; i < n; i++) {
        const entry = document.createElement('div');
        entry.className = 'note-entry';
        entry.innerHTML = `
            <input type="number" class="grade" placeholder="Note (ex: 15)" min="0" max="20" step="0.01" required>
            <input type="number" class="coefficient" placeholder="Coef (ex: 2)" min="1" value="1" required>
            <button type="button" class="remove-btn" onclick="removeNote(this)">❌</button>
        `;
        container.appendChild(entry);
    }
    document.getElementById('add-note-btn').style.display = '';
}



function addNote() {
    const container = document.getElementById('notes-container');
    const entry = document.createElement('div');
    entry.className = 'note-entry';
    entry.innerHTML = `
        <input type="number" class="grade" placeholder="Note (ex: 15)" min="0" max="20" step="0.01" required>
        <input type="number" class="coefficient" placeholder="Coef (ex: 2)" min="1" value="1" required>
        <button type="button" class="remove-btn" onclick="removeNote(this)">❌</button>
    `;
    container.appendChild(entry);
}


function removeNote(button) {
    button.parentElement.remove();
}



function calculateMoyenne() {
    const entries = document.querySelectorAll('.note-entry');
    let sommeNotes = 0;
    let sommeCoeffs = 0;

    let allValid = true;

    entries.forEach(entry => {
        const noteInput = entry.querySelector('.grade');
        const coefInput = entry.querySelector('.coefficient');

        const note = parseFloat(noteInput.value);
        const coef = parseFloat(coefInput.value);

          
        noteInput.style.borderColor = '';
        coefInput.style.borderColor = '';

        
        if (isNaN(note) || note < 0 || note > 20) {
            noteInput.style.borderColor = '#f56565'; // Red border
            allValid = false;
        }

        
        if (isNaN(coef) || coef < 0 || coef > 7) {
            coefInput.style.borderColor = '#f56565'; // Red border
            allValid = false;
        }

        if (allValid && !isNaN(note) && !isNaN(coef)) {
            sommeNotes += note * coef;
            sommeCoeffs += coef;
        }
    });

    if (!allValid) {
        alert("Merci de vérifier les notes ou coefficients invalides.");
        return;
    }

    if (sommeCoeffs === 0) {
        alert("Aucun coefficient valide saisi.");
        return;
    }

    const moyenne = sommeNotes / sommeCoeffs;

    const resultDiv = document.getElementById('result');
    resultDiv.className = 'result show';

    let appreciation = "Insuffisant";
    let color = "#e53e3e";
    if (moyenne >= 16) {
        appreciation = "Excellent";
        color = "#38a169";
    } else if (moyenne >= 14) {
        appreciation = "Très Bien";
        color = "#38a169";
    } else if (moyenne >= 12) {
        appreciation = "Bien";
        color = "#319795";
    } else if (moyenne >= 10) {
        appreciation = "Passable";
        color = "#d69e2e";
    }
    resultDiv.innerHTML = `Votre moyenne est: <strong>${moyenne.toFixed(2)}</strong><br><span style="color:${color}; font-size:1.2rem;">${appreciation}</span>`;
}


function resetForm() {
    document.getElementById('notes-container').innerHTML = '';
    document.getElementById('result').className = 'result';
    document.getElementById('nombre-notes').value = '1';
    document.getElementById('add-note-btn').style.display = 'none';
}

