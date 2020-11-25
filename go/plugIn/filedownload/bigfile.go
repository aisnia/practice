package main

import (
	"fmt"
	"github.com/dustin/go-humanize"
	"io"
	"net/http"
	"os"
	"strings"
)

//计数进度
type WriteCounter struct {
	Total uint64
}

func (w *WriteCounter) Write(p []byte) (int, error) {
	n := len(p)
	w.Total += uint64(n)
	w.PrintProgress()
	return n, nil
}
func (w *WriteCounter) PrintProgress() {
	fmt.Printf("\r%s", strings.Repeat(" ", 35))
	fmt.Printf("\rDownloading... %s complete", humanize.Bytes(w.Total))
}
func main() {
	fmt.Println("Download Started")
	fileURL := "https://d.lanrentuku.com/down/png/2004/yellowicon-cc/yellowicon-cc19.png"
	err := DownloadFile("9.png", fileURL)

	if err != nil {
		panic(err)
	}

	fmt.Println("Download Finished")
}

func DownloadFile(filepath string, url string) error {
	//临时文件
	out, err := os.Create(filepath + ".tmp")
	if err != nil {
		return err
	}
	resp, err := http.Get(url)
	if err != nil {
		out.Close()
		return err
	}
	defer resp.Body.Close()
	counter := &WriteCounter{}
	if _, err := io.Copy(out, io.TeeReader(resp.Body, counter)); err != nil {
		out.Close()
		return err
	}

	fmt.Print("\n")
	out.Close()
	if err = os.Rename(filepath+".tmp", filepath); err != nil {
		return err
	}
	return nil
}
