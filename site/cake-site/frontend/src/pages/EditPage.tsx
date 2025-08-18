import { useTranslation } from "react-i18next"

export default function EditPage() {
    const { t } = useTranslation();
    return(
        <div className="flex justify-center items-center min-h-screen">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                {t("Edit")}
            </button>
        </div>
    )
}
