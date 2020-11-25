package main

import (
	"io"
	"net/http"
	"os"
)

//https://d.lanrentuku.com/down/png/2004/yellowicon-cc/yellowicon-cc19.png
func main() {
	fileURL := "https://d.lanrentuku.com/down/png/2004/yellowicon-cc/yellowicon-cc19.png"
	if err := DownLoadFile("9.png", fileURL); err != nil {

	}
}

// download file会将url下载到本地文件，它会在下载时写入，而不是将整个文件加载到内存中。
func DownLoadFile(newName string, fileURL string) error {
	//get data
	resp, err := http.Get(fileURL)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	//Create the file
	out, err := os.Create(newName)
	if err != nil {
		return err
	}

	defer out.Close()

	//Write the body to file
	_, err = io.Copy(out, resp.Body)
	return err
}
