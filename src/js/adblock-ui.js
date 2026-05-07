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



  
  // --- Level 3: 2-Step Flow (Emotional -> Technical) ---
  showLevel3() {
    console.log("[AdBlock] Triggering Level 3 Step 1");
    this.renderStep1();
  }


  skipHardWall() {
    console.log("[AdBlock] Skipping hard wall & unlocking content");
    const wall = document.getElementById('vne-ab-hard-wall');
    if (wall) {
      wall.remove();
      document.body.style.overflow = '';
    }
    const paragraphs = document.querySelectorAll('article.fck_detail p.Normal');
    if (paragraphs.length >= 3) {
      paragraphs[2].classList.remove('fade-out');
      for (let i = 3; i < paragraphs.length; i++) {
        paragraphs[i].style.display = 'block';
      }
    }
    const inlineModal = document.querySelector('.vne-ab-inline-modal');
    if (inlineModal) inlineModal.remove();
    this.showStickyBar();
  }

  renderStep1() {
    let wall = document.getElementById('vne-ab-hard-wall');
    if (!wall) {
      wall = document.createElement('div');
      wall.className = 'vne-ab-hard-wall';
      wall.id = 'vne-ab-hard-wall';
      document.body.appendChild(wall);
    }
    
    wall.innerHTML = `
      <div class="vne-ab-guide-card emotional-mode">
        <h3>Hãy giúp chúng tôi duy trì nội dung miễn phí bằng cách <br> cho phép quảng cáo</h3>
        <p class="description">
          VnExpress là cầu nối quê hương cho hơn 4 triệu người Việt toàn cầu. Dù bạn ở đâu, chúng tôi vẫn đưa tin đến bạn mỗi ngày. Xin bạn một bước nhỏ — tắt Adblock để giữ cầu nối này.
        </p>
        
        <div class="actions-vertical">
          <button class="vne-btn vne-btn-primary" onclick="adblockUI.renderStep2()">
             Cho phép hiển thị quảng cáo
          </button>
          <button class="vne-btn-ghost" onclick="adblockUI.skipHardWall()">
             Tiếp tục mà không tắt quảng cáo
          </button>
        </div>
      </div>
    `;
    document.body.style.overflow = 'hidden';
  }

  renderStep2(blockerType = 'adguard') {
    const wall = document.getElementById('vne-ab-hard-wall');
    if (!wall) return;

    
    const blockers = [
      { id: 'adguard', name: 'Adguard Extension', icon: '🛡️' },
      
      
      { id: 'abp', name: 'Adblock Plus', icon: '🛑' },
      { id: 'adblock', name: 'Adblock', icon: '✋' },
      { id: 'brave', name: 'Brave', icon: '🦁' },
      { id: 'duckduckgo', name: 'DuckDuckGo', icon: '🦆' },
      { id: 'opera', name: 'Opera', icon: '🅾️' },
      { id: 'edge', name: 'Microsoft Edge', icon: '🌐' },
      { id: 'safari', name: 'Safari', icon: '🧭' },
      { id: 'ghostery', name: 'Ghostery', icon: '👻' }
    ];

    const guides = {
      adguard: {
        title: 'Adguard Extension Hướng dẫn',
        steps: [
          'Nhấn vào biểu tượng AdGuard màu xanh lá trong thanh tiện ích mở rộng.',
          'Nhấn vào công tắc lớn màu xanh lá để tắt.'
        ]
      },
      
      abp: {
        title: 'Adblock Plus Hướng dẫn',
        steps: [
          'Nhấn vào biểu tượng Adblock Plus (ABP) trên thanh công cụ.',
          'Nhấp vào công tắc bên cạnh "Trang web này" để tắt trình chặn.'
        ]
      },
      adblock: {
        title: 'Adblock Hướng dẫn',
        steps: [
          'Nhấn vào biểu tượng Adblock (bàn tay trắng trong vòng tròn đỏ).',
          'Chọn "Luôn luôn" hoặc "Một lần" tại mục Tạm dừng trên trang web này.'
        ]
      },
      brave: {
        title: 'Brave Browser Hướng dẫn',
        steps: [
          'Nhấn vào biểu tượng Sư tử (Brave Shields) ở bên phải thanh địa chỉ.',
          'Gạt công tắc chính sang trạng thái Tắt (Màu xám).'
        ]
      },
      duckduckgo: {
        title: 'DuckDuckGo Hướng dẫn',
        steps: [
          'Nhấn vào biểu tượng DuckDuckGo (hình con vịt) bên cạnh thanh địa chỉ.',
          'Tắt mục "Bảo vệ quyền riêng tư" (Privacy Protection) cho trang web này.'
        ]
      },
      opera: {
        title: 'Opera Browser Hướng dẫn',
        steps: [
          'Nhấn vào biểu tượng hình Khiên xanh ở thanh địa chỉ.',
          'Tắt tính năng "Chặn quảng cáo" (Ad blocking).'
        ]
      },
      edge: {
        title: 'Microsoft Edge Hướng dẫn',
        steps: [
          'Nhấn vào biểu tượng Ổ khóa hoặc thông tin trang web ở thanh địa chỉ.',
          'Chọn "Quyền cho trang web này" và tắt các trình chặn nếu có, hoặc tắt Tracking Prevention.'
        ]
      },
      safari: {
        title: 'Safari Hướng dẫn',
        steps: [
          'Vào Menu Safari -> Cài đặt cho Trang web này.',
          'Bỏ chọn mục "Sử dụng trình chặn nội dung" (Use Content Blockers).'
        ]
      },
      ghostery: {
        title: 'Ghostery Hướng dẫn',
        steps: [
          'Nhấn vào biểu tượng Ghostery (hình con ma) trên thanh công cụ.',
          'Nhấn vào nút "Tin cậy trang web" (Trust Site).'
        ]
      }
    };


    const currentGuide = guides[blockerType] || guides['adguard'];

    wall.innerHTML = `
      <div class="vne-ab-tech-guide">
        <div class="vne-tech-sidebar">
          <h4>Chọn trình chặn của bạn:</h4>
          ${blockers.map(b => `
            <div class="vne-blocker-item ${b.id === blockerType ? 'active' : ''}" onclick="adblockUI.renderStep2('${b.id}')">
              <span>${b.icon}</span> ${b.name}
            </div>
          `).join('')}
        </div>
        <div class="vne-tech-main">
          <div class="vne-tech-header">
            <div class="vne-back-btn" onclick="adblockUI.renderStep1()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              Quay lại
            </div>
            
          </div>
          <div class="vne-guide-content">
            <h2>${currentGuide.title}</h2>
            <ol class="vne-guide-steps">
              ${currentGuide.steps.map((s, i) => `<li>${i + 1}. ${s}</li>`).join('')}
            </ol>
            
          </div>
          
          <button class="vne-btn vne-btn-primary" style="margin-top: 30px; width: fit-content;" onclick="location.reload()">
             Tôi đã tắt, làm mới trang
          </button>
        </div>
      </div>
    `;
  }


  showGuide() {
    // In a real app, this might show a specific modal or jump to L3-style guide
    this.showLevel3();
  }
}

const adblockUI = new AdBlockUI();
window.adblockUI = adblockUI;
