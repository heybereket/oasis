import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html className="m-0 p-0">
                <Head />
                <body className="m-0 p-0 font-display">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument