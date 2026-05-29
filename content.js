// الكود هيشتغل بس لو الرابط فيه الكلمة السرية بتاعتنا
if (window.location.search.includes('autodl=1')) {
    const currentUrl = window.location.href;

    // ----------------------------------------------------
    // مسار موقع YTS
    // ----------------------------------------------------
    if (currentUrl.includes('yts.bz/movies/')) {
        // البحث عن كل روابط التحميل في الصفحة
        const links = Array.from(document.querySelectorAll('a[href*="/torrent/download/"]'));
        
        // محاولة إيجاد رابط جودة 1080p، لو مفيش هناخد أول رابط تحميل يقابلنا
        const targetLink = links.find(a => a.textContent.includes('1080p') || a.title.includes('1080p')) || links[0];

        if (targetLink) {
            window.location.href = targetLink.href; // تحميل ملف التورنت
            
            // نستنى ثانيتين لحد ما المتصفح يبعت الأمر لـ uTorrent، وبعدين نقفل التاب
            setTimeout(() => {
                chrome.runtime.sendMessage({ action: "closeTab" });
            }, 2000);
        } else {
            // لو الفيلم مش موجود أو الصفحة خطأ (404)، اقفل التاب بعد 4 ثواني عشان ماتفضلش مفتوحة عالفاضي
            setTimeout(() => {
                chrome.runtime.sendMessage({ action: "closeTab" });
            }, 4000);
        }
    }

    // ----------------------------------------------------
    // مسار موقع BT4G
    // ----------------------------------------------------
    
    // الخطوة الأولى: صفحة البحث
    else if (currentUrl.includes('bt4gprx.com/search')) {
        const link = document.querySelector('.list-group-item h5 a');
        if (link) {
            let nextUrl = new URL(link.href, window.location.origin);
            nextUrl.searchParams.set('autodl', '1');
            window.location.href = nextUrl.href;
        }
    } 
    // الخطوة الثانية: صفحة الماجنت
    else if (currentUrl.includes('bt4gprx.com/magnet')) {
        const btn = document.querySelector('a[href*="downloadtorrentfile.com"]');
        if (btn) {
            let nextUrl = new URL(btn.href);
            nextUrl.searchParams.set('autodl', '1');
            window.location.href = nextUrl.href;
        }
    } 
    // الخطوة الثالثة: صفحة التحميل النهائية
    else if (currentUrl.includes('downloadtorrentfile.com')) {
        const magnetBtn = document.querySelector('a#open[href^="magnet:"]');
        if (magnetBtn) {
            window.location.href = magnetBtn.href;
            
            setTimeout(() => {
                chrome.runtime.sendMessage({ action: "closeTab" });
            }, 2000);
        }
    }
}