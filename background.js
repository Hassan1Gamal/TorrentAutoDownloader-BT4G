chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "smartTorrent",
    title: "تحميل صامت لـ uTorrent",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "smartTorrent" && info.selectionText) {
    const selection = info.selectionText.trim();
    
    // فلتر ذكي للبحث عن نمط: (اسم الفيلم) + (سنة) سواء بين أقواس أو بدون
    // مثال: Over Your Dead Body (2026) أو Over Your Dead Body 2026
    const moviePattern = /^(.*?)\s*\(?(\d{4})\)?$/;
    const match = selection.match(moviePattern);
    
    let url = "";

    if (match) {
      // 1. مسار YTS (فيلم + سنة)
      const title = match[1].trim(); // اسم الفيلم
      const year = match[2]; // السنة
      
      // تحويل الاسم لصيغة الروابط (استبدال المسافات والرموز بـ شرطة - )
      const slugTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const slug = `${slugTitle}-${year}`;
      
      // إضافة autodl=1 عشان سكريبت المحتوى يشتغل
      url = `https://yts.bz/movies/${slug}?autodl=1`;
    } else {
      // 2. مسار BT4G (أي نص آخر)
      const query = encodeURIComponent(selection);
      url = `https://bt4gprx.com/search?q=${query}&autodl=1`;
    }
    
    // فتح التاب في الخلفية
    chrome.tabs.create({ url: url, active: false });
  }
});

// استقبال طلب قفل التاب لما التحميل يخلص
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "closeTab" && sender.tab) {
    chrome.tabs.remove(sender.tab.id);
  }
});