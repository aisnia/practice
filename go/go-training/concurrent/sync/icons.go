package main

import "image"

var icons map[string]image.Image

func loadIcons() {
	icons = map[string]image.Image{
		"left":  Icon("left.png"),
		"up":    Icon("up.png"),
		"right": Icon("right.png"),
		"down":  Icon("down.png"),
	}
}

// Icon 被多个goroutine调用时不是并发安全的
func Icon(name string) image.Image {
	if icons == nil {
		loadIcons()
	}
	return icons[name]
}
