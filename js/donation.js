
//Audio source:
const audioSrc = {
    session: {
        "en": "/src/audio/book-audio.mp3",
        "fr": "/src/audio/book-audio.mp3",
    }
};

function handleAudio(lang) {
    const audioMessage = document.querySelector('.banner .message audio#audio-message');

    audioMessage.src = audioSrc.session[lang] || "/src/audio/book-audio.mp3";

    const listenBTN = document.querySelector(".banner .message button#play");

    if (listenBTN && audioMessage) {
        listenBTN.addEventListener('click', () => {
            if (!audioMessage.paused) {
                listenBTN.innerHTML = ` <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                  />
                </svg>`;
                audioMessage.pause();
            } else {
                listenBTN.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
</svg>`;
                audioMessage.play();
            }
        });
    }

    audioMessage.addEventListener("ended", () => {
        listenBTN.innerHTML = ` <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                  />
                </svg>`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const language = navigator.language;
    const lang = language.toLowerCase().substring(0, 2);

    handleAudio(lang);
});