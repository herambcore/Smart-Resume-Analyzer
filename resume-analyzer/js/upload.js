/**
 * Upload page: drag & drop zone and Analyze button
 */
(function () {
  'use strict';
  
  var dropZone = document.getElementById('drop-zone');
  var fileInput = document.getElementById('file-input');
  var dropPrompt = document.getElementById('drop-prompt');
  var dropFilename = document.getElementById('drop-filename');
  var analyzeBtn = document.getElementById('analyze-btn');
  var form = document.getElementById('upload-form');

  if (!dropZone || !fileInput || !form) return;

  var selectedFile = null;

  function setFile(file) {
    selectedFile = file;
    if (file) {
      dropZone.classList.add('has-file');
      dropPrompt.setAttribute('aria-hidden', 'true');
      dropFilename.textContent = file.name;
      dropFilename.removeAttribute('aria-hidden');
      analyzeBtn.removeAttribute('disabled');
    } else {
      dropZone.classList.remove('has-file');
      dropPrompt.removeAttribute('aria-hidden');
      dropFilename.textContent = '';
      dropFilename.setAttribute('aria-hidden', 'true');
      analyzeBtn.setAttribute('disabled', '');
    }
  }

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    dropZone.addEventListener(eventName, preventDefault, false);
  });

  ['dragenter', 'dragover'].forEach(function (eventName) {
    dropZone.addEventListener(eventName, function () {
      dropZone.classList.add('is-dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(function (eventName) {
    dropZone.addEventListener(eventName, function () {
      dropZone.classList.remove('is-dragover');
    }, false);
  });

  dropZone.addEventListener('drop', function (e) {
    var files = e.dataTransfer && e.dataTransfer.files;
    if (files && files.length) {
      var file = files[0];
      var ext = (file.name.split('.').pop() || '').toLowerCase();
      if (['pdf', 'doc', 'docx'].indexOf(ext) !== -1) {
        setFile(file);
      } else {
        setFile(null);
        alert('Please choose a PDF or DOC/DOCX file.');
      }
    }
  }, false);

  dropZone.addEventListener('click', function () {
    fileInput.click();
  }, false);

  dropZone.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });

  fileInput.addEventListener('change', function () {
    var file = fileInput.files && fileInput.files[0];
    if (file) {
      setFile(file);
    } else {
      setFile(null);
    }
  }, false);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    // This connects your upload page to the logic in analyzer.js
    if (typeof startAnalysis === "function") {
      startAnalysis(selectedFile); 
    } else {
      console.error("The startAnalysis function was not found. Check if analyzer.js is linked in your HTML.");
    }
  }, false);
})();
