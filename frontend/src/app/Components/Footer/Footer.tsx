"use client"
import "./Footer.css";

function Footer() {
    return(
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__copyright">
                   © Copyright 2024
                </div>
                <div className="footer__links">
                    <a href="https://hedera.com/" target="_blank" rel="noopener noreferrer">Website</a>
                    <a href="https://x.com/hedera" target="_blank" rel="noopener noreferrer">X</a>
                    <a href="https://www.facebook.com/hederanetwork/" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.facebook.com/hederanetwork/" target="_blank" rel="noopener noreferrer">Telegram</a>
                    <a href="https://discord.com/invite/uJ5k8DkmKV" target="_blank" rel="noopener noreferrer">Discord</a>
                    <a href="https://www.youtube.com/hederahashgraph" target="_blank" rel="noopener noreferrer">YouTube</a>
                    <a href="https://github.com/hashgraph" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://medium.com/hedera" target="_blank" rel="noopener noreferrer">Medium</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
