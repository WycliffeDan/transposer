function chordTranspose(originalKey, transposeKey, songChord) {
  return "Eh? I don\'t know how to do that yet";
}

document.getElementById('transposeButton').addEventListener('click', function(e) {
  e.preventDefault();

  var out = document.querySelector('textarea[name="transposedSong"]');
  out.innerHTML = chordTranspose();
});

/**
 * This only works on the server side when expressed in this manner
 */
//module.exports = { chordTranspose };
