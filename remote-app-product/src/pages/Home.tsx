import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t("title")}</h2>
    </div>
  );
}
