const boldButton = document.getElementById('format-bold');
const italicButton = document.getElementById('format-italic');
const spoilerButton = document.getElementById('format-spoiler');

// Bold text
boldButton.onclick = function(event) {
  event.preventDefault();
  insertText('<b></b>', 4);
}

// Italic text
italicButton.onclick = function(event) {
  event.preventDefault();
  insertText('<i></i>', 4);
}

// Deleted text
spoilerButton.onclick = function(event) {
  event.preventDefault();
  insertText('<span class=\"spoiler\"></span>', 7);
}

// Inserts text in the posting textarea (shifts the cursor from the right)
function insertText(text, shift) {
  const textarea = document.getElementById('posting-text');

  // Insert text in the cursor position
  if (textarea.selectionStart || textarea.selectionStart == '0') {
    let startPos = textarea.selectionStart;
    let endPos = textarea.selectionEnd;
    textarea.value = textarea.value.substring(0, startPos)
      + text
      + textarea.value.substring(endPos, textarea.value.length);
  } else {
      textarea.value += text;
  }

  // Move the cursor and return textarea focus
  textarea.selectionStart = textarea.selectionStart - shift;
  textarea.selectionEnd = textarea.selectionEnd - shift;
  textarea.focus();
}