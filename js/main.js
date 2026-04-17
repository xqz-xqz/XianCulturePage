// 通用交互脚本 - 适用于所有页面

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 移动端菜单折叠（如果导航栏有 .menu-toggle）
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // 2. 首页轮播图自动切换（仅当页面存在 .carousel 时执行）
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        let currentIndex = 0;
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }

        // 每5秒切换
        let autoTimer = setInterval(nextSlide, 5000);

        // 点击小圆点切换
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', function() {
                clearInterval(autoTimer);
                currentIndex = idx;
                showSlide(currentIndex);
                autoTimer = setInterval(nextSlide, 5000);
            });
        });

        // 鼠标悬停暂停自动播放
        carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
        carousel.addEventListener('mouseleave', () => {
            autoTimer = setInterval(nextSlide, 5000);
        });
    }

    // 3. 按钮点击涟漪效果（可选）
    const buttons = document.querySelectorAll('button, .btn-outline-gold');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // 简单动效：可添加一个短暂的 class
            this.style.transform = 'scale(0.98)';
            setTimeout(() => this.style.transform = '', 100);
        });
    });

    // 4. 当前页面导航高亮（根据文件名高亮对应链接）
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navAnchors = document.querySelectorAll('.nav-links a');
    navAnchors.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.style.color = 'var(--pottery-gold)';
            link.style.fontWeight = '700';
            link.style.borderBottom = '2px solid var(--pottery-gold)';
        }
    });

});