/**
 * AdBlock UI Orchestrator
 * VnExpress Overseas 2026
 */

class AdBlockUI {
  constructor() {
    this.level = 0;
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.browser = this.detectBrowser();
  }

  detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes("Chrome") && !ua.includes("Edg")) return "chrome";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "safari";
    if (ua.includes("Firefox")) return "firefox";
    if (ua.includes("Edg")) return "edge";
    return "other";
  }

  
  // --- Level 1: Silent Nudge (Heart Icon Only) ---
  showLevel1() {
    console.log("[AdBlock] Triggering Level 1: Silent Heart");
    if (document.querySelector('.vne-ab-pinned-icon')) return;

    const icon = document.createElement('div');
    icon.className = 'vne-ab-pinned-icon';
    icon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
    icon.onclick = () => this.showLevel3();
    document.body.appendChild(icon);
  }


  // --- Level 2: Fade Out & Inline Modal ---
  showLevel2() {
    console.log("[AdBlock] Triggering Level 2");
    const paragraphs = document.querySelectorAll('article.fck_detail p.Normal');
    if (paragraphs.length >= 3) {
      // Apply fade out to P3
      paragraphs[2].classList.add('fade-out');
      
      // Hide all paragraphs from P4 onwards
      for (let i = 3; i < paragraphs.length; i++) {
        paragraphs[i].style.display = 'none';
      }

      
      // Insert Inline Modal
      const modal = document.createElement('div');
      modal.className = 'vne-ab-inline-modal';
      
      
      modal.innerHTML = `
        <h3>Bạn có đang bỏ lỡ trải nghiệm trọn vẹn?</h3>
        <p>
          Trình chặn quảng cáo có thể khiến một số tính năng hiển thị trên VnExpress hoạt động không ổn định. Hãy tắt để trải nghiệm nội dung mượt mà và ủng hộ tòa soạn.
        </p>
        <div class="actions">
          <button class="vne-btn vne-btn-primary" onclick="adblockUI.showGuide()">Xem đầy đủ nội dung</button>
          <button class="vne-btn vne-btn-secondary" onclick="adblockUI.skipLevel2()">Để sau</button>
        </div>
      `;



      paragraphs[2].parentNode.insertBefore(modal, paragraphs[2].nextSibling);
    }
  }

  skipLevel2() {
    // Unlock content
    const paragraphs = document.querySelectorAll('article.fck_detail p.Normal');
    paragraphs[2].classList.remove('fade-out');
    for (let i = 3; i < paragraphs.length; i++) {
      paragraphs[i].style.display = 'block';
    }
    const modal = document.querySelector('.vne-ab-inline-modal');
    if (modal) modal.remove();

    // Show sticky bar
    this.showStickyBar();
  }

  
  showStickyBar() {
    if (document.querySelector('.vne-ab-sticky-bar')) return;
    const bar = document.createElement('div');
    bar.className = 'vne-ab-sticky-bar';
    
    bar.innerHTML = `
      <span>Ủng hộ VnExpress bằng cách tắt trình chặn quảng cáo tại đây.</span>
      <button class="vne-btn vne-btn-primary" onclick="adblockUI.showGuide()">Whitelist ngay</button>
    `;

    document.body.appendChild(bar);
  }



  // --- Level 3: Hard Wall & Chrome Guide Optimization ---
  showLevel3() {
    console.log("[AdBlock] Triggering Level 3");
    if (document.querySelector('.vne-ab-hard-wall')) return;

    const wall = document.createElement('div');
    wall.className = 'vne-ab-hard-wall';
    
    
    
    wall.innerHTML = `
      <div class="vne-ab-guide-card">
        <div style="font-size: 11px; color: #B42652; font-weight: 700; margin-bottom: 5px; letter-spacing: 0.5px; opacity: 0.8;">SỰ ỦNG HỘ CỦA BẠN LÀ NGUỒN SỐNG CỦA TÒA SOẠN</div>
        <div class="vne-step-badge">HƯỚNG DẪN NHANH</div>
        <h3>Thông báo gỡ bỏ chặn quảng cáo</h3>
        <p>
          Để xem nội dung trên VnExpress, vui lòng làm theo 3 bước đơn giản bên dưới để thiết lập ngoại lệ.
        </p>
        
        <div class="vne-carousel" id="vneCarousel">
          <div class="vne-carousel-inner" id="vneCarouselInner">
            <div class="vne-carousel-item"><img src="step1.png" alt="Bước 1"></div>
            <div class="vne-carousel-item"><img src="step2.png" alt="Bước 2"></div>
            <div class="vne-carousel-item"><img src="step3.png" alt="Bước 3"></div>
          </div>
          <div class="vne-carousel-controls">
            <button class="vne-carousel-btn" onclick="adblockUI.prevSlide()">&#10094;</button>
            <button class="vne-carousel-btn" onclick="adblockUI.nextSlide()">&#10095;</button>
          </div>
          <div class="vne-carousel-dots" id="vneCarouselDots">
            <div class="vne-dot active" onclick="adblockUI.goToSlide(0)"></div>
            <div class="vne-dot" onclick="adblockUI.goToSlide(1)"></div>
            <div class="vne-dot" onclick="adblockUI.goToSlide(2)"></div>
          </div>
        </div>

        <button class="vne-btn vne-btn-primary" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;" onclick="location.reload()">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
           Tôi đã hiểu và làm theo
        </button>
      </div>
    `;



    document.body.appendChild(wall);
    document.body.style.overflow = 'hidden';
    
    // Init carousel state
    this.currentSlide = 0;
  }

  nextSlide() {
    if (this.currentSlide < 2) {
      this.goToSlide(this.currentSlide + 1);
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.goToSlide(this.currentSlide - 1);
    }
  }

  goToSlide(index) {
    this.currentSlide = index;
    const inner = document.getElementById('vneCarouselInner');
    const dots = document.querySelectorAll('#vneCarouselDots .vne-dot');
    
    inner.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
      if (i === index) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  showGuide() {
    // In a real app, this might show a specific modal or jump to L3-style guide
    this.showLevel3();
  }
}

const adblockUI = new AdBlockUI();
window.adblockUI = adblockUI;
