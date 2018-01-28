// NAMESPACE
const synth = {};

// WEB AUDIO API + NODES
synth.audio = new AudioContext();
synth.wave = synth.audio.createOscillator();
synth.vol = synth.audio.createGain();

// SET DEFAULTS
// synth.wave.type = 'sine';
// synth.wave.type = 'square';
synth.wave.type = 'triangle';
// synth.wave.type = 'sawtooth';

synth.vol.gain.value = 0;

// PLUG IN
synth.wave.connect(synth.vol);
synth.vol.connect(synth.audio.destination);

// ROCK
synth.wave.start();

synth.play = function() {
  if (!synth.freq) {
    $('.key').addClass('insist');
  }
  else {
    $('.key').removeClass('insist');

    $(synth.key).fadeOut(100).fadeIn(100);

    synth.note(synth.freq);
  };
};

synth.note = function() {
  synth.wave.frequency.setValueAtTime(synth.freq, synth.audio.currentTime);

  synth.vol.gain.value = 1;
  synth.vol.gain.setTargetAtTime(0, synth.audio.currentTime, 0.2);
};

// INIT
synth.init = function() {
  $(window).keydown(function(e) {
    synth.key = $(`div[data-key="${e.keyCode}"]`);
    synth.freq = synth.key.attr('data-freq');

    synth.play(synth.key, synth.freq);
  });
};

// DOCREADY
$(synth.init);
