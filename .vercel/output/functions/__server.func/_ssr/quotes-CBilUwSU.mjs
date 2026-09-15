//#region node_modules/.nitro/vite/services/ssr/assets/quotes-CBilUwSU.js
var QUOTES = [
	"ذهنت ظرف همه‌چیز نیست.",
	"نگرانی را که نام ببری، سبک‌تر می‌شود.",
	"سبو را پر کن، سرت را خالی.",
	"چیزی که امشب سنگین است، صبح کوچک‌تر دیده می‌شود.",
	"لازم نیست همه فکرها را خودت نگه داری.",
	"آرامش، بعد از سپردن می‌آید نه قبل از آن.",
	"هر نگرانی یک مهمان است؛ لازم نیست ساکن خانه‌ات شود.",
	"تو قوی‌تر از نگرانی‌هایی."
];
function quoteForDay(ts = Date.now()) {
	return QUOTES[Math.floor(ts / 864e5) % QUOTES.length] ?? QUOTES[0];
}
//#endregion
export { quoteForDay as t };
