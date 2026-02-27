// script.js

// Smooth scrolling para links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        // Fecha outras respostas abertas
        document.querySelectorAll('.faq-answer.show').forEach(openAnswer => {
            if (openAnswer !== answer) {
                openAnswer.classList.remove('show');
                openAnswer.previousElementSibling.classList.remove('active');
            }
        });
        
        // Alterna a resposta atual
        answer.classList.toggle('show');
        question.classList.toggle('active');
        
        // Alterna ícone
        if (icon) {
            icon.style.transform = answer.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0)';
        }
    });
});

// Formulário de Agendamento
document.getElementById('agendamentoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação básica
    const inputs = this.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.style.borderColor = '#ff4444';
        } else {
            input.style.borderColor = '#e8cdb4';
        }
    });
    
    if (isValid) {
        // Simulação de envio
        alert('Agendamento realizado com sucesso! Entraremos em contato para confirmar.');
        this.reset();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});

// Formulário de Dúvidas
document.getElementById('duvidasForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const mensagem = this.querySelector('textarea').value;
    
    if (nome && email && mensagem) {
        alert('Mensagem enviada com sucesso! Responderemos em breve.');
        this.reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Botões de compra
document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product-card').querySelector('h3').textContent;
        alert(`Produto "${product}" adicionado ao carrinho!`);
    });
});

// Efeito de scroll no header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(248, 240, 231, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'linear-gradient(135deg, #f8f0e7 0%, #fff5eb 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY