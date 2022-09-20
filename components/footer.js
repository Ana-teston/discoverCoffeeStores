import styles from "./footer.module.css"

const FooterComponent = () => {
    return (
        <div>
            <footer className={styles.footer}>
                <a
                    href="https://github.com/Ana-teston/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    By {'Ana Teston'}
                </a>
            </footer>
        </div>
    )
}

export default FooterComponent