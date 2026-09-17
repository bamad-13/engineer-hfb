// ============================================================
// Engineer HFB — Main Script
// ============================================================

function toggleMenu() {
    document.querySelector(".nav").classList.toggle("open");
}

function starsHTML(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    let html = "";
    for (let i = 0; i < 5; i++) {
        if (i < full) html += "⭐";
        else if (i === full && half) html += "✨";
        else html += "☆";
    }
    return html;
}

function appCardHTML(app) {
    return `
        <div class="app-card" onclick="location.href='app.html?id=${app.id}'">
            <img class="app-icon" src="${app.icon || 'assets/logo.png'}" 
                 alt="${app.name}" onerror="this.src='assets/logo.png'">
            <div class="app-name">${app.name}</div>
            <div class="app-version">الإصدار ${app.version || '1.0'}</div>
            <div class="app-rating">
                ${starsHTML(app.avgRating || 0)}
                <span>(${app.ratingCount || 0})</span>
            </div>
            <div class="app-desc">${app.description || ''}</div>
        </div>
    `;
}

function articleCardHTML(article) {
    const date = new Date(article.time).toLocaleDateString('ar-LY');
    return `
        <div class="article-card" onclick="location.href='article.html?id=${article.id}'">
            <h4>${article.title}</h4>
            <p>${(article.excerpt || article.content || '').substring(0, 120)}...</p>
            <div class="article-meta">📅 ${date}</div>
        </div>
    `;
}

async function loadLatestApps() {
    const el = document.getElementById("latestApps");
    if (!el) return;

    const data = await apiGet("/v1/apps");
    if (!data || !data.apps || data.apps.length === 0) {
        el.innerHTML = '<p class="loading">📭 لا توجد تطبيقات منشورة بعد</p>';
        return;
    }

    el.innerHTML = data.apps.slice(0, 4).map(appCardHTML).join("");
}

async function loadLatestArticles() {
    const el = document.getElementById("latestArticles");
    if (!el) return;

    const data = await apiGet("/v1/articles");
    if (!data || !data.articles || data.articles.length === 0) {
        el.innerHTML = '<p class="loading">📭 لا توجد مقالات منشورة بعد</p>';
        return;
    }

    el.innerHTML = data.articles.slice(0, 3).map(articleCardHTML).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    trackVisit();
    loadLatestApps();
    loadLatestArticles();
    getUserId();
});