import puppeteer from "puppeteer";

const html: string = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Hello World</title>
    </head>
    <body>
        <h1>Hello World</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam animi, aperiam asperiores delectus dolore enim explicabo illum impedit ipsam iste magnam magni molestiae nobis omnis quisquam ratione reprehenderit, tenetur.</p>
    </body>
</html>
`

export default defineEventHandler(async event => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setContent(html)
    const buffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
            left: '0px',
            top: '0px',
            right: '0px',
            bottom: '0px'
        }
    })
    await browser.close()
    return buffer.toString('base64')
    // return buffer
})