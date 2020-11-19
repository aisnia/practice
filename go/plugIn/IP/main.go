package main

import (
	"encoding/json"
	"net/http"
)

func main() {
	http.HandleFunc("/", ExmpleHandler)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
func ExmpleHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	resp, _ := json.Marshal(map[string]interface{}{
		"ip": GetIP(r),
	})
	w.Write(resp)
}

func GetIP(r *http.Request) string {
	forwarded := r.Header.Get("X-FORWARDED-FOR")
	if forwarded != "" {
		return forwarded
	}
	return r.RemoteAddr
}
