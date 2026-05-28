// الكود هيشتغل بس لو الرابط فيه الكلمة السرية بتاعتنا
if (window.location.search.includes('autodl=1')) {
    const currentUrl = window.location.href;

    // الخطوة الأولى: صفحة البحث
    if (currentUrl.includes('bt4gprx.com/search')) {
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
            // نضغط على الرابط عشان uTorrent يفتح
            window.location.href = magnetBtn.href;
            
            // نستنى ثانيتين لحد ما المتصفح يبعت الأمر لـ uTorrent، وبعدين نقفل التاب
            setTimeout(() => {
                chrome.runtime.sendMessage({ action: "closeTab" });
            }, 2000);
        }
    }
}