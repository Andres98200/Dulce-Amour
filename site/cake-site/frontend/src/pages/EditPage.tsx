import { useTranslation } from "react-i18next"

export default function EditPage() {
    const { t } = useTranslation();
    return(
        <div className="flex justify-center items-center min-h-screen">
            <h1 className="flex justify-center mb-8">{t("Welcome back Laura")}</h1>
        </div>
    )
}
