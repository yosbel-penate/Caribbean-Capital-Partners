function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18next.exists(key)) {
            el.innerHTML = i18next.t(key);
        }
    });
    document.title = i18next.t('title');
}

function changeLanguage(lng) {
    i18next.changeLanguage(lng, (err, t) => {
        if (err) {
            return console.error('Error al cambiar el idioma:', err);
        }
        updateContent();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    i18next
        .use(i18nextHttpBackend)
        .use(i18nextBrowserLanguageDetector)
        .init({
            fallbackLng: 'es',
            debug: true,
            load: 'languageOnly', // ← Clave para evitar es-ES.json
            backend: {
                loadPath: 'locales/{{lng}}.json'
            }
        }, (err, t) => {
            if (err) console.error('Error:', err);
            updateContent();

            // Botones de idioma
            document.querySelectorAll('[data-lang]').forEach(button => {
                button.addEventListener('click', () => {
                    changeLanguage(button.getAttribute('data-lang'));
                });
            });
        });
});