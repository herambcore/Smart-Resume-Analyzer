function startAnalysis(file) {
    var ext = (file.name.split('.').pop() || '').toLowerCase();
    if (ext !== 'docx') {
        alert("Text extraction works best with .docx files. Please upload a Word document (.docx).");
        return;
    }
    var reader = new FileReader();
    reader.onload = function (event) {
        var arrayBuffer = event.target.result;
        if (typeof mammoth === 'undefined') {
            alert("Document reader not loaded. Please refresh and try again.");
            return;
        }
        mammoth.extractRawText({ arrayBuffer: arrayBuffer })
            .then(function (result) {
                var resumeText = result.value.toLowerCase();
                calculateGenuineScore(resumeText);
            })
            .catch(function (err) {
                console.error("Analysis Error:", err);
                alert("Could not read this file. Please ensure it's a valid .docx file.");
            });
    };
    reader.readAsArrayBuffer(file);
}

function displayResults(finalScore, feedback) {
    var section = document.getElementById('results-section');
    var scoreEl = document.getElementById('resume-score');
    var listEl = document.getElementById('suggestions-list');
    if (!section || !scoreEl || !listEl) return;
    scoreEl.textContent = finalScore + '/100';
    listEl.innerHTML = '';
    feedback.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item;
        listEl.appendChild(li);
    });
    section.style.display = 'block';
    section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function calculateGenuineScore(text) {
    let score = 0;
    let feedback = [];

    // CRITERIA 1: Impact & Numbers (30 Points)
    const numberCount = (text.match(/\d+/g) || []).length;
    if (numberCount > 5) {
        score += 30;
        feedback.push("✔ Excellent! Your resume is data-driven with metrics.");
    } else {
        feedback.push("⚠ Missing Impact: Quantify your results (e.g., 'Saved 10% time').");
    }

    // CRITERIA 2: Action Verbs (25 Points)
    const impactVerbs = ['developed', 'automated', 'led', 'engineered', 'won', 'increased'];
    const verbHits = impactVerbs.filter(v => text.includes(v)).length;
    score += Math.min(verbHits * 5, 25);
    if (verbHits < 3) feedback.push("⚠ Use stronger action verbs to start your bullet points.");

    // CRITERIA 3: Contact & Links (15 Points)
    if (text.includes('linkedin.com') || text.includes('github.com')) {
        score += 15;
        feedback.push("✔ Professional profiles (LinkedIn/GitHub) detected.");
    } else {
        feedback.push("⚠ Add your LinkedIn or Portfolio link for more credibility.");
    }

    // CRITERIA 4: Formatting & Length (30 Points)
    const wordCount = text.split(/\s+/).length;
    if (wordCount > 300 && wordCount < 600) {
        score += 30;
        feedback.push("✔ Ideal resume length detected.");
    } else {
        feedback.push("⚠ Resume length is either too short or too wordy for a single page.");
    }

    var finalScore = Math.min(score, 100);
    displayResults(finalScore, feedback);
}