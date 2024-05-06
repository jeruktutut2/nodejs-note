import PDFDocument from "pdfkit";
const generatePdf = async (req, res, next) => {
    try {
        const doc = new PDFDocument()
        doc.fontSize(24).text("PDF List", {align: "center"})
        doc.moveDown()
        doc.fontSize(16)
        doc.text("pdf1")
        doc.text("pdf2")
        doc.text("pdf3")
        doc.moveDown()

        const buffers = []
        doc.on("data", buffers.push.bind(buffers))
        doc.on("end", () => {
            const pdfData = Buffer.concat(buffers)
            res.setHeader("Content-Type", "application/pdf")
            res.setHeader("Content-Disposition", 'inline; filename="test.pdf"')
            res.send(pdfData)
        })
        doc.end()
    } catch (error) {
        next(error)
    }
}

export default {
    generatePdf
}