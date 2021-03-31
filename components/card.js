export default function Card({ children, href }) {
    const styles = [
        "m-4",
        "p-6",
        "text-left",
        "no-underline",
        "border-0",
        "border",
        "border-gray-200",
        "border-solid",
        "rounded-xl",

        "hover:text-next-blue",
        "focus:text-next-blue",
        "active:text-next-blue",

        "hover:border-next-blue",
        "focus:border-next-blue",
        "active:border-next-blue"
    ]

    return (
        <a href={href} className={styles.join(" ")} style={{
            flexBasis: "45%",
            transition: "color 0.15s ease, border-color 0.15s ease"
        }}>
            {children}
        </a>
    )
}