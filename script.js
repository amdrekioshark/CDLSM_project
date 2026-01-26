// ===== GERAL =====
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Menu Mobile
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            
            // Muda ícone
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('bi-list');
                icon.classList.add('bi-x');
                menuToggle.setAttribute('aria-label', 'Fechar menu');
            } else {
                icon.classList.remove('bi-x');
                icon.classList.add('bi-list');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });
        
        // Fecha menu ao clicar em link (mobile)
        document.querySelectorAll('#mainNav a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('bi-x');
                    icon.classList.add('bi-list');
                    menuToggle.setAttribute('aria-label', 'Abrir menu');
                }
            });
        });
    }
    
    // 2. Atualiza ano no rodapé
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // 3. Validação de formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const mensagem = document.getElementById('mensagem');
            
            let isValid = true;
            
            // Remove erros anteriores
            document.querySelectorAll('.error').forEach(el => el.remove());
            
            // Valida nome
            if (!nome.value.trim()) {
                showError(nome, 'Por favor, insira seu nome');
                isValid = false;
            }
            
            // Valida email
            if (!email.value.trim()) {
                showError(email, 'Por favor, insira seu e-mail');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor, insira um e-mail válido');
                isValid = false;
            }
            
            // Valida mensagem
            if (!mensagem.value.trim()) {
                showError(mensagem, 'Por favor, insira sua mensagem');
                isValid = false;
            }
            
            // Se válido, simula envio
            if (isValid) {
                // Mostra mensagem de sucesso
                const alert = document.createElement('div');
                alert.className = 'alert alert-success';
                alert.innerHTML = `
                    <strong>✓ Mensagem enviada!</strong><br>
                    Em breve nossa equipe entrará em contato. Obrigado!
                `;
                
                contactForm.prepend(alert);
                
                // Limpa formulário
                contactForm.reset();
                
                // Remove alerta após 5 segundos
                setTimeout(() => alert.remove(), 5000);
            }
        });
    }
    
    // 4. Formulário de associação
    const associacaoForm = document.getElementById('associacaoForm');
    if (associacaoForm) {
        associacaoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simula envio
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Mostra mensagem de sucesso
                const alert = document.createElement('div');
                alert.className = 'alert alert-success';
                alert.innerHTML = `
                    <strong>✓ Solicitação enviada com sucesso!</strong><br>
                    Nossa equipe entrará em contato em até 24h para dar continuidade à sua associação.
                `;
                
                associacaoForm.prepend(alert);
                associacaoForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove alerta após 8 segundos
                setTimeout(() => alert.remove(), 8000);
            }, 1500);
        });
    }
    
    // 5. Formulário de inscrição em curso
    const inscricaoForm = document.getElementById('inscricaoForm');
    if (inscricaoForm) {
        inscricaoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cursoSelect = document.getElementById('curso');
            if (!cursoSelect.value) {
                alert('Por favor, selecione um curso');
                return;
            }
            
            // Simula envio
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Inscrevendo...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`✅ Inscrição realizada com sucesso no curso "${cursoSelect.options[cursoSelect.selectedIndex].text}"!\n\nEm breve você receberá um e-mail com mais informações.`);
                
                inscricaoForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // 6. Botão "Voltar ao topo"
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 7. Detectar redimensionamento da tela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mainNav) {
            mainNav.classList.remove('active');
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('bi-x');
                icon.classList.add('bi-list');
            }
        }
    });
});

// ===== FUNÇÕES AUXILIARES =====
function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    error.style.color = '#dc3545';
    error.style.fontSize = '0.9rem';
    error.style.marginTop = '5px';
    
    input.parentNode.appendChild(error);
    input.focus();
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== SIMULAÇÃO DE CONSULTA SCPC =====
function consultarSCPC() {
    const cnpj = prompt('Para consulta ao SCPC, digite o CNPJ da sua empresa (somente números):');
    
    if (cnpj && cnpj.length === 14) {
        // Simulação de consulta
        const resultado = Math.random() > 0.5 ? 'APROVADO' : 'ANÁLISE';
        
        alert(`✅ Consulta SCPC - CNPJ: ${cnpj}\n\nStatus: ${resultado}\n\nEm caso de dúvidas, entre em contato com nossa equipe.`);
    } else if (cnpj) {
        alert('❌ CNPJ inválido. Digite 14 números.');
    }
}