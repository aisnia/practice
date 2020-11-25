package main

//import (
//	"context"
//	"io/ioutil"
//	"log"
//
//	"github.com/chromedp/cdproto/page"
//	"github.com/chromedp/chromedp"
//)

//func main() {
//
//	// Start Chrome
//	// Remove the 2nd param if you don't need debug information logged
//	ctx, cancel := chromedp.NewContext(context.Background(), chromedp.WithDebugf(log.Printf))
//	defer cancel()
//
//	url := "https://www.topgoer.com/"
//	filename := "topgoer.png"
//
//	// Run Tasks
//	// List of actions to run in sequence (which also fills our image buffer)
//	var imageBuf []byte
//	if err := chromedp.Run(ctx, ScreenshotTasks(url, &imageBuf)); err != nil {
//		log.Fatal(err)
//	}
//
//	// Write our image to file
//	if err := ioutil.WriteFile(filename, imageBuf, 0644); err != nil {
//		log.Fatal(err)
//	}
//}
//
//func ScreenshotTasks(url string, imageBuf *[]byte) chromedp.Tasks {
//	return chromedp.Tasks{
//		chromedp.Navigate(url),
//		chromedp.ActionFunc(func(ctx context.Context) (err error) {
//			*imageBuf, err = page.CaptureScreenshot().WithQuality(90).Do(ctx)
//			return err
//		}),
//	}
//}