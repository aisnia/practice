package main

import "github.com/jung-kurt/gofpdf"

func main() {
	err := GeneratePdf("hello.pdf")
	if err != nil {
		panic(err)
	}
}

// GeneratePdf generates our pdf by adding text and images to the page
// 生成pdf 通过 你的大文本 或者 图片，并且保存为文件
// then saving it to a file (name specified in params).
func GeneratePdf(filename string) error {
	pdf := gofpdf.New("P", "mm", "A4", "")
	//页码
	pdf.AddPage()
	//设置字体
	pdf.SetFont("Arial", "B", 16)

	// CellFormat(width, height, text, border, position after, align, fill, link, linkStr)
	pdf.CellFormat(190, 7, "Welcome to topgoer.com", "0", 0, "CM", false, 0, "")
	pdf.ImageOptions(
		"topgoer.png",
		80, 20,
		0, 0,
		false,
		gofpdf.ImageOptions{ImageType: "PNG", ReadDpi: true},
		0,
		"",
	)
	return pdf.OutputFileAndClose(filename)
}
