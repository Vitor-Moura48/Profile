export function getSystemLanguage(): "en" | "pt" {
    // Verifica se está no navegador
    if (typeof window === 'undefined') return 'en';

    // Pega o idioma do navegador
    const browserLang = navigator.language.toLowerCase();

    // Se começar com 'pt', retorna 'pt', caso contrário retorna 'en'
    return browserLang.startsWith('pt') ? 'pt' : 'en';
}