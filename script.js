document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================================
    // 1. SISTEMA COMPLETO DE MODO ESCURO (THEME TOGGLE)
    // =========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Função para aplicar o tema correto
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeToggleBtn.innerHTML = '☀️ Modo Claro';
        } else {
            document.body.removeAttribute('data-theme');
            themeToggleBtn.innerHTML = '🌓 Modo Escuro';
        }
    };

    // Alternar tema no clique do botão
    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.body.getAttribute('data-theme');
        if (activeTheme === 'dark') {
            applyTheme('light');
            localStorage.setItem('site-theme', 'light');
        } else {
            applyTheme('dark');
            localStorage.setItem('site-theme', 'dark');
        }
    });

    // Ler a preferência salva no navegador do usuário
    const storedTheme = localStorage.getItem('site-theme');
    if (storedTheme) {
        applyTheme(storedTheme);
    } else {
        // Se não houver salvo, detecta a preferência automática do sistema operacional
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    // =========================================================================
    // 2. SISTEMA DE CORREÇÃO DINÂMICA DO QUIZ (5 PERGUNTAS)
    // =========================================================================
    const quizForm = document.getElementById('quiz-form');
    const resultDisplay = document.getElementById('quiz-result');

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Bloqueia o reload automático da página

        // Captura todas as respostas usando a API FormData
        const answersData = new FormData(quizForm);
        
        let totalQuestions = 5;
        let scoreCounter = 0;

        // Processa as respostas loopando pelas chaves do formulário
        for (let i = 1; i <= totalQuestions; i++) {
            const currentAnswer = answersData.get(`q${i}`);
            if (currentAnswer === 'certo') {
                scoreCounter++;
            }
        }

        // Configuração de Feedback Customizado baseado no desempenho
        resultDisplay.classList.remove('hidden', 'sucesso');
        resultDisplay.classList.add('sucesso'); // Usa o card verde de sucesso estruturado no CSS
        
        let messageText = '';
        if (scoreCounter === totalQuestions) {
            messageText = `🎯 Incrível! Você acertou ${scoreCounter} de ${totalQuestions}. Você é um mestre da Cidadania Digital e está blindado contra as Fake News!`;
        } else if (scoreCounter >= 3) {
            messageText = `👍 Muito bom! Você acertou ${scoreCounter} de ${totalQuestions}. Tem uma ótima noção de segurança, mas preste atenção aos pequenos detalhes.`;
        } else {
            messageText = `⚠️ Atenção! Você acertou apenas ${scoreCounter} de ${totalQuestions}. Recomenda-se reler o nosso guia prático para evitar cair em armadilhas cibernéticas.`;
        }

        resultDisplay.innerHTML = messageText;

        // Rola a tela suavemente para o resultado aparecer em destaque
        resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});
