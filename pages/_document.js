import Document, {Html, Main, Head, NextScript} from "next/document";


class MyDocument extends Document  {
    render() {
        return (
            <Html>
                <Head></Head>
                <body>
                    <Main></Main>
                    <NextScript />
                </body>
            </Html>
        )
    }
}
export default MyDocument;