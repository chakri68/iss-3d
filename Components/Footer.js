import { Label, Icon } from "semantic-ui-react"
import styles from "./Footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Label as='a' href="https://www.github.com/chakri68">
                <Icon name='github' /> chakri68
            </Label>
            <Label as='a' href="/about">
                <Icon name='question' /> About
            </Label>
        </footer>
    )
}