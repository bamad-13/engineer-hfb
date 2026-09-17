// ============================================================
// Engineer HFB — API Helper
// ============================================================

const API_BASE = "https://engineer-hfb-server.onrender.com";

async function apiGet(path) {
    try {
        const res = await fetch(API_BASE + path);
        if (!res.ok) throw new Error("HTTP " + res.status);
        return await res.json();
    } catch (e) {
        console.error("API Error:", e);
        return null;
    }
}

async function apiPost(path, body) {
    try {
        const res = await fetch(API_BASE + path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        return await res.json();
    } catch (e) {
        console.error("API Error:", e);
        return null;
    }
}

// -------------------- الزوار --------------------
function trackVisit() {
    fetch(API_BASE + "/v1/visit", { method: "POST" }).catch(() => {});
}

// -------------------- userId (للتعليقات والتقييم) --------------------
function getUserId() {
    let id = localStorage.getItem("user_id");
    if (!id) {
        id = "user_" + Date.now() + "_" + Math.random().toString(36).substring(2, 8);
        localStorage.setItem("user_id", id);
    }
    return id;
}