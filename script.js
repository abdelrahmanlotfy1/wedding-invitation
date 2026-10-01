// تاريخ الفرح (توقيت مصر)
const weddingDate = new Date("2026-11-20T20:00:00+02:00").getTime();

// أرقام عربية بخانتين
const ar = (n) => n.toLocaleString("ar-EG", { minimumIntegerDigits: 2, useGrouping: false });

function updateCountdown() {
    const distance = weddingDate - Date.now();

    if (distance <= 0) {
        clearInterval(timer);
        document.querySelector(".countdown-container").innerHTML =
            "<h2>بدأت أجمل لحظاتنا 🤍</h2>";
        return;
    }

    const day = 1000 * 60 * 60 * 24;
    document.getElementById("days").textContent = ar(Math.floor(distance / day));
    document.getElementById("hours").textContent = ar(Math.floor((distance % day) / 3600000));
    document.getElementById("minutes").textContent = ar(Math.floor((distance % 3600000) / 60000));
    document.getElementById("seconds").textContent = ar(Math.floor((distance % 60000) / 1000));
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown(); // يشتغل فورًا من غير ما يستنى ثانية

// ظهور الأقسام وإنت بتنزل
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document
    .querySelectorAll(".invitation, .photo, .wedding-content, .dress-content, .location-content, .countdown")
    .forEach((el) => {
        el.classList.add("hidden");
        observer.observe(el);
    });
