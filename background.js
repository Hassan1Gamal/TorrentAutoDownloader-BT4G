chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "smartTorrent",
    title: "تحميل صامت لـ uTorrent",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "smartTorrent" && info.selectionText) {
    const query = encodeURIComponent(info.selectionText.trim());
    const url = `https://bt4gprx.com/search?q=${query}&autodl=1`;
    
    // active: false بتخلي التاب تتفتح في الخلفية من غير ما تروح عليها
    chrome.tabs.create({ url: url, active: false });
  }
});

// استقبال طلب قفل التاب لما التحميل يخلص
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "closeTab" && sender.tab) {
    chrome.tabs.remove(sender.tab.id);
  }
});