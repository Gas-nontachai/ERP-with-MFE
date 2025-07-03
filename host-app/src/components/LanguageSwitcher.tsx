import { useEffect } from "react";
import i18n from "../i18n";
import { useLanguageStore } from "../stores/languageStore";

type LanguageKey = "en" | "th";

const LANGUAGES: Record<LanguageKey, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇺🇸" },
  th: { label: "ไทย", flag: "🇹🇭" },
};

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguageStore();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  const handleChange = (langKey: LanguageKey) => {
    i18n.changeLanguage(langKey);
    setLang(langKey);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    window.location.reload();
  };

  return (
    <div className="dropdown dropdown-end mt-4">
      <div tabIndex={0} role="button" className="btn btn-sm btn-outline">
        {LANGUAGES[lang].flag} {LANGUAGES[lang].label}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36"
      >
        {(Object.keys(LANGUAGES) as LanguageKey[]).map((langKey) => (
          <li key={langKey}>
            <button
              onClick={() => handleChange(langKey)}
              className={lang === langKey ? "bg-primary text-white" : ""}
              autoFocus={lang === langKey}
            >
              {LANGUAGES[langKey].flag} {LANGUAGES[langKey].label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
